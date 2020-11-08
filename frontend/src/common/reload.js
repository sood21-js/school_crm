export const reload = (response) => {
    if (response?.status === 401) {
        window.location.reload()
    }
}