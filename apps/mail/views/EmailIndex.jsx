import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { emailService } from "../services/email.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { EmailCompose } from "../cmps/EmailCompose.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function EmailIndex() {

    const [emails, setEmails] = useState([])
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        emailService.query(filterBy)
            .then(emails => { setEmails(emails) })
            .catch(err => alert('Error!', err))
    }, [filterBy])

    function onRemoveEmail(emailId) {
        emailService.remove(emailId)
            .then(() => {
                const updatedEmails = emails.filter(email => email.id !== emailId)
                setEmails(updatedEmails)
                showSuccessMsg(`Email removed!`)
                if (updatedEmails.length === 0) {
                    window.location.reload()
                }
            })
            .catch(err => {
                alert('Error!', err)
                showErrorMsg(`Problem Removing`)
            })
    }

    function onSetFilterBy(filterBy) {
        // console.log('filterBy:', filterBy);
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // if (!emails.length) return <div>Loading...</div>
    return (
        <section className="email-index">
            <button className="btn-compose" onClick={() => setIsComposeOpen(true)}>✎ New Email</button>
            <EmailFilter filterBy={filterBy}
                onSetFilterBy={onSetFilterBy} />
            {!emails.length ? (
                <div>Loading...</div>
            ) : (
                <EmailList emails={emails}
                    onRemoveEmail={onRemoveEmail} />
            )}
            {isComposeOpen && (
                <EmailCompose onToggleCompose={() => setIsComposeOpen(false)} />
            )}
        </section>
    )
}