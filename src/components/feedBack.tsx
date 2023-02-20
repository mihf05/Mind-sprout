import s from './feedBack.module.scss';
import { useContext, useRef, useEffect } from 'react';
import { feedBackContext } from '../context/contextProvider';

export default function FeedBack() {
    const [feedBack, setFeedBack] = useContext(feedBackContext);
    
    const sliderRef: any = useRef(null);
    const containerRef: any = useRef(null);

    useEffect(() => {
        const container = containerRef.current as HTMLDivElement;
        if(feedBack == "false") return;

        const slider = sliderRef.current as HTMLDivElement;
        container.style.display = "flex";

        setTimeout(() => container.classList.add(s.active), 1);

        const app = document.querySelector(".App") as HTMLDivElement;
        app.style.overflowX = "hidden";

        slider.addEventListener('animationend', () => {
            container.classList.remove(s.active);
        });

        container.addEventListener('transitionend', (e) => {
            if(e.elapsedTime !== .3) return
            app.style.overflowX = "visible";
            container.style.display = "none";
            setFeedBack("false")
        })

    }, [feedBack])

    return (
        <div className={`${s.container}`} ref={containerRef} onClick={() => {
            setFeedBack("Hello");
        }}>
            <div className={`${s.wrapper}`}>
                <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div className={`${s.wrapper}`}>
                <p>{feedBack}</p>
            </div>
            <div ref={sliderRef} className={`${s.slider}`}></div>
        </div>
    )
}
