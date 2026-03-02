import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"

const ClientData = () => {
	const { allPreBriefings } = usePreBriefingStore()

	console.log(allPreBriefings)

	return <>text</>
}

export default ClientData
