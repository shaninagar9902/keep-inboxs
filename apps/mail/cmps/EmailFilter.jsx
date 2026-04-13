const { useState, useEffect } = React

export function EmailFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChanges({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break;

            default:
                break;
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section className="email-filter">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="txt">Text:
                    <input id="txt" name="txt" type="text" value={txt} placeholder="Filter by txt..." onChange={handleChanges} />
                </label>
            </form>
        </section>
    )
}