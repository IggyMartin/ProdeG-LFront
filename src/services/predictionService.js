import { getWithHeaders, postWithHeaders } from "./config";

const PATH = '/prode/prediction'

export const createGamePredictionDB = async (data) => {
    const url = `${PATH}/create`
    try {
        const response = await postWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export const findAllByUserIdDB = async (userId) => {
    const url = `${PATH}/all/${userId}`
    try {
        const response = await getWithHeaders(url)
        return response.data
    } catch (error) {
        throw error.response
    }
}