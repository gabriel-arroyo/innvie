/* eslint-disable no-console */
/* eslint-disable camelcase */
import emailjs from "@emailjs/browser"

const service_id = "service_lytpmd3"
const publick_key = "3asCHkKqOW8LMZnGa"
const template_id_confirmation = "template_kz9i168"
const template_id_2 = "template_04kuvre"
const innvie_mail = "innvie.hotel@gmail.com"

export function sendTemplateEmail(reply_to, to_email, subject, body) {
  try {
    const result = emailjs.send(
      service_id,
      template_id_2,
      {
        subject,
        body,
        to_email,
        reply_to,
      },
      publick_key
    )
    console.log("🚀 ~ file: mail.js:35 ~ sendEmailPass ~ result", result)
  } catch (error) {
    console.log("🚀 ~ file: mail.js:14 ~ sendEmailConfirmation ~ error", error)
  }
}

export async function sendEmailConfirmation(to_name, to_email, check_in, check_out) {
  try {
    const result = await emailjs.send(
      service_id,
      template_id_confirmation,
      {
        from_name: "Innvie Motel",
        to_name,
        check_in,
        check_out,
        to_email,
        reply_to: innvie_mail,
      },
      "3asCHkKqOW8LMZnGa"
    )
    console.log("🚀 ~ file: mail.js:13 ~ sendEmailConfirmation ~ result", result)
  } catch (error) {
    console.log("🚀 ~ file: mail.js:14 ~ sendEmailConfirmation ~ error", error)
  }
}

export async function sendEmailPass(access_key, to_email, check_in, check_out) {
  const subject = "Innvie Motel - Access Key"
  const body = `
  We are ready to receive you at Innvie Motel!

Your access key is:

${access_key}

If you would like to stay informed about our news or nearby tourist attractions, you can check our website at [www.innviemotel.com](http://www.innviemotel.com/tourism)

Or you can do it directly at the motel front desk.

We confirm that your stay is:

*Check in: ${check_in} at 3:00pm*

*Check Out: ${check_out} at 12:00pm*

After these dates, your access to the room will be disabled. If you need help with access lockout during your stay, please go to our front desk.

Thank you for your trust.
  `
  sendTemplateEmail(innvie_mail, to_email, subject, body)
}

export async function sendContact(name, phone, email, message) {
  const date = new Date().toLocaleString()
  const subject = `New contact from ${email}`
  const body = `Hello,

  We have received a new contact from our www.innviemotel.com page on ${date}.

The contact details are as follows:

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}

Please follow up with this contact as soon as possible.`

  sendTemplateEmail(email, innvie_mail, subject, body)
}

export async function sendReservationChange({
  name,
  email,
  check_in,
  check_out,
  room,
  access_key,
  message,
}) {
  const date = new Date().toLocaleString()
  const subject = `Reservation change for ${email}`
  const body = `Hello,

  We have received a reservation change from our www.innviemotel.com page on ${date}.
  The new information is as follows:
    Client: ${name}
    Email: ${email}
    Check in: ${check_in}
    Check out: ${check_out}
    Room: ${room}
    Access key: ${access_key}
    Message: ${message}

    For more information, please contact us at innviestay@gmail.com`

  sendTemplateEmail(innvie_mail, innvie_mail, subject, body)
  sendTemplateEmail(innvie_mail, email, subject, body)
}
