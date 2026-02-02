export const formatterCurrencyBRL = (value: string): string => {
    const onlyNumbers = value.replace(/\D/g, "")
    const number = Number(onlyNumbers) / 100

    return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export const formatterBigDecimal = (value: string): number => {
    const normalized = value.replace(/\s/g, "").replace("R$", "").replace(/\./g, "").replace(",", ".")
    return Number(normalized)
}

export const formatterRG = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 12);
}

export const formatterCPF = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14)
}