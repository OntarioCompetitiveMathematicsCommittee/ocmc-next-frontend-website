'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const ExecPod = ({ image, firstName, lastName, bgColour, textColour, position, link, description }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cursor, setCursor] = useState(null)
    const fullName = `${firstName} ${lastName}`

    useEffect(() => {
        if (!isOpen) return

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false)
        }

        const { overflow } = document.body.style
        document.body.style.overflow = "hidden"
        document.addEventListener('keydown', closeOnEscape)

        return () => {
            document.body.style.overflow = overflow
            document.removeEventListener('keydown', closeOnEscape)
        }
    }, [isOpen])

    const moreLink = link &&
        <a
            className={`underline cursor-pointer ${textColour}`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
        >
            More {firstName} &rarr;
        </a>

    // Portalled for the same reason as the bio below — and pinned to the
    // viewport coordinates of the pointer so it trails the cursor.
    const renderHint = () => createPortal(
        <div
            className='fixed z-[70] px-2 py-1 text-xs text-white rounded-md pointer-events-none whitespace-nowrap bg-black/80'
            style={{ top: cursor.y + 20, left: cursor.x + 16 }}
        >
            Click to learn more
        </div>,
        document.body
    )

    // Portalled to the body on purpose: the card scales on hover, and a
    // transformed ancestor becomes the containing block for `position: fixed`,
    // which would collapse this overlay into the card.
    const renderBio = () => createPortal(
        <div
            className='fixed inset-0 z-[60] flex items-center justify-center p-4 cursor-default bg-black/60'
            onClick={() => setIsOpen(false)}
        >
            <div
                className={`relative flex flex-col w-full max-w-xl gap-4 p-8 overflow-y-auto rounded-xl max-h-[85vh] ${bgColour}`}
                role='dialog'
                aria-modal='true'
                aria-label={`About ${fullName}`}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className={`absolute text-3xl leading-none top-4 right-5 cursor-pointer ${textColour}`}
                    onClick={() => setIsOpen(false)}
                    aria-label={`Close ${fullName}'s bio`}
                >
                    &times;
                </button>
                <div className='flex flex-col gap-1 pr-8'>
                    <h2 className={`text-2xl font-bold ${textColour}`}>
                        {fullName}
                    </h2>
                    {
                        position &&
                        <h3 className='text-md font-regular'>
                            {position}
                        </h3>
                    }
                </div>
                <p className='leading-relaxed text-md'>
                    {description}
                </p>
                {moreLink}
            </div>
        </div>,
        document.body
    )

    return (
        <>
            <div
                className={
                    `flex items-center gap-6 justify-start md:justify-center rounded-xl p-3 w-[90vw] max-w-md md:flex-col md:p-4 md:w-auto md:gap-2 ${bgColour} ${
                        description ? "cursor-precision transition-transform hover:scale-[1.02]" : ""
                    }`
                }
                role={description ? "button" : undefined}
                tabIndex={description ? 0 : undefined}
                aria-haspopup={description ? "dialog" : undefined}
                onClick={description ? () => setIsOpen(true) : undefined}
                onPointerMove={
                    description
                    ?   (event) => {
                            // Touch and pen leave a stale hint behind, so only mice get one.
                            if (event.pointerType !== "mouse") return
                            setCursor({ x: event.clientX, y: event.clientY })
                        }
                    :   undefined
                }
                onPointerLeave={description ? () => setCursor(null) : undefined}
                onKeyDown={
                    description
                    ?   (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                setIsOpen(true)
                            }
                        }
                    :   undefined
                }
            >
                {
                    image
                    ?   <Image className='w-32 rounded-xl md:w-64' src={image} alt={fullName}/>
                    :   <div className={`flex items-center justify-center w-32 h-32 text-4xl font-bold rounded-xl bg-black/10 md:w-64 md:h-64 md:text-7xl ${textColour}`}>
                            {firstName.charAt(0) + lastName.charAt(0)}
                        </div>
                }
                <div className='flex flex-col items-start justify-center gap-2 md:items-center'>
                    <h2 className={`text-2xl font-bold ${textColour} `}>
                        {fullName}
                    </h2>
                    {
                        position &&
                        <h3 className='text-md font-regular'>
                            {position}
                        </h3>
                    }
                    {moreLink}
                </div>
            </div>
            {cursor && !isOpen && renderHint()}
            {isOpen && renderBio()}
        </>
    )
}

export default ExecPod
