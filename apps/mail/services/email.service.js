import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const EMAIL_KEY = 'emailDB'
_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getDefaultFilter
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search 
    isRead: true,   // (optional property, if missing: show all) 
    isStared: true, // (optional property, if missing: show all) 
    lables: ['important', 'romantic'] // has any of the labels 
}

function query(filterBy = {}) {
    return asyncStorageService.query(EMAIL_KEY)
        .then(emails => {

            if (filterBy.txt) {
                const regEXP = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email =>
                    regEXP.test(email.subject) ||
                    regEXP.test(email.body) ||
                    regEXP.test(email.from)
                )
            }
            // if (filterBy.status) {
            //     emails = emails.filter(email => {
            //         if (filterBy.status === 'inbox') return !email.removedAt && email.to === loggedinUser.email
            //         if (filterBy.status === 'sent') return !email.removedAt && email.from === loggedinUser.email
            //         if (filterBy.status === 'trash') return !!email.removedAt
            //         if (filterBy.status === 'draft') return !email.sentAt
            //         return true
            //     })
            // }

            // if (filterBy.isRead !== undefined && filterBy.isRead !== null) {
            //     emails = emails.filter(email => email.isRead === filterBy.isRead)
            // }

            // if (filterBy.isStared !== undefined && filterBy.isStared !== null) {
            //     emails = emails.filter(email => email.isStared === filterBy.isStared)
            // }

            // if (filterBy.labels && filterBy.labels.length > 0) {
            //     emails = emails.filter(email =>
            //         email.labels && email.labels.some(label => filterBy.labels.includes(label))
            //     )
            // }

            return emails
        })
}

function get(emailId) {
    return asyncStorageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return asyncStorageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return asyncStorageService.put(EMAIL_KEY, email)
    } else {
        email.sentAt = Date.now()
        email.from = loggedinUser.email
        return asyncStorageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: '',
        isStared: false,
        lables: []
    }
}

function getDefaultFilter() { return { txt: '', status: 'inbox' } }

function _createEmail(subject, body, from, sentAt) {
    const email = getEmptyEmail()
    email.id = utilService.makeId()
    email.subject = subject
    email.body = body
    email.from = from
    email.to = loggedinUser.email
    email.sentAt = (sentAt) ? new Date(sentAt).getTime() : Date.now()
    return email
}

function _createEmails() {
    let emails = storageService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = [
            //demos
            _createEmail('Your booking has been successfully cancelled', 'Booking ID: 648296339 We have confirmed the cancellation of your booking at Amanti MadeForTwo Hotels - Ayia Napa.', 'Agoda Customer Service'),
            _createEmail('Your automatic payment could not be created through Agoda Company Pte. Ltd.', 'We were unable to complete your request to set up automatic payment with Agoda Company Pte. Ltd.. For more details, please visit our support center. You can also return to Agoda Company Pte. Ltd. and select a different payment method.', 'service@paypal.co.il'),
            _createEmail('Gazelle is truly timeless', 'With a suede upper and gum rubber outsole, Gazelle has been moving strong since the ‘60s. Shop the streetwear staple and add timeless retro style to your everyday look.', 'adidas', '09/09/2025'),
            _createEmail('How does the sound quality of high-end amplifiers compare to regular ones? Is there a...?', 'How does the sound quality of high-end amplifiers compare to regular ones? Is there a way to determine which one has better sound quality?', 'Quora Digest', '01/04/2025')
        ]
        storageService.saveToStorage(EMAIL_KEY, emails)
    }
}