export default function Print(text, name = "", color = "#bada55") {
  return console.log(
    `%c ${name ? `${name}:` : ""} ${JSON.stringify(text)}`,
    `background: #222; color: ${color}`
  )
}
