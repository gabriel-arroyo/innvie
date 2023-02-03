/* eslint-disable camelcase */
import emailjs from "@emailjs/browser"

export async function sendEmailConfirmation(to_name, to_email, check_in, check_out) {
  try {
    const result = await emailjs.send(
      "service_lytpmd3",
      "template_kz9i168",
      {
        from_name: "Innvie Motel",
        to_name,
        check_in,
        check_out,
        to_email,
        reply_to: "innvie.hotel@gmail.com",
      },
      "3asCHkKqOW8LMZnGa"
    )
    console.log("🚀 ~ file: mail.js:13 ~ sendEmailConfirmation ~ result", result)
  } catch (error) {
    console.log("🚀 ~ file: mail.js:14 ~ sendEmailConfirmation ~ error", error)
  }
}

export async function sendEmailPass(access_key, to_email, check_in, check_out) {
  try {
    const result = await emailjs.send("service_lytpmd3", "template_04kuvre", {
      from_name: "Innvie Motel",
      access_key,
      check_in,
      check_out,
      to_email,
      reply_to: "innvie.hotel@gmail.com",
    })
    console.log("🚀 ~ file: mail.js:35 ~ sendEmailPass ~ result", result)
  } catch (error) {
    console.log("🚀 ~ file: mail.js:14 ~ sendEmailConfirmation ~ error", error)
  }
}
