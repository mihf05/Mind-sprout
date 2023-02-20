import { closeSideMenu } from './helper_functions/closeSideMenu';
import { ripple } from './helper_functions/ripple';
import s from './sideMenu.module.scss';
import User from './user';
import { useEffect, useRef } from 'react';
import DarkMood from './darkMood';

const sideCtxText = ["Home", "Quick start", "Subject wise", "Chapter wise"];
const iconText = ["home", "bolt", "summarize", "table_view"];


export default function SideMenu({setter, state}:{setter: Function, state: string}) {
    return (
        <div className={`sideMenuWrapper`} >
            <div className={`${s.sideMenu} sideMenu sideMenuHide`}>
            <User />
                {
                    sideCtxText.map((item, index) => {
                        return <SideCtx text={item} 
                        icon={<span className="material-symbols-outlined">{iconText[index]}</span>} 
                        state={state === item ? s.active : undefined} 
                        setter={setter}
                        key={index}/>
                    })
                }
                <DarkMood />
            </div>
        </div>
    )
}

function SideCtx({text, icon, state, setter} : {text: String, icon:any, state?: string, setter: Function}){
    const btn = useRef(null)
    useEffect(() => {
        ripple(btn.current, "var(--ripple-black)")
    }, [])
    
    return (
        <div ref={btn} className={`${s.sideCtx} sideCtx ${state}`} 
            onClick={() => {
                    setter(text)
                    closeSideMenu()
                }
            }>
            {icon}<p>{text}</p>
        </div>
    )
}
