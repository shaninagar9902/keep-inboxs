import { utilService } from "../../../services/util.service.js"

export function EmailPreview({ email }) {
    const formattedDate = utilService.formatDate(email.sentAt)
    return (
        <article className="email-preview">
            <h2>{email.from}</h2>
            <h2>{email.subject}</h2>
            <h2>{email.body}</h2>
            <h2>{formattedDate}</h2>
        </article>
    )
}