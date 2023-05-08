export const formattedTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric'
    })
}