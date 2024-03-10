'use client'
import React, { useState } from 'react'

// TODO: optimize this number
const renderingTextNum = {
  large: 180,
  small: 50
}

// TODO: make it better interface
type Props = {
  modal: React.ReactNode
  isModalOpen: boolean
  openModal: () => void
  description: string
}

const LimitedText = (text: string, type: 'sm' | 'lg') => {
  if (type === 'lg') {
    return text.slice(0, renderingTextNum.large)
  } else {
    return text.slice(0, renderingTextNum.small)
  }
}

const MileStoneDescription = ({ modal, isModalOpen, openModal, description }: Props): JSX.Element => {

  // styles (IMO: No strict typing needed.)
  const styles = {
    description: {
      boxing: 'md:h-20 w-full break-words',
      text: 'md:text-lg text-xs',
      spacing: 'md:mt-4 mt-1',
    },
    detail: {
      text: 'text-xs text-blue-400 hover:text-blue-200'
    }
  }

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const handleResize = () => setWindowWidth(window.innerWidth)
  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // UI
  return (
    <>
      {isModalOpen && modal}
      <p className={`${styles.description.boxing} ${styles.description.text} ${styles.description.spacing}`}>
        {LimitedText(description, windowWidth > 768 ? 'lg' : 'sm')}
        {description.length > renderingTextNum[windowWidth > 768 ? 'large' : 'small']
        && <span className={`${styles.detail.text}`} onClick={openModal}>...detail</span>}
        </p>
    </>
  )
}

export default MileStoneDescription
