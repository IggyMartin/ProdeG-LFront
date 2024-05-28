import { postWithHeaders } from "./config";

const PATH = "/prode/topFourCountriesPrediction"

export const createUserTopFourPredictionDB = async (data) => {
    const url = `${PATH}/create`
    try {
        const response = await postWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}