import { emailService } from "../services/email.service.js"
import { LongTxt } from "../../../cmps/LongTxt.jsx"
// import { utilService } from "../../../services/util.service.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        onLoad()
    }, [params.emailId])

    function onLoad() {
        emailService.get(params.emailId)
            .then(fetchedEmail => {
                setEmail(fetchedEmail)
            })
            .catch(err => {
                console.log('err:', err);
                navigate('/email')
            })
    }

    if (!email) return <div>No emails to show...</div>

    return (
        <section className="email-details">
            <button onClick={() => navigate('/email')}>Back</button>
            <h1>{email.subject}</h1>
            <h3>{email.from}</h3>
            <div className="email-body">
                <LongTxt txt={email.body} length={100} />
            </div>
            <p>{new Date(email.sentAt).toLocaleString()}</p>
        </section >
    )
}