'use client'
import React from 'react'
import Image from 'next/image'

// TODO: implement this in utils
const generateImageUri = (imageUrl: string) => {
    return imageUrl
    throw new Error('Not implemented')
}

type Props = {
    imageUrl: string | null
}

const MileStoneImage = ({ imageUrl }: Props): JSX.Element => {

    // props handling
    // TODO: modify alternative image
    const imgUrl = imageUrl ? generateImageUri(imageUrl) : '/milestone-sample.png'

    const imageSizes = {
        large: {
            width: 350,
            height: 250
        },
        small: {
            width: 210,
            height: 160
        }
    }

    // states
    // TODO: implement custom hook
    const [windowWidth, setWindowWidth] = React.useState<number>(0)
    React.useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // UI
    return (
        <>
            <Image
                src={imgUrl}
                className='relative md:right-3 left-3'
                alt='Milestone Image'
                width={windowWidth > 768 ? imageSizes.large.width : imageSizes.small.width}
                height={windowWidth > 768 ? imageSizes.large.height : imageSizes.small.height} />
        </>
    )
}

export default MileStoneImage
