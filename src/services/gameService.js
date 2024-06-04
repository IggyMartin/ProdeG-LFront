import { getWithHeaders, putWithHeaders } from "./config"

const PATH = '/prode/game'

export const getAllGamesDB = async () => {
    const url = `${PATH}/all`
    try {
        const response = await getWithHeaders(url)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export const updateGameDB = async (data) => {
    console.log(data.id)
    const url = `${PATH}/update/${data.id}`
    try {
        const response = await putWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}