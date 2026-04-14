import { utilService } from "../../../services/util.service.js"
const { useNavigate } = ReactRouterDOM

export function EmailPreview({ email, onRemoveEmail }) {
    const navigate = useNavigate()
    const formattedDate = utilService.formatDate(email.sentAt)

    function getDetails(ev) {
        if (ev.target.tagName === 'BUTTON') return
        navigate(`/email/${email.id}`)
    }
    return (
        <tr className="email-preview" onClick={getDetails} style={{ cursor: 'pointer' }}>
            <td>{email.from}</td>
            <td>{email.subject}</td>
            <td>{formattedDate}</td>
            <td>
                <button onClick={() => onRemoveEmail(email.id)}>🗑️</button>
            </td>
        </tr >
    )
}