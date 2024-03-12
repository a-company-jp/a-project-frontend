import React from 'react'

const breakPointToChangeView = 768 // Constant move it to better place

// NOTE: maybe move this to a helper file
const convertToShortHandDate = (date: string): string => {
    const year = date.split('-')[0]
    const month = date.split('-')[1]

    let monthStr

    switch (month) {
        case '01': monthStr = 'Jan'; break
        case '02': monthStr = 'Feb'; break
        case '03': monthStr = 'Mar'; break
        case '04': monthStr = 'Apr'; break
        case '05': monthStr = 'May'; break
        case '06': monthStr = 'Jun'; break
        case '07': monthStr = 'Jul'; break
        case '08': monthStr = 'Aug'; break
        case '09': monthStr = 'Sep'; break
        case '10': monthStr = 'Oct'; break
        case '11': monthStr = 'Nov'; break
        case '12': monthStr = 'Dec'; break
    }

    return `${monthStr} ${year}`
}

type Props = {
    beginDate: string,
    finishDate: string
}

const MileStoneDate = ({ beginDate, finishDate }: Props) : JSX.Element => {
    if (!beginDate || !finishDate) throw new Error('startDate and endDate are required') // TODO: use better error handling

    // styles (IMO: No strict typing needed.)
    const styles = {
        sizing: 'w-32 md:w-48 h-full',
        text: 'md:text-2xl te"xt-xs text-center pr-4',
        flex: 'flex flex-col items-center justify-center',
        color: 'bg-white'
    }

    // TODO: implement custom hook    
    const [windowWidth, setWindowWidth] = React.useState<number>(0)
    
    React.useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = window && (() => setWindowWidth(window.innerWidth))
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <>
            <ul className={`${styles.sizing} ${styles.text} ${styles.flex} ${styles.color}`}>
                <li>{convertToShortHandDate(beginDate)}</li>
                {windowWidth > breakPointToChangeView &&
                    <>
                        <li>|</li>
                        <li>{convertToShortHandDate(finishDate)}</li>
                    </>
                }
            </ul>
        </>
    )
}

export default MileStoneDate
