import { MouseEventHandler, useRef, useEffect } from 'react';
import s from './button.module.scss'
import { ripple } from './helper_functions/ripple.js';

export default function Button({disable, click, className, icon, text, red, secondary}: {text?: string, icon?: string, className?: any, disable?: boolean, click: MouseEventHandler, red?: boolean, secondary?: boolean}) {
    const btn = useRef(null);
    useEffect(() => {
        ripple(btn.current)
    }, [])

    return (
        <button ref={btn} className={`${s.button} btn ${disable ? s.disable : ''} ${secondary ? s.secondary : ""} ${className} ${red ? s.red : ''}`} onClick={click}>
            <span className="material-symbols-outlined">{icon ? icon : "draw" }</span>
            <span>{text ? text : "Start practice"}</span>
        </button>
    )
}

