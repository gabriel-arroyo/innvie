import roundTo from "./round"

export default function calculateCost(price, days, tax) {
  const subtotal = Number(price) * days
  const taxAmount = subtotal * tax
  const total = roundTo(subtotal + taxAmount, 2)
  return total
}
