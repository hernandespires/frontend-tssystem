import { describe, it, expect } from "vitest"
import {
	formatterCurrencyBRL,
	formatterBigDecimal,
	formatterRG,
	formatterCPF,
	formatterPhone,
	formatterPostalCode,
	formatterPisPasep,
	formatterBankAgencyAndAccount,
	formatterCNPJ,
	formatterPix,
	formatterEIN,
	formatterITIN,
	formatterSerialNumber,
} from "@/utils/formatters"

describe("formatterCurrencyBRL", () => {
	it("should format number string to BRL currency", () => {
		expect(formatterCurrencyBRL("100000")).toBe("R$\u00a01.000,00")
	})

	it("should strip non-numeric characters before formatting", () => {
		expect(formatterCurrencyBRL("R$ 1.000,00")).toBe("R$\u00a01.000,00")
	})

	it("should handle empty string", () => {
		expect(formatterCurrencyBRL("")).toBe("R$\u00a00,00")
	})

	it("should handle single digit", () => {
		expect(formatterCurrencyBRL("5")).toBe("R$\u00a00,05")
	})
})

describe("formatterBigDecimal", () => {
	it("should convert BRL currency string to number", () => {
		expect(formatterBigDecimal("R$ 1.000,50")).toBe(1000.5)
	})

	it("should handle simple number string", () => {
		expect(formatterBigDecimal("100,00")).toBe(100)
	})

	it("should handle zero", () => {
		expect(formatterBigDecimal("0")).toBe(0)
	})
})

describe("formatterRG", () => {
	it("should format RG with dots and dash", () => {
		expect(formatterRG("123456789")).toBe("12.345.678-9")
	})

	it("should handle partial input", () => {
		expect(formatterRG("12345")).toBe("12.345")
	})

	it("should strip non-numeric characters", () => {
		expect(formatterRG("12.345.678-9")).toBe("12.345.678-9")
	})

	it("should limit to 12 characters", () => {
		expect(formatterRG("1234567890123").length).toBeLessThanOrEqual(12)
	})
})

describe("formatterCPF", () => {
	it("should format complete CPF", () => {
		expect(formatterCPF("12345678901")).toBe("123.456.789-01")
	})

	it("should handle partial CPF", () => {
		expect(formatterCPF("123456")).toBe("123.456")
	})

	it("should strip non-numeric characters", () => {
		expect(formatterCPF("123.456.789-01")).toBe("123.456.789-01")
	})

	it("should limit to 14 characters", () => {
		expect(formatterCPF("123456789012345").length).toBeLessThanOrEqual(14)
	})
})

describe("formatterPhone", () => {
	it("should format complete phone number", () => {
		expect(formatterPhone("11987654321")).toBe("+55 (11) 98765-4321")
	})

	it("should handle DDD only", () => {
		expect(formatterPhone("11")).toBe("+55 (11)")
	})

	it("should handle partial number after DDD", () => {
		expect(formatterPhone("11987")).toBe("+55 (11) 987")
	})

	it("should strip leading 55 country code", () => {
		expect(formatterPhone("5511987654321")).toBe("+55 (11) 98765-4321")
	})

	it("should handle single digit", () => {
		expect(formatterPhone("1")).toBe("1")
	})
})

describe("formatterPostalCode", () => {
	it("should format complete CEP", () => {
		expect(formatterPostalCode("12345678")).toBe("12345-678")
	})

	it("should handle partial input", () => {
		expect(formatterPostalCode("123")).toBe("123")
	})

	it("should handle 5 digits without dash", () => {
		expect(formatterPostalCode("12345")).toBe("12345")
	})
})

describe("formatterPisPasep", () => {
	it("should format complete PIS/PASEP", () => {
		expect(formatterPisPasep("12345678901")).toBe("123.45678.90-1")
	})

	it("should handle partial input", () => {
		expect(formatterPisPasep("123")).toBe("123")
	})

	it("should handle 8 digits", () => {
		expect(formatterPisPasep("12345678")).toBe("123.45678")
	})
})

describe("formatterBankAgencyAndAccount", () => {
	it("should format agency with check digit", () => {
		expect(formatterBankAgencyAndAccount("12345")).toBe("1234-5")
	})

	it("should handle 4 digits without dash", () => {
		expect(formatterBankAgencyAndAccount("1234")).toBe("1234")
	})

	it("should handle empty string", () => {
		expect(formatterBankAgencyAndAccount("")).toBe("")
	})

	it("should handle short input", () => {
		expect(formatterBankAgencyAndAccount("12")).toBe("12")
	})
})

describe("formatterCNPJ", () => {
	it("should format complete CNPJ", () => {
		expect(formatterCNPJ("12345678000190")).toBe("12.345.678/0001-90")
	})

	it("should handle partial CNPJ", () => {
		expect(formatterCNPJ("12345")).toBe("12.345")
	})

	it("should limit to 18 characters", () => {
		expect(formatterCNPJ("123456780001901234").length).toBeLessThanOrEqual(18)
	})
})

describe("formatterPix", () => {
	it("should return value as-is if it contains letters (email/random key)", () => {
		expect(formatterPix("test@email.com")).toBe("test@email.com")
	})

	it("should format as phone if 10-11 digits", () => {
		expect(formatterPix("11987654321")).toBe("+55 (11) 98765-4321")
	})

	it("should format as CPF if up to 11 digits and not phone-length", () => {
		expect(formatterPix("12345678901")).toBe("+55 (12) 34567-8901")
	})

	it("should format as CNPJ if more than 11 digits", () => {
		expect(formatterPix("12345678000190")).toBe("12.345.678/0001-90")
	})

	it("should handle empty string", () => {
		expect(formatterPix("")).toBe("")
	})
})

describe("formatterEIN", () => {
	it("should format EIN with dash", () => {
		expect(formatterEIN("123456789")).toBe("12-3456789")
	})

	it("should handle empty string", () => {
		expect(formatterEIN("")).toBe("")
	})

	it("should limit to 10 characters", () => {
		expect(formatterEIN("12345678901").length).toBeLessThanOrEqual(10)
	})
})

describe("formatterITIN", () => {
	it("should format ITIN with dashes", () => {
		expect(formatterITIN("123456789")).toBe("123-45-6789")
	})

	it("should handle empty string", () => {
		expect(formatterITIN("")).toBe("")
	})

	it("should limit to 11 characters", () => {
		expect(formatterITIN("1234567890123").length).toBeLessThanOrEqual(11)
	})
})

describe("formatterSerialNumber", () => {
	it("should pad to 4 digits", () => {
		expect(formatterSerialNumber("1")).toBe("0001")
	})

	it("should handle 4 digits", () => {
		expect(formatterSerialNumber("1234")).toBe("1234")
	})

	it("should strip non-numeric characters", () => {
		expect(formatterSerialNumber("abc123")).toBe("0123")
	})

	it("should remove leading zeros and re-pad", () => {
		expect(formatterSerialNumber("0042")).toBe("0042")
	})

	it("should limit to 4 digits max (keeps first 4)", () => {
		expect(formatterSerialNumber("12345")).toBe("1234")
	})

	it("should handle empty string (all zeros stripped)", () => {
		expect(formatterSerialNumber("")).toBe("0000")
	})

	it("should handle all zeros", () => {
		expect(formatterSerialNumber("0000")).toBe("0000")
	})
})
