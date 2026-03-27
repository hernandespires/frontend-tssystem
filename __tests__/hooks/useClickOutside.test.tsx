import { describe, it, expect, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import { useRef } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"

function TestComponent({ onClickOutside }: { onClickOutside: () => void }) {
	const ref = useRef<HTMLDivElement>(null)
	useClickOutside(ref, onClickOutside)

	return (
		<div>
			<div ref={ref} data-testid="inside">
				Inside element
			</div>
			<div data-testid="outside">Outside element</div>
		</div>
	)
}

describe("useClickOutside", () => {
	it("should call onClickOutside when clicking outside the ref element", () => {
		const handleClickOutside = vi.fn()
		const { getByTestId } = render(<TestComponent onClickOutside={handleClickOutside} />)

		fireEvent.mouseDown(getByTestId("outside"))
		expect(handleClickOutside).toHaveBeenCalledTimes(1)
	})

	it("should NOT call onClickOutside when clicking inside the ref element", () => {
		const handleClickOutside = vi.fn()
		const { getByTestId } = render(<TestComponent onClickOutside={handleClickOutside} />)

		fireEvent.mouseDown(getByTestId("inside"))
		expect(handleClickOutside).not.toHaveBeenCalled()
	})

	it("should call onClickOutside multiple times on multiple outside clicks", () => {
		const handleClickOutside = vi.fn()
		const { getByTestId } = render(<TestComponent onClickOutside={handleClickOutside} />)

		fireEvent.mouseDown(getByTestId("outside"))
		fireEvent.mouseDown(getByTestId("outside"))
		fireEvent.mouseDown(getByTestId("outside"))
		expect(handleClickOutside).toHaveBeenCalledTimes(3)
	})

	it("should clean up event listener on unmount", () => {
		const handleClickOutside = vi.fn()
		const { unmount } = render(<TestComponent onClickOutside={handleClickOutside} />)

		unmount()

		fireEvent.mouseDown(document)
		expect(handleClickOutside).not.toHaveBeenCalled()
	})
})
