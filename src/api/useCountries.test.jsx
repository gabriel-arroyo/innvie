/* eslint-disable no-undef */
import { renderHook } from "@testing-library/react"
import useCountries from "./useCountries"

let result
jest.setTimeout(30000)
describe("useCountries", () => {
  beforeEach(() => {
    result = renderHook(() => useCountries()).result
  })
  it("should render countries", async () => {
    const countries = await result.current.greet()
    console.log(countries)
  })
})
