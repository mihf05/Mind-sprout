
import Button from "./button"

import {feedBackContext, modalContext} from '../context/contextProvider';
import {useContext} from 'react';
import ModalHeadsUp from './modals/modalHeadsUp';

export default function DarkMood() {
    const [, setFeedBack] = useContext(feedBackContext)
    const [, setModal] = useContext(modalContext)
    return (
        <Button className='darkMoodBtn' icon='dark_mode' text="Switch to dark mode" click={() => {
            setModal({showModal: true, componentToRender: <ModalHeadsUp click={() => {
                setModal({showModal: false});
                setFeedBack('Thankyou for understanding.')
            }} blueText="Understood">
                <h1>Under development.</h1>
                <p>Dark mode is currently under development and will be available in the future versions.</p>
            </ModalHeadsUp>})
        }}/>
    )
}
