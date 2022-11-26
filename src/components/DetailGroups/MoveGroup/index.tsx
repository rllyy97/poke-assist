import { Move, Pokemon, PokemonMove, PokemonMoveVersion } from 'pokenode-ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import MovePool from './movePool'

import { CircularProgress, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { ReactComponent as EggIcon } from './../../../icons/egg.svg'
import { ReactComponent as DiscIcon } from './../../../icons/minidisc.svg'
import { SvgIcon } from '@mui/material';
import { useQueries, useQuery } from 'react-query';

import { ReactComponent as PhysicalIcon } from '../../../icons/moveTypes/physical-move.svg'
import { ReactComponent as SpecialIcon } from '../../../icons/moveTypes/special-move.svg'
import { ReactComponent as StatusIcon } from '../../../icons/moveTypes/status-move.svg'
import { useApi } from '../../../store/api/apiSelectors';
import { useSelector } from 'react-redux';
import { getSelectedTabIndex } from '../../../store/appStatus/appStatusSelectors';


export interface CustomMoveData {
  name: string
  versionGroupDetails?: PokemonMoveVersion
  machineName?: string
  data?: Move
}

interface MoveGroupProps {
  pokemon: Pokemon
}

const MoveGroup = (props: MoveGroupProps) => {
  const { pokemon } = props

  const api = useApi()

  const isShowing = useSelector(getSelectedTabIndex) === 2

  /////////////////////////////////////////////////////////////////////////////
  // Finding Version

  const versionGroupNumber = useMemo(() => {
    let version = 0
    pokemon?.moves?.forEach((move: PokemonMove) => {
      const highestMoveVersionGroup = move.version_group_details.reduce((current, vg) => (
        Math.max(current, parseInt(vg.version_group.url.split('version-group/')[1]))
      ), version)
      version = highestMoveVersionGroup
    })
    return version
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

  useEffect(() => { // Reset filters when pokemon changes
    setSearchValue('')
    setPhysicalMovesEnabled(true)
    setSpecialMovesEnabled(true)
    setStatusMovesEnabled(true)
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
    return moves
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon, isLoading, physicalMovesEnabled, searchValue, specialMovesEnabled, statusMovesEnabled])

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
    const move = await api.move.getMoveByName(name)
    const machineId = move?.machines?.[move?.machines.length-1]?.machine.url.split('machine/')[1].split('/')[0]
    const machine = await api.machine.getMachineById(~~machineId)
    return machine?.item?.name
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
  }, [machineNames.data, machineNames.isLoading, tmMoves])

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
    </div>
  )
}

export default MoveGroup;