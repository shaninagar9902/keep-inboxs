import { emailService } from "../services/email.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState } = React
// const { useNavigate } = ReactRouterDOM

export function EmailCompose({ onToggleCompose }) {
    // const navigate = useNavigate()

    const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' })

    function handleChanges({ target }) {
        const field = target.name
        let value = target.value
        setNewEmail(prevEmail => ({ ...prevEmail, [field]: value }))
    }

    function onSendEmail(ev) {
        ev.preventDefault()
        emailService.save(newEmail)
            .then(() => {
                showSuccessMsg(`Email added!`)
                onToggleCompose()
            })
            .catch(err => {
                alert('Error!', err)
                showErrorMsg(`Problem adding email`)
            })
    }

    const { to, subject, body } = newEmail
    return (
        <section className="email-compose">
            <header className="email-compose-header">
                <h2>New Message</h2>
                <button onClick={onToggleCompose} className="btn-close" type="button" >✖</button>
            </header>
            <form onSubmit={onSendEmail} className="email-compose-form">
                <label htmlFor="to">From
                    <h3>Your-Mail</h3>
                </label>
                <label htmlFor="to">To
                    <input id="to" name="to" type="email" value={to} required placeholder="Enter an email..." onChange={handleChanges} />
                </label>
                <label htmlFor="subject">Subject
                    <input id="subject" name="subject" type="text" value={subject} placeholder="Enter the subject..." onChange={handleChanges} />
                </label>
                <label htmlFor="body">
                    <textarea id="body" name="body" type="text" value={body} rows="10" placeholder="Enter the text..." onChange={handleChanges}></textarea>
                </label>
                <button type="submit" className="btn-send">Send</button>
            </form>
        </section>
    )
}