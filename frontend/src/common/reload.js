export const reload = (error) => {
    if (error.response?.status === 401) {
        window.location.reload()
    }
}