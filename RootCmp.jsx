const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx"
import { EmailDetails } from "./apps/mail/views/EmailDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/email" element={<EmailIndex />} />
                <Route path="/email/:emailId" element={<EmailDetails />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}