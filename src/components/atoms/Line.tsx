import React from 'react'

type Props = {}

const Line = (props: Props) => {
    const BoxStyle = 'relative md:w-48 w-24 md:h-24 h-12'
    const LineStyle = 'move-line-right absolute left-0 top-0 bottom-0 w-1 bg-gray-300'

    return (
        <>
            <div className={BoxStyle}>
                <div className={LineStyle}></div>
            </div>
        </>
    )
}

export default Line
