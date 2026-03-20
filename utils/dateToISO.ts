export const dateToISO = (value: string | Date) => {
	return value ? new Date(value).toISOString() : undefined
}
