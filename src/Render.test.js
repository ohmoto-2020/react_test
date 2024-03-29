import React from "react"
import { render, screen } from "@testing-library/react"
import Render from "./Render"

describe("Rendering", () => {
  it("should render all the elements correctly", () => {
    render(<Render />)
    // screen.debug(screen.getByRole("heading"));
    expect(screen.getByRole("heading")).toBeTruthy()
    expect(screen.getByRole("textbox")).toBeTruthy()
    expect(screen.getAllByRole("button")[0]).toBeTruthy()
    expect(screen.getAllByRole("button")[1]).toBeTruthy()
    expect(screen.getByText("Udemy")).toBeTruthy()
    expect(screen.getByTestId("copyright")).toBeTruthy()
  })
})
