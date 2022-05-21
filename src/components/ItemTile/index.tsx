import { Tooltip, Chip } from "@mui/material"
import { Item, ItemClient } from "pokenode-ts"
import { useEffect, useState } from "react"


const ItemTile = (props: any) => {

  const { api, name } = props

  const [item, setItem] = useState<Item>()

  useEffect(() => {
    const itemClient: ItemClient = api?.item ?? new ItemClient()
    itemClient.getItemByName(name.replace(' ', '-')).then((item) => setItem(item))
  }, [api, name])

  if (!item) return null

  return (
    <Tooltip arrow title={item.effect_entries.find((entry) => entry?.language.name === 'en')?.short_effect.replace('Held: ', '')}>
      <Chip
        key={item.id}
        style={{textTransform: 'capitalize'}}
        label={item.name}
        icon={<img alt='' src={item.sprites.default} />}  
      />
    </Tooltip>
  )
}

export default ItemTile