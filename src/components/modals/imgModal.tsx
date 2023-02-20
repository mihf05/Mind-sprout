import { useContext, useEffect, useRef } from 'react';
import s from './imgModal.module.scss';
import { dragElement } from '../helper_functions/draggable';
import { modalContext } from '../../context/contextProvider';


interface com{
    source:string
}



export default function ImgModal ({source}: com) {
    const [, setModal] = useContext(modalContext)

    const img = useRef(null) as any;
    useEffect( () => {
        window.addEventListener("wheel", zoom)
        let scale = 1;
        function zoom(event: any) {
            scale += event.deltaY * -0.001;
            scale = Math.min(Math.max(.5, scale), 4);
            img.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        dragElement(img.current)
        return () => window.removeEventListener("wheel", zoom)
    }, [])

    return (
        <div className={`${s.container}`}>

            <button className={`menuIcon ${s.backBtn}`} onClick={() => {
                setModal({showModal: false, componentToRender: null})
            }}>
                <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <img ref={img} src={source} alt="" />
        </div>
    )
}



