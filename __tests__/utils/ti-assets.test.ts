import { describe, it, expect } from "vitest"
import {
	ASSET_TYPE_OPTIONS,
	DEPARTMENT_FILTER_BY_ASSET_TYPE,
	BRAND_FILTER_BY_ASSET_TYPE,
	MODEL_FILTER_BY_ASSET_TYPE,
	ASSET_BRANDS,
	ASSET_MODELS,
	ASSET_SIZES,
	ASSET_STATUSES,
	ASSET_SUPPLIERS,
	ASSET_CATEGORIES,
} from "@/utils/constants/ti-assets"

describe("ASSET_TYPE_OPTIONS", () => {
	it("should be a non-empty array of strings", () => {
		expect(ASSET_TYPE_OPTIONS.length).toBeGreaterThan(0)
		ASSET_TYPE_OPTIONS.forEach((type) => {
			expect(typeof type).toBe("string")
			expect(type.length).toBeGreaterThan(0)
		})
	})

	it("should be sorted alphabetically", () => {
		const sorted = [...ASSET_TYPE_OPTIONS].sort((a, b) => a.localeCompare(b))
		expect(ASSET_TYPE_OPTIONS).toEqual(sorted)
	})

	it("should contain expected types", () => {
		expect(ASSET_TYPE_OPTIONS).toContain("NOTEBOOKS")
		expect(ASSET_TYPE_OPTIONS).toContain("COMPUTADORES")
		expect(ASSET_TYPE_OPTIONS).toContain("CELULARES")
		expect(ASSET_TYPE_OPTIONS).toContain("TELAS")
	})

	it("should not have duplicates", () => {
		const unique = new Set(ASSET_TYPE_OPTIONS)
		expect(unique.size).toBe(ASSET_TYPE_OPTIONS.length)
	})
})

describe("DEPARTMENT_FILTER_BY_ASSET_TYPE", () => {
	it("should have empty arrays for types that accept all departments", () => {
		expect(DEPARTMENT_FILTER_BY_ASSET_TYPE["NOTEBOOKS"]).toEqual([])
		expect(DEPARTMENT_FILTER_BY_ASSET_TYPE["COMPUTADORES"]).toEqual([])
		expect(DEPARTMENT_FILTER_BY_ASSET_TYPE["TELAS"]).toEqual([])
	})

	it("should have specific filters for restricted types", () => {
		expect(DEPARTMENT_FILTER_BY_ASSET_TYPE["CAMERAS TS CAST"]).toContain("AUDIOVISUAL")
		expect(DEPARTMENT_FILTER_BY_ASSET_TYPE["CAMERAS TS CAST"]).toContain("MARKETING")
		expect(DEPARTMENT_FILTER_BY_ASSET_TYPE["CELULARES"]).toContain("SOCIAL MEDIA")
	})

	it("should only contain string arrays as values", () => {
		Object.values(DEPARTMENT_FILTER_BY_ASSET_TYPE).forEach((depts) => {
			expect(Array.isArray(depts)).toBe(true)
			depts.forEach((d) => expect(typeof d).toBe("string"))
		})
	})
})

describe("BRAND_FILTER_BY_ASSET_TYPE", () => {
	it("should have notebook brands including common brands", () => {
		const notebookBrands = BRAND_FILTER_BY_ASSET_TYPE["NOTEBOOK"]
		expect(notebookBrands).toContain("DELL")
		expect(notebookBrands).toContain("APPLE")
		expect(notebookBrands).toContain("LENOVO")
	})

	it("should have camera brands for CÂMERAS TS CAST", () => {
		const cameraBrands = BRAND_FILTER_BY_ASSET_TYPE["CÂMERAS TS CAST"]
		expect(cameraBrands).toContain("CANON")
		expect(cameraBrands).toContain("SONY")
	})
})

describe("MODEL_FILTER_BY_ASSET_TYPE", () => {
	it("should have notebook models", () => {
		const notebookModels = MODEL_FILTER_BY_ASSET_TYPE["NOTEBOOK"]
		expect(notebookModels).toContain("MACBOOK")
		expect(notebookModels).toContain("LATITUDE")
		expect(notebookModels).toContain("THINKPAD")
	})

	it("should have phone models for CELULAR", () => {
		const phoneModels = MODEL_FILTER_BY_ASSET_TYPE["CELULAR"]
		expect(phoneModels).toContain("IPHONE")
	})
})

describe("Asana enum option arrays", () => {
	it("ASSET_BRANDS should have valid entries with gid and name", () => {
		expect(ASSET_BRANDS.length).toBeGreaterThan(0)
		ASSET_BRANDS.forEach((brand) => {
			expect(brand.gid).toBeTruthy()
			expect(brand.name).toBeTruthy()
			expect(typeof brand.enabled).toBe("boolean")
		})
	})

	it("ASSET_MODELS should have valid entries", () => {
		expect(ASSET_MODELS.length).toBeGreaterThan(0)
		ASSET_MODELS.forEach((model) => {
			expect(model.gid).toBeTruthy()
			expect(model.name).toBeTruthy()
		})
	})

	it("ASSET_SIZES should have valid entries", () => {
		expect(ASSET_SIZES.length).toBeGreaterThan(0)
		ASSET_SIZES.forEach((size) => {
			expect(size.gid).toBeTruthy()
			expect(size.name).toBeTruthy()
		})
	})

	it("ASSET_STATUSES should have valid entries", () => {
		expect(ASSET_STATUSES.length).toBeGreaterThan(0)
		expect(ASSET_STATUSES.map((s) => s.name)).toContain("OK")
		expect(ASSET_STATUSES.map((s) => s.name)).toContain("DESCARTADO")
	})

	it("ASSET_CATEGORIES should have valid entries", () => {
		expect(ASSET_CATEGORIES.length).toBeGreaterThan(0)
	})

	it("ASSET_SUPPLIERS should be a non-empty string array", () => {
		expect(ASSET_SUPPLIERS.length).toBeGreaterThan(0)
		ASSET_SUPPLIERS.forEach((s) => expect(typeof s).toBe("string"))
	})

	it("ASSET_BRANDS should not have duplicate gids", () => {
		const gids = ASSET_BRANDS.map((b) => b.gid)
		expect(new Set(gids).size).toBe(gids.length)
	})

	it("ASSET_MODELS should not have duplicate gids", () => {
		const gids = ASSET_MODELS.map((m) => m.gid)
		expect(new Set(gids).size).toBe(gids.length)
	})
})
