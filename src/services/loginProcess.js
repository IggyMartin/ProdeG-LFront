import { putWithHeaders } from "./config";

const PATH = "/prode/loginProcess"

export const acceptTermsAndConditionsDB = async (data) => {
    const url = `${PATH}/acceptTerms`
    try {
        const response = await putWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export const setUserAvatarDB = async (data) => {
    const url = `${PATH}/setUserAvatar`
    try {
        const response = await putWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}