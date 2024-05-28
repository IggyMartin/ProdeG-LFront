import { setCookies, getCookies, removeCookies } from "./cookiesService";

export const loginUserDB = async (data) => {
    try {
        const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...data}),
      });
      
        if (!response.ok) {
            throw new Error("Failed to login");
        } else {
            const data = await response.json();
            const [year, month, day] = data.expiration.split(" T")[0].split("-");
            let [hour, minute, second] = data.expiration.split(" T")[1].split(":");
            if(getCookies("jwt")) {
                removeCookies("jwt")
                setCookies(
                    "jwt",
                    data.jwt,
                    new Date(year, month - 1, day, hour, minute)
                );
            }
            setCookies(
                "jwt",
                data.jwt,
                new Date(year, month - 1, day, hour, minute)
            );

            return
        }
    } catch (error) {
        throw error.response
    }
}