export const dateToISO = (value: string) => {
	return value ? new Date(value).toISOString() : undefined
}
