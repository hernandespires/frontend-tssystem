import axios from "axios"

const asanaApi = axios.create({
	baseURL: "https://app.asana.com/api/1.0",
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_ASANA_TOKEN}`,
	},
})

export default asanaApi
