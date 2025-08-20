export function formatMealDate(date: Date): string {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }

    const formattedDate = new Intl.DateTimeFormat('pt-BR', dateOptions).format(date)
    const formattedTime = new Intl.DateTimeFormat('pt-BR', timeOptions).format(date).replace(':', 'h')

    return isToday ? `Hoje, ${formattedTime}` : `${formattedDate}, ${formattedTime}`
}