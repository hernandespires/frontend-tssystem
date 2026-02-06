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
        .slice(0, 12)
}

export const formatterCPF = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14)
}

export const formatterPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    const phone = digits.startsWith('55') ? digits.slice(2) : digits

    if (phone.length < 2) return phone

    const ddd = phone.slice(0, 2)
    const firstPart = phone.slice(2, 7)
    const lastPart = phone.slice(7, 11)

    if (phone.length === 2) return `+55 (${ddd})`
    if (phone.length <= 7) return `+55 (${ddd}) ${firstPart}`
    
    return `+55 (${ddd}) ${firstPart}-${lastPart}`
}

export const formatterPostalCode = (value: string): string => {
    const digits = value.replace(/\D/g, '')

    if (digits.length < 5) return digits

    const firstPart = digits.slice(0, 5)
    const lastPart = digits.slice(5, 8)

    if (digits.length === 5) return firstPart

    return `${firstPart}-${lastPart}`
}

export const formatterPisPasep = (value: string): string => {
    const digits = value.replace(/\D/g, '')

    if (digits.length < 3) return digits

    const part1 = digits.slice(0, 3)
    const part2 = digits.slice(3, 8)
    const part3 = digits.slice(8, 10)
    const part4 = digits.slice(10, 11)

    if (digits.length <= 3) return part1
    if (digits.length <= 8) return `${part1}.${part2}`
    if (digits.length <= 10) return `${part1}.${part2}.${part3}`

    return `${part1}.${part2}.${part3}-${part4}`
}

export const formatterBankAgencyAndAccount = (value: string): string | null => {
    if (!value) return ""

    const digits = value?.replace(/\D/g, '')

    if (digits?.length < 4) return digits

    const agency = digits?.slice(0, 4)
    const checkDigit = digits?.slice(4, 5)

    if (digits?.length === 4) return agency

    return `${agency}-${checkDigit}`
}

export const formatterCNPJ = (value: string): string => {
    return value?.replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
        .slice(0, 18)
}

export const formatterPix = (value: string): string => {
    if (!value) return ""

    const hasLetter = /[a-zA-Z]/.test(value)
    if (hasLetter) return value

    let digits = value.replace(/\D/g, "")

    if (digits.startsWith("55")) digits = digits.slice(2)
    if (digits.length >= 10 && digits.length <= 11) return formatterPhone(digits)
    if (digits.length <= 11) return formatterCPF(digits)

    return formatterCNPJ(digits)
}