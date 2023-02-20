import React, { useContext } from 'react'
import s from './header.module.scss'
import { userContext, modalContext } from '../context/contextProvider';
import UserModal from './modals/userModal';


export default function Header({title, subTitle, img, position}: {position?: string, title: string, subTitle: string, img: string}) {
    const [userData] = useContext(userContext)
    const [,setModalRender] = useContext(modalContext)

    return (
        <header className={`${s.header}`} style={{backgroundImage: `url(${img})`,backgroundPosition: position ? position : "center"}}>
            <button className="menuIcon" onClick={() => {
                const sideMenu = document.querySelector(".sideMenu") as HTMLDivElement;
                sideMenu.classList.add('unHide')
            }}>
                <span className="material-symbols-outlined">menu</span>
            </button>

            <div className='userPhotoWrapper'
                onClick={() => {
                    setModalRender({showModal: true, componentToRender: <UserModal/>})
                }}
            > <img src={userData.photoURL} alt="" /></div>

            <h1>{title}</h1>
            <p>{subTitle}</p>
        </header>
    )
}
