'use client'
import React from 'react'
import Image from 'next/image'

// TODO: implement this in utils
const generateImageUri = (imageHash: string) => {
    return imageHash
    throw new Error('Not implemented')
}

type Props = {
    imageHash: string | null
}

const MileStoneImage = ({ imageHash }: Props): JSX.Element => {

    // props handling
    // TODO: modify alternative image
    const imageUri = imageHash ? generateImageUri(imageHash) : '/milestone-sample.png'

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
                src={imageUri}
                className='relative md:right-3 left-3'
                alt='Milestone Image'
                width={windowWidth > 768 ? imageSizes.large.width : imageSizes.small.width}
                height={windowWidth > 768 ? imageSizes.large.height : imageSizes.small.height} />
        </>
    )
}

export default MileStoneImage
