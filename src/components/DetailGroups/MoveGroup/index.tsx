import { Pokemon, PokemonMove } from 'pokenode-ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import MovePool from './movePool'

import { CircularProgress, Dialog, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import UpgradeIcon from '@mui/icons-material/Upgrade'
import ClearIcon from '@mui/icons-material/Clear'
import EggIcon from './../../../icons/egg.svg?react'
import DiscIcon from './../../../icons/minidisc.svg?react'
import { SvgIcon } from '@mui/material'
import { TYPE_DATA } from '../../../typeData'
import TypeDot from '../../TypeDot'
import { useQueries, useQuery } from 'react-query'

import PhysicalIcon from '../../../icons/moveTypes/physical-move.svg?react'
import SpecialIcon from '../../../icons/moveTypes/special-move.svg?react'
import StatusIcon from '../../../icons/moveTypes/status-move.svg?react'
import { useApi } from '../../../store/api/apiSelectors'
import { useSelectedTabIndex } from '../../../store/appStatus/appStatusSelectors'
import { CustomMoveData } from '../../../types'
import MoveDialog from '../../MoveDialog'


interface MoveGroupProps {
  pokemon: Pokemon
}

const MoveGroup = (props: MoveGroupProps) => {
  const { pokemon } = props

  const api = useApi()

  const isShowing = useSelectedTabIndex() === 2

  /////////////////////////////////////////////////////////////////////////////
  // Finding Version

  const versionGroupNumber = useMemo(() => {
    if (!pokemon?.moves) return 0
    // Count how many moves each version group has, pick the highest version group
    // that has the most complete moveset
    const vgCounts: Record<number, number> = {}
    pokemon.moves.forEach((move: PokemonMove) => {
      move.version_group_details.forEach(vg => {
        const vgNum = parseInt(vg.version_group.url.split('version-group/')[1])
        vgCounts[vgNum] = (vgCounts[vgNum] || 0) + 1
      })
    })
    // Find the max move count
    const maxCount = Math.max(...Object.values(vgCounts))
    // Among version groups with the most moves, pick the highest numbered one
    const bestVersions = Object.entries(vgCounts)
      .filter(([, count]) => count === maxCount)
      .map(([vg]) => parseInt(vg))
    return Math.max(...bestVersions)
  }, [pokemon?.moves])

  const findValidVersion = useCallback((move: PokemonMove): CustomMoveData | undefined => {
    const versionGroupDetails = move.version_group_details.find((v) =>
      v.version_group.url.includes(`version-group/${versionGroupNumber}`))
    return {
      name: move.move.name,
      versionGroupDetails
    };
  }, [versionGroupNumber])

  /////////////////////////////////////////////////////////////////////////////
  // Data Fetching
  
  const moveNameArray: CustomMoveData[] = useMemo(() => (
    pokemon?.moves?.reduce((arr, m) => {
      const move = findValidVersion(m)
      if (move) arr.push(move)
      return arr
    }, []) ?? []
  ), [findValidVersion, pokemon?.moves])

  const movesQuery = useQueries(
    moveNameArray.map((move) => ({
      queryKey: ['moveCustomData', move.name],
      queryFn: async (): Promise<CustomMoveData> => {
        const data = await api.move.getMoveByName(move.name)
        return { ...move, data }
      },
      staleTime: Infinity,
      enabled: isShowing
    }))
  )

  const isLoading = useMemo(() => movesQuery.some((q) => q.isLoading), [movesQuery])
  
  /////////////////////////////////////////////////////////////////////////////
  // Filtering

  const [physicalMovesEnabled, setPhysicalMovesEnabled] = useState(true)
  const [specialMovesEnabled, setSpecialMovesEnabled] = useState(true)
  const [statusMovesEnabled, setStatusMovesEnabled] = useState(true)
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([])

  useEffect(() => { // Reset filters when pokemon changes
    setSearchValue('')
    setPhysicalMovesEnabled(true)
    setSpecialMovesEnabled(true)
    setStatusMovesEnabled(true)
    setSelectedMoveTypes([])
  }, [pokemon])
  
  const [searchValue, setSearchValue] = useState('');
  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, [])

  const filteredMoves: CustomMoveData[] = useMemo(() => {
    if (isLoading) return []
    let moves: CustomMoveData[] = movesQuery.reduce((arr, curr) => {
      if (curr.isLoading) return arr
      if (curr.data) arr.push(curr.data)
      return arr
    }, [])
    if (searchValue)
      moves = moves.filter((m) => m.name.includes(searchValue))
    if (!physicalMovesEnabled) 
      moves = moves.filter((m) => m.data.damage_class.name !== 'physical')
    if (!specialMovesEnabled)
      moves = moves.filter((m) => m.data.damage_class.name !== 'special')
    if (!statusMovesEnabled)
      moves = moves.filter((m) => m.data.damage_class.name !== 'status')
    if (selectedMoveTypes.length > 0)
      moves = moves.filter((m) => selectedMoveTypes.includes(m.data.type.name))
    return moves
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon, isLoading, physicalMovesEnabled, searchValue, specialMovesEnabled, statusMovesEnabled, selectedMoveTypes])

  /////////////////////////////////////////////////////////////////////////////
  // Partitioning

  const levelUpMoves = useMemo(() => (
    filteredMoves
      .filter((m) => m.versionGroupDetails?.move_learn_method.name === 'level-up')
      .sort((a, b) => {
        const aLevel = a.versionGroupDetails?.level_learned_at ?? 0
        const bLevel = b.versionGroupDetails?.level_learned_at ?? 0
        return aLevel - bLevel
      })
  ), [filteredMoves])

  const eggMoves = useMemo(() => (
    filteredMoves.filter((m) => m.versionGroupDetails?.move_learn_method.name === 'egg')
  ), [filteredMoves])

  const tmMoves = useMemo(() => (
    filteredMoves.filter((m) => m.versionGroupDetails?.move_learn_method.name === 'machine')
  ), [filteredMoves])

  /////////////////////////////////////////////////////////////////////////////
  // Machine Extras

  const getMachineName = useCallback(async (name: string) => {
    try {
      const move = await api.move.getMoveByName(name)
      const machineId = move?.machines?.[move?.machines.length-1]?.machine.url.split('machine/')[1].split('/')[0]
      const machine = await api.machine.getMachineById(~~machineId)
      return machine?.item?.name ?? ' '
    } catch {
      return ' '
    }
  }, [api.machine, api.move]);

  const machineNames = useQuery(
    ['machineNames', tmMoves], 
    async () => {
      const promises = tmMoves.map(async (move) => {
        const item = await getMachineName(move.name)
        return { [move.name]: item }
      })
      const items = await Promise.all(promises)
      return items.reduce((prev, curr) => ({...prev, ...curr}), {})
    },
    { enabled: !!tmMoves.length, staleTime: 1000 * 60 * 60 * 24  }
  )

  const sortedTmMoves = useMemo(() => {
    if (machineNames.isLoading) return tmMoves
    return tmMoves
      .map(m => ({...m, machineName: machineNames.data[m.name]}))
      .sort((a, b) => a.machineName.localeCompare(b.machineName))
  }, [machineNames?.data, machineNames.isLoading, tmMoves])

  /////////////////////////////////////////////////////////////////////////////

  if (isLoading) return <CircularProgress style={{margin: '16px auto'}} />

  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', margin: '0 0 16px' }}
      >
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Moves"
          onChange={onSearch}
          value={searchValue}
          disabled={movesQuery.some(result => result.isLoading)}
        />
        <IconButton onClick={() => setPhysicalMovesEnabled(!physicalMovesEnabled)}>
          <SvgIcon component={PhysicalIcon} color={physicalMovesEnabled ? 'error' : 'disabled' } />
        </IconButton>
        <IconButton onClick={() => setSpecialMovesEnabled(!specialMovesEnabled)}>
          <SvgIcon component={SpecialIcon} color={specialMovesEnabled ? 'info' : 'disabled' } />
        </IconButton>
        <IconButton onClick={() => setStatusMovesEnabled(!statusMovesEnabled)}> 
          <SvgIcon component={StatusIcon} color={statusMovesEnabled ? 'action' : 'disabled' } />
        </IconButton>
      </Paper>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <IconButton
          size="small"
          onClick={() => setSelectedMoveTypes([])}
          disabled={selectedMoveTypes.length === 0}
          style={{ opacity: selectedMoveTypes.length === 0 ? 0.25 : 1, marginLeft: '-8px' }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
        {Object.keys(TYPE_DATA).map(type => (
          <div
            key={type}
            onClick={() => setSelectedMoveTypes(prev =>
              prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
            )}
            style={{
              cursor: 'pointer',
              opacity: selectedMoveTypes.length === 0 || selectedMoveTypes.includes(type) ? 1 : 0.25,
              transition: 'opacity 0.15s',
            }}
          >
            <TypeDot type={type} size="small" variant="square" />
          </div>
        ))}
      </div>

      <div>
        <MovePool 
          method={'level-up'}
          icon={<UpgradeIcon />}
          title="By Level Up" 
          moves={levelUpMoves} 
        />
        <MovePool 
          method={'egg'}
          icon={<SvgIcon component={EggIcon} />} 
          title="By Egg" 
          moves={eggMoves} 
        />
        <MovePool 
          method={'machine'}
          icon={<SvgIcon component={DiscIcon} />}
          title="By Machine" 
          moves={sortedTmMoves} 
        />
      </div>

      <MoveDialog />
    </div>
  )
}

export default MoveGroup;