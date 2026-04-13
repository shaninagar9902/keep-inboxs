const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    if (!txt) return null

    const [isLong, setIsLong] = useState(false)

    function onToggle() {
        setIsLong(!isLong)
    }

    const displayText = isLong ? txt : txt.slice(0, length) + '...'

    return (
        <section className="long-txt">
            <p>{displayText}
                {txt.length > length && (
                    <button onClick={onToggle}>{isLong ? 'Read Less' : 'Read More'}</button>
                )}
            </p>
        </section>
    )
}