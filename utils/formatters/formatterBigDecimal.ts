export const formatterBigDecimal = (value: string): number => {
    const normalized = value.replace(/\s/g, "").replace("R$", "").replace(/\./g, "").replace(",", ".")
    return Number(normalized)
}