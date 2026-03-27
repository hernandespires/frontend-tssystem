import { describe, it, expect } from "vitest"
import { formatDepartmentLabel, isDepartmentMapped, normalizeText } from "@/utils/department"

describe("normalizeText", () => {
	it("should remove accents and convert to uppercase", () => {
		expect(normalizeText("Câmeras")).toBe("CAMERAS")
		expect(normalizeText("acessórios")).toBe("ACESSORIOS")
		expect(normalizeText("informática")).toBe("INFORMATICA")
	})

	it("should handle already uppercase text", () => {
		expect(normalizeText("NOTEBOOKS")).toBe("NOTEBOOKS")
	})

	it("should handle empty string", () => {
		expect(normalizeText("")).toBe("")
	})

	it("should handle text with multiple accents", () => {
		expect(normalizeText("PATRIMÔNIO DESCARTADO")).toBe("PATRIMONIO DESCARTADO")
	})
})

describe("formatDepartmentLabel", () => {
	it("should replace underscores with spaces and capitalize", () => {
		expect(formatDepartmentLabel("PAID_TRAFFIC")).toBe("Paid Traffic")
	})

	it("should capitalize 'and' since it is not in Portuguese LOWERCASE_WORDS", () => {
		// LOWERCASE_WORDS contains Portuguese connectors ("e", "de", "do") but not "and"
		expect(formatDepartmentLabel("RESEARCH_AND_DEVELOPMENT")).toBe("Research And Development")
	})

	it("should capitalize first word even if it is a connector", () => {
		expect(formatDepartmentLabel("de_algo")).toBe("De Algo")
	})

	it("should handle single word", () => {
		expect(formatDepartmentLabel("MARKETING")).toBe("Marketing")
	})

	it("should handle already formatted text", () => {
		expect(formatDepartmentLabel("Social Media")).toBe("Social Media")
	})
})

describe("isDepartmentMapped", () => {
	it("should return false for unmapped departments (map was cleared)", () => {
		expect(isDepartmentMapped("ANYTHING")).toBe(false)
		expect(isDepartmentMapped("MARKETING")).toBe(false)
	})
})
