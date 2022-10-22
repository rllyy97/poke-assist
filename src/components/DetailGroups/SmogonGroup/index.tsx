import { Chip, Paper, Button, Divider } from "@mui/material"
import { MainClient, Pokemon } from "pokenode-ts"
import { SmogonSet, STATS } from "../../../data/interfaces"
import AbilityChip from "../../AbilityChip"

import LaunchIcon from '@mui/icons-material/Launch'
import AddIcon from '@mui/icons-material/Add'

import ItemTile from "../../ItemTile"
import { TYPE_DATA } from "../../../typeData"
import NatureChip from "../../NatureChip"
import ChipRow from "../../ChipRow"
import MoveTile from "../../MoveTile"

interface SmogonGroupProps {
  api?: MainClient,
  pokemon?: Pokemon
}

const SmogonGroup = (props: SmogonGroupProps) => {

  const { api, pokemon } = props

  const color = TYPE_DATA[pokemon?.types[0]?.type?.name]?.color

  const smogonData = []

  return (
    <div className="flex column left" style={{gap: '8px'}}>
      {smogonData && (
        <>
          {smogonData.length === 0 && <p>( No data )</p>}

          {smogonData?.map((set: SmogonSet) => {
            if ((set?.ability?.length ?? 0) === 0 && pokemon?.abilities?.length === 1)
              set.ability = [pokemon?.abilities[0].ability.name]

            return (
              <Paper key={set.setName} variant="outlined" className="flex column left" style={{gap: '8px', padding: '16px', width: '100%', position: 'relative'}}>
                <ChipRow orIcon style={{position: 'absolute', right: '16px'}}>
                  {set?.item?.map((i) => <ItemTile key={i} api={api} name={i} />)}
                </ChipRow>
                <h2 style={{textTransform: 'capitalize'}}>
                  {set.setName}
                </h2>

                {/* ABILITIES + NATURES */}
                <div className="flex row">
                  {set?.ability?.map((a) => <AbilityChip key={a} api={api} name={a} />)}
                  <AddIcon />
                  {set?.nature?.map((n) => <NatureChip key={n} api={api} name={n} />)}
                </div>
                <Divider style={{width: '-webkit-fill-available', margin: '8px -16px 0 -16px'}} />

                {/* EVS */}
                <div className="flex row" style={{alignItems: 'center', width: '100%', margin: '8px 0'}}>
                  {Object.keys(STATS)?.map((stat) => {
                    const val = set?.evs[stat] ?? 0
                    return (
                      <div key={STATS[stat].short} style={{opacity: val !== 0 ? 1 : 0.1, }}>
                        <h5 style={{textAlign: 'center'}}>
                          {STATS[stat].short}
                        </h5>
                        <Chip
                          key={stat}
                          variant={val !== 0 ? 'filled' : 'filled'}
                          color={val !== 0 ? "info" : "default"}
                          label={val}
                          style={{minWidth: '48px', backgroundColor: color, color: 'black'}}
                        />
                      </div>
                    )
                  })}
                </div>                
                <Divider style={{width: '-webkit-fill-available', margin: '0 -16px'}} />

                {/* MOVES */}
                <div
                  className="flex column"
                  style={{alignItems: 'flex-start', width: '100%', margin: '8px 0 0', gap: '12px'}}
                >
                  {set?.moves?.map((moves) => <MoveTile key={moves[0]} api={api} nameArray={moves} />)}
                </div>
              </Paper>
            )
          })}

          <Button
            startIcon={<LaunchIcon />}
            color="info"
            href={`https://www.smogon.com/dex/ss/pokemon/${pokemon?.name}/`}
            target="_blank" rel="noopener noreferrer"
          >
            Read more on Smogon
          </Button>
        </>
      )}
    </div>
  )
}

export default SmogonGroup