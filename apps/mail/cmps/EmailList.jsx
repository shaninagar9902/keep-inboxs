import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, onRemoveEmail }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>From</th>
                    <th>Subject</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>

                {emails.map(email => (
                    <EmailPreview key={email.id} email={email} onRemoveEmail={onRemoveEmail} />
                    // <button onClick={() => onRemoveEmail(email.id)}>Remove Email</button>
                    // <button><Link to={`/email/${email.id}`}>Details</Link></button>
                ))}
            </tbody>
        </table>
    )
}