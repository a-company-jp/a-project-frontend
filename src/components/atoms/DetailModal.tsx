import React from 'react'


type Props = {
    setIsModalOpen: (isModalOpen: boolean) => void;
    title: string;
    description: string;
}

const DetailModal = ({ setIsModalOpen, title, description }: Props) => {

    const styles = {
        modal: {
            wallpaper: 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50',
            modalBox: 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 md:w-1/2 h-1/2 rounded-3xl shadow-lg',
            textBox: 'flex flex-col items-center justify-around w-full h-full px-12',
        },
        text: {
            title: 'w-full text-2xl text-left ',
            description: 'w-full text-lg h-60',
        },
        button: 'bg-blue-300 rounded-full w-16 h-8 flex justify-center items-center'
    }


    const CloseModal = () => setIsModalOpen(false)

    return (
        <>
            <div className={styles.modal.wallpaper}>
                <div className={styles.modal.modalBox}>
                    <div className={styles.modal.textBox}>
                        <h1 className={styles.text.title}>{title}</h1>
                        <p className={styles.text.description}>{description}</p>
                        <button className={styles.button} onClick={CloseModal}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailModal
