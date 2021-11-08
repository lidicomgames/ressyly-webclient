export const URL_API = "http://localhost:8080/api"

export function getJson(url) {
    return new Promise((resolve, reject) => {
        fetch(URL_API + url)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}