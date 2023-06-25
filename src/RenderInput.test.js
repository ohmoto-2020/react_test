import React from "react"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import RenderInput from "./RenderInput"
import userEvent from "@testing-library/user-event"

afterEach(() => {
  cleanup()
})

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput />)
    expect(screen.getByRole("button")).toBeTruthy()
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy()
  })
})

describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<RenderInput />)
    const inputValue = screen.getByPlaceholderText("Enter")
    fireEvent.change(inputValue, { target: { value: "test" } })
    expect(inputValue.value).toBe("test")
  })
})

describe("Console button conditionally triggered", () => {
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn()
    render(<RenderInput outputConsole={outputConsole} />)
    userEvent.click(screen.getByRole("button"))
    expect(outputConsole).not.toHaveBeenCalled()
  })
  it("Should trigger output function", () => {
    const outputConsole = jest.fn()
    render(<RenderInput outputConsole={outputConsole} />)
    const inputValue = screen.getByPlaceholderText("Enter")
    fireEvent.change(inputValue, { target: { value: "test" } })
    fireEvent.click(screen.getByRole("button"))
    expect(outputConsole).toHaveBeenCalledTimes(1)
  })
})
