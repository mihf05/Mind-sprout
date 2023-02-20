import s from './user.module.scss'
import { userContext, modalContext } from '../context/contextProvider';
import { useContext } from 'react';
import UserModal from './modals/userModal';

export default function user() {
    const [userDate] =  useContext(userContext);
    const [,setModalRender] =  useContext(modalContext);
    const {displayName, photoURL} = userDate;
    return (
        <div onClick={() => {
            setModalRender({showModal: true, componentToRender: <UserModal/>})
        }} className={`${s.container} userContainer`}>
            <div className={`${s.userLogo} userLogo`}><img src={ photoURL } alt="user profile picture" /></div>
            <span>{displayName}</span>
        </div>
    )
}
