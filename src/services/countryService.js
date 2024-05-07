import { getWithHeaders } from "./config";

const PATH = '/prode/country'

export const getAllCountriesDB = async () => {
    const url = `${PATH}/all`
    try {
        const response = await getWithHeaders(url)
        return response.data
    } catch (error) {
        throw error.response
    }
}