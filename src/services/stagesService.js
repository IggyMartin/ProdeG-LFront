import { getWithHeaders, putWithHeaders } from "./config";

const PATH = "/prode/stages"

export const getStagesDB = async () => {
    const url = `${PATH}/all`
    try {
        const response = await getWithHeaders(url)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export const updateStageDB = async (data) => {
    console.log(data)
    const url = `${PATH}/update/${data.id}`
    try {
        const response = await putWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}