import { emailService } from "../services/email.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function emailDetails() {
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

    if (!email) return <div>Loading...</div>

    return (
        <section className="email-details">
            <button onClick={() => navigate('/email')}>Back</button>
            <h1>Email details</h1>
            <h3>ID: {email.id}</h3 >
            <h3>Title: {email.title}</h3 >
            <div className="description-container">
                <h3>Description:</h3>
                <LongTxt txt={email.description} length={100} />
            </div>
            <div>
                <Link to={`/email/${email.prevEmailId}`}>Previous Email | </Link>
                <Link to={`/email/${email.nextEmailId}`}>Next Email</Link>
            </div>
        </section >
    )
}