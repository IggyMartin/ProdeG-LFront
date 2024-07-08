import Cookies from "universal-cookie";

export function setCookies(name, value, expirationDate) {
    const cookies = new Cookies();

    cookies.set(name, value, {expires: expirationDate});
}

export function getCookies(name) {
    const cookies = new Cookies();

    return cookies.get(name);
}

export function removeCookies(name) {
    const cookies = new Cookies();

    cookies.remove(name);
}