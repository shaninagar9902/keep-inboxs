import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { emailService } from "../services/email.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function EmailIndex() {

    const [emails, setEmails] = useState([])
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
            {/* <Link to="/email/add">Add Email</Link> */}
            <EmailFilter filterBy={filterBy}
                onSetFilterBy={onSetFilterBy} />
            <EmailList emails={emails}
                onRemoveEmail={onRemoveEmail} />
        </section>
    )
}