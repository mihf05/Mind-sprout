import ss from './sideMenu.module.scss'
import s from './sideMenuQuestions.module.scss'
import Button from './button';
import { modalContext, feedBackContext} from '../context/contextProvider';

import { downLoadUrlWithInfo } from '../firebase';
import { useContext, useEffect, useRef } from 'react';
import ModalHeadsUp from './modals/modalHeadsUp';
import { ripple } from './helper_functions/ripple';
import { closeSideMenu } from './helper_functions/closeSideMenu';
import DarkMood from './darkMood';

export default function sideMenuQuestions({setShowSolution, urlWithInfo, imgToRenderIndex, setImgToRenderIndex, sectionSetter, setUrlWithInfo}:
    { setShowSolution: any, urlWithInfo: downLoadUrlWithInfo,imgToRenderIndex: number, setImgToRenderIndex: any,sectionSetter: any, setUrlWithInfo: any}) {
    const [, setModalRender] = useContext(modalContext);
    const [, setFeedBack] = useContext(feedBackContext);

    return (
        <div className={`${ss.sideMenu} sideMenu ${s.sideMenu} sideMenuHide`}>
            { urlWithInfo[imgToRenderIndex] ? 
                <>
                <Button className={s.cancelSession} icon='arrow_back' text="End session" 
                click={() => {
                    closeSideMenu()
                    setModalRender({showModal: true, componentToRender: <ModalHeadsUp reverse cancel click={() => {
                        sectionSetter("Home");
                        setImgToRenderIndex(0);
                        setUrlWithInfo([]);
                        setShowSolution(false)
                        setModalRender({showModal: false, componentToRender: null});
                        setFeedBack("Session canceled.");
                    }}>
                            <h1> Are you sure to exit? </h1>
                            <p>You are about to leave this session. This will leave a bad impact on results and will affect your overall statistics.</p>
                    </ModalHeadsUp>})
                }} />

                {
                    urlWithInfo.map((obj, index) => {
                        const {questionType} = obj;
                        return <SideCtx text={`${index + 1}. ${questionType.toUpperCase()}`} state={index == imgToRenderIndex ? ss.active : ""} setter={setImgToRenderIndex} index={index} key={index}/>
                    })
                } 
                    <DarkMood />
                </>
                :
                null
            }
        </div>   
    )
}

function SideCtx({text, state, setter, index} : {text: String, state: string, setter: Function, index: number}){
    const btn = useRef(null)
    useEffect(() => {
        ripple(btn.current, "var(--ripple-black)")
    }, [])
    
    return (
        <div ref={btn} className={`${ss.sideCtx} ${s.sideCtx} sideCtx ${state}`} onClick={() => {
            setter(index);
            closeSideMenu()
        }}>
            <span>{text}</span>
        </div>
    )
}
