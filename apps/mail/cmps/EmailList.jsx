import { EmailPreview } from "./EmailPreview.jsx";
import { EmailCompose } from "./EmailCompose.jsx";

export function EmailList({ emails, onRemoveEmail }) {
    return (
        <section>
            <table>
                {/* <thead>
                <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Date</th>
                </tr>
                </thead> */}
                <tbody>

                    {emails.map(email => (
                        <EmailPreview key={email.id} email={email} onRemoveEmail={onRemoveEmail} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}