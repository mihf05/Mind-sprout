import React, { useContext } from 'react';
import { userContext, modalContext } from '../context/contextProvider';
import UserModal from './modals/userModal';
import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  subTitle: string;
  img: string;
  position?: string;
}

export default function Header({ title, subTitle, img, position }: HeaderProps): JSX.Element {
  const [userData] = useContext(userContext);
  const [, setModalRender] = useContext(modalContext);

  const handleMenuClick = (): void => {
    const sideMenu = document.querySelector(".sideMenu");
    if (sideMenu instanceof HTMLElement) {
      sideMenu.classList.add('unHide');
    }
  };

  const handleUserPhotoClick = (): void => {
    setModalRender({ showModal: true, componentToRender: <UserModal /> });
  };

  return (
    <header
      className={styles.header}
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: position || "center"
      }}
    >
      <button className="menuIcon" onClick={handleMenuClick}>
        <span className="material-symbols-outlined">menu</span>
      </button>

      <div className="userPhotoWrapper" onClick={handleUserPhotoClick}>
        <img src={userData?.photoURL || ''} alt="User avatar" />
      </div>

      <h1>{title}</h1>
      <p>{subTitle}</p>
    </header>
  );
}
