import { useCallback, useMemo } from "react"
import { Pokemon } from "pokenode-ts"

import { IconButton } from "@mui/material"
import CryIcon from '@mui/icons-material/VolumeUp'


interface CryButtonProps {
	pokemon: Pokemon
}

const CryButton = ({ pokemon }: CryButtonProps) => {
	
	const cryAudio = useMemo(() => {
		const cries = pokemon?.['cries']
		const audio = new Audio(cries?.latest ?? cries?.legacy)
		audio.volume = 0.3
		audio.preload = 'auto'
		return audio
	}, [pokemon])

	const onClick = useCallback(() => {
		if (!cryAudio.paused) {
			cryAudio.pause()
			cryAudio.currentTime = 0
		} else {
			cryAudio.play()
		}
	}, [cryAudio]);

	return (
		<IconButton onClick={onClick}>
			<CryIcon />
		</IconButton>
	)
}

export default CryButton
