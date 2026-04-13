import { EmailPreview } from "./EmailPreview.jsx";
const { Link } = ReactRouterDOM
export function EmailList({ emails, onRemoveEmail }) {
    return (
        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id} className="email-txt">
                    <EmailPreview email={email} />
                    <section>
                        <button onClick={() => onRemoveEmail(email.id)}>Remove Email</button>
                        <button><Link to={`/email/${email.id}`}>Details</Link></button>
                    </section>
                </li>
            )}
        </ul >
    )
}