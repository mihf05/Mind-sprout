import s from './userModal.module.scss';   
import Button from '../button';
import { delUser, signOut, updateProfilePicture } from '../../firebase';
import { userContext, modalContext, feedBackContext, errorContext } from '../../context/contextProvider';
import { useContext, useState } from 'react';
import UserProfilePicture from '../userProfilePicture';
import ModalHeadsUp from './modalHeadsUp';

export default function UserModal() {
    const [userData, setUserData] = useContext(userContext);
    const [, setModalRender] = useContext(modalContext);
    const [, setFeedBack] = useContext(feedBackContext);
    const [, setShowError] = useContext(errorContext);
    const {displayName, photoURL} = userData;
    const [photoSelected, setPhotoSelected] = useState<any>(null);

    return (
        <div className={`${s.container}`}>
            <UserProfilePicture {...{photoURL}} setter={setPhotoSelected}/>
            <span className={`${s.displayName}`}>{displayName}</span>

            { photoSelected ?
                <Button click={() => {
                    updateProfilePicture(photoSelected, userData, setUserData, setShowError, setFeedBack);
                    setModalRender({showModal: false, componentToRender: null})
                }} text='Update Account' icon='update'/> : null
            }

            <Button click={() => {
                signOut(setUserData, setShowError);
                setModalRender({showModal: false, componentToRender: null})
            }} text='sign out' icon='logout'/>

            <Button click={() => {
                setModalRender({showModal: true, componentToRender:  <ModalHeadsUp cancel reverse click={() => {
                    setModalRender({showModal: false, componentToRender: null});
                    delUser(userData, setUserData).then((requireLogin) => {
                        requireLogin ? setModalRender({showModal: true, componentToRender:  <ModalHeadsUp cancel click={() => {
                                setModalRender({showModal: false, componentToRender: null});
                                setUserData(null)
                            }}>
                                <h1>You haven't logged-in in a while.</h1>
                                <p>Head back to login menu and try again.</p>
                        </ModalHeadsUp>}) : null
                    }) 
                }}>
                        <h1> Are you sure to DELETE your ACCOUNT? </h1>
                        <p>After the deleting process is done, we can't revive you account.</p>
                </ModalHeadsUp>})
            }} red text='Delete Account' icon='delete'/>
        </div>
    )
}
