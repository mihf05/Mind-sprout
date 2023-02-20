import { updateLastLoggedInDate } from "../../firebase";
import ModalHeadsUp from "../modals/modalHeadsUp";

export function calCulateLoginStreak (appData: any, setter: any, setModalRender: any, userData: any){
    const {streak, lastLoggedIn } = appData.loginStreak;
    if(!userData || !lastLoggedIn) return;

    const lastLoggedInTime = new Date(lastLoggedIn).getTime();

const today = new Date();
    const todayString = today.toDateString();
    const roundTime = new Date(todayString).getTime();

    if((roundTime - lastLoggedInTime) > 86400000){
        updateLastLoggedInDate('RESET', todayString, userData.uid)

        setModalRender({showModal: true, componentToRender: <ModalHeadsUp cancel click={() => {
            setModalRender({showModal: false, componentToRender: null});
        }}>
            <h1>Your Login streak broke.</h1>
            <p>You have missed your daily login to Mind Sprout. Login regularly to maintain your streak.</p>
        </ModalHeadsUp>})  
        setter(1)
    } else if(lastLoggedIn == todayString){
        setter(streak)
    } else {
        updateLastLoggedInDate('INCREMENT', todayString, userData.uid)
        setter(streak + 1)
    }
}