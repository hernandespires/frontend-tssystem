import { describe, it, expect, vi } from "vitest"
import { render, fireEvent, screen } from "@testing-library/react"
import EmployeeSearchDropdown from "@/components/EmployeeSearchDropdown"
import { createMockEmployee } from "../helpers/mock-employee"

const MOCK_EMPLOYEES = [
	createMockEmployee({ id: "1", name: "João Silva", email: "joao@ts.com", department: "AUDIOVISUAL" }),
	createMockEmployee({ id: "2", name: "Maria Souza", email: "maria@ts.com", department: "DESIGN" }),
	createMockEmployee({ id: "3", name: "Carlos Pereira", email: "carlos@ts.com", department: "MARKETING" }),
]

describe("EmployeeSearchDropdown", () => {
	const defaultProps = {
		employees: MOCK_EMPLOYEES,
		searchValue: "",
		onSearchChange: vi.fn(),
		selectedEmployee: null,
		onSelectEmployee: vi.fn(),
		isOpen: false,
		onOpenChange: vi.fn(),
	}

	it("should render search input with placeholder", () => {
		render(<EmployeeSearchDropdown {...defaultProps} />)
		expect(screen.getByPlaceholderText("Buscar colaborador...")).toBeInTheDocument()
	})

	it("should render custom placeholder when provided", () => {
		render(<EmployeeSearchDropdown {...defaultProps} placeholder="Procurar..." />)
		expect(screen.getByPlaceholderText("Procurar...")).toBeInTheDocument()
	})

	it("should not show dropdown when isOpen is false", () => {
		render(<EmployeeSearchDropdown {...defaultProps} />)
		expect(screen.queryByText("João Silva")).not.toBeInTheDocument()
	})

	it("should show all employees when isOpen is true and no search", () => {
		render(<EmployeeSearchDropdown {...defaultProps} isOpen={true} />)
		expect(screen.getByText("João Silva")).toBeInTheDocument()
		expect(screen.getByText("Maria Souza")).toBeInTheDocument()
		expect(screen.getByText("Carlos Pereira")).toBeInTheDocument()
	})

	it("should filter employees by search value (name)", () => {
		render(<EmployeeSearchDropdown {...defaultProps} isOpen={true} searchValue="João" />)
		expect(screen.getByText("João Silva")).toBeInTheDocument()
		expect(screen.queryByText("Maria Souza")).not.toBeInTheDocument()
		expect(screen.queryByText("Carlos Pereira")).not.toBeInTheDocument()
	})

	it("should filter employees by search value (email)", () => {
		render(<EmployeeSearchDropdown {...defaultProps} isOpen={true} searchValue="maria@" />)
		expect(screen.queryByText("João Silva")).not.toBeInTheDocument()
		expect(screen.getByText("Maria Souza")).toBeInTheDocument()
	})

	it("should show empty message when no employees match", () => {
		render(<EmployeeSearchDropdown {...defaultProps} isOpen={true} searchValue="xyz" />)
		expect(screen.getByText("Nenhum colaborador encontrado")).toBeInTheDocument()
	})

	it("should call onSelectEmployee when clicking an employee", () => {
		const onSelectEmployee = vi.fn()
		const onSearchChange = vi.fn()
		const onOpenChange = vi.fn()

		render(
			<EmployeeSearchDropdown
				{...defaultProps}
				isOpen={true}
				onSelectEmployee={onSelectEmployee}
				onSearchChange={onSearchChange}
				onOpenChange={onOpenChange}
			/>
		)

		fireEvent.click(screen.getByText("João Silva"))
		expect(onSelectEmployee).toHaveBeenCalledWith(MOCK_EMPLOYEES[0])
		expect(onSearchChange).toHaveBeenCalledWith("João Silva")
		expect(onOpenChange).toHaveBeenCalledWith(false)
	})

	it("should show selected employee card when selectedEmployee is set", () => {
		render(<EmployeeSearchDropdown {...defaultProps} selectedEmployee={MOCK_EMPLOYEES[1]} />)
		expect(screen.getByText("Maria Souza")).toBeInTheDocument()
		expect(screen.getByText("maria@ts.com")).toBeInTheDocument()
	})

	it("should call onSearchChange when typing in search input", () => {
		const onSearchChange = vi.fn()
		render(<EmployeeSearchDropdown {...defaultProps} onSearchChange={onSearchChange} />)

		fireEvent.change(screen.getByPlaceholderText("Buscar colaborador..."), {
			target: { value: "test" },
		})
		expect(onSearchChange).toHaveBeenCalledWith("test")
	})

	it("should open dropdown on focus", () => {
		const onOpenChange = vi.fn()
		render(<EmployeeSearchDropdown {...defaultProps} onOpenChange={onOpenChange} />)

		fireEvent.focus(screen.getByPlaceholderText("Buscar colaborador..."))
		expect(onOpenChange).toHaveBeenCalledWith(true)
	})

	it("should show employee emails in dropdown", () => {
		render(<EmployeeSearchDropdown {...defaultProps} isOpen={true} />)
		expect(screen.getByText("joao@ts.com")).toBeInTheDocument()
		expect(screen.getByText("maria@ts.com")).toBeInTheDocument()
		expect(screen.getByText("carlos@ts.com")).toBeInTheDocument()
	})

	it("should be case-insensitive when filtering", () => {
		render(<EmployeeSearchDropdown {...defaultProps} isOpen={true} searchValue="joão" />)
		expect(screen.getByText("João Silva")).toBeInTheDocument()
	})
})
