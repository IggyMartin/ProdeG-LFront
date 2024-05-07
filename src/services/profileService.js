import { getWithHeaders } from "./config"; 

const PATH = '/prode/profile'

export const getAllProfilesDB = async () => {
    const url = `${PATH}/all`
    try {
        const response = await getWithHeaders(url)
        return response.data
    } catch (error) {
        throw error.response
    }
}