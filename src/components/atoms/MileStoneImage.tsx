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
        pc: {
            width: 350,
            height: 250
        },
        mobile: {
            width: 210,
            height: 180
        }
    }

    // states
    // TODO: implement custom hook
    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    React.useEffect(() => {
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
                width={windowWidth > 768 ? imageSizes.pc.width : imageSizes.mobile.width}
                height={windowWidth > 768 ? imageSizes.pc.height : imageSizes.mobile.height} />
        </>
    )
}

export default MileStoneImage
