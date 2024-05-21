import { getWithHeaders } from "./config";

const PATH = '/prode/user'

export const getUserByIdDB = async (id) => {
    const url = `${PATH}/${id}`
    try {
        const response = await getWithHeaders(url)
        return response.data
    } catch (error) {
        throw error.response
    }
}