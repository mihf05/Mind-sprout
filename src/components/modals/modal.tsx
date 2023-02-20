import s from './modal.module.scss';
import { useRef } from 'react';
export default function modal({ children, click} : {children: any, click: any}) {
    const container = useRef(null)
    return (
        <div ref={container} className={`${s.container} modal`} onClick={(e) => {
            if(e.target == container.current) click(e) 
        }}> 
            {children}
        </div>
    )
}
