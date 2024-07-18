import { SvgIcon } from "../../GlobalComponents"

const SmogonButton = ({ pokemon }) => {

	return (
		<a href={`https://www.smogon.com/dex/sv/pokemon/${pokemon?.name}`} target="_blank" rel="noreferrer">
			<SvgIcon src={"https://www.smogon.com/forums/media/zracknel-beta.svg"} style={{ width: '48px', height: '48px' }} />
		</a>
	)
}

export default SmogonButton
