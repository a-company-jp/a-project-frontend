import React from 'react'
import { useState } from 'react'
import MileStoneTitle from './MileStoneTitle'
import MileStoneDescription from './MileStoneDescription'
import DetailModal from './DetailModal'

type Props = {
  title: string
  description: string
}

const MileStoneContent = ({ title, description }: Props) => {
  // styles (IMO: No strict typing needed.)
  const styles = {
    sizing: 'w-11/12 h-full',
    boxing: 'ml-2 md:p-4 md:pt-6 pt-6 break-words ',
    text: 'whitespace-pre-line',
    color: 'bg-gray-300',
    border: 'rounded-lg'
  }

  // State
  // TODO: implement custom hook
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => setIsModalOpen(true)

  // UI
  return (
    <div className={`${styles.sizing} ${styles.boxing} ${styles.text} ${styles.color} ${styles.border}`}>
      <MileStoneTitle title={title} />
      
      <MileStoneDescription 
       modal={<DetailModal setIsModalOpen={setIsModalOpen}
          description={description}
          title={title}/>}
        isModalOpen={isModalOpen}
        openModal={openModal}
        description={description}
        />
    </div>
  )
}

export default MileStoneContent
