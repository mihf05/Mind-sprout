import { useState, useEffect, useRef, useContext } from 'react';
import { downLoadUrlWithInfo, getQuestionsLinks } from '../firebase';
import s from './practiceSection.module.scss';
import NavigationForPractice from './navigationForPractice';

import { timer } from './helper_functions/timer';
import { modalContext } from '../context/contextProvider';
import { imageScaler } from './helper_functions/imageScaler';

import { Splide, SplideSlide } from '@splidejs/react-splide';

interface com {showSolution: any, setShowSolution: any, urlWithInfo: downLoadUrlWithInfo, imgToRenderIndex: number, setImgToRenderIndex: any, setSectionToRender: any, setUrlWithInfo: any, questionsToRender: any, setShowError: any, }


export default function PracticeSection({ showSolution, setShowSolution, urlWithInfo, imgToRenderIndex, setImgToRenderIndex, setSectionToRender, setUrlWithInfo, questionsToRender, setShowError}: com) {
    const [,setModalToRender] = useContext(modalContext);

    const cover = useRef(null);
    const [imgToRenderObj, setImgToRenderObj] = useState(urlWithInfo[imgToRenderIndex]);
    const [countdown, setCountDown] = useState("");

    useEffect(() => {
        timer(setCountDown);
        getQuestionsLinks(questionsToRender, setUrlWithInfo, setShowError)
        window.onbeforeunload = () => "";
        return () => {
            window.onbeforeunload = null
        }
    }, [])
    
    useEffect(() => {
        setImgToRenderObj(urlWithInfo[imgToRenderIndex]);
        const coverEle = cover.current as any;
        coverEle.classList.add(s.active);

        setTimeout(() => {
            coverEle.classList.remove(s.active);
        }, 500)
    }, [urlWithInfo, imgToRenderIndex]);

    
    return (
        
        <div ref={cover} className={`${s.main} ${!imgToRenderObj ? s.loader : ""}`}>
            {   imgToRenderObj ?
                <>
                    <div className={`${s.cover}`}></div>
                    <div className={`${s.path}`}>
                        <button className={`menuIcon ${s.menuIcon}`} onClick={() => {
                            const sideMenu = document.querySelector(".sideMenu") as HTMLDivElement;
                            sideMenu.classList.add('unHide')
                        }}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1>{imgToRenderObj.subjectName} <span className="material-symbols-outlined">arrow_right</span> 
                            {imgToRenderObj.paperName} <span className="material-symbols-outlined"> arrow_right</span> 
                            {imgToRenderObj.chapterName}
                        </h1>
                    </div>
                    <div className={`${s.timerWrapper} timeWrapper`}>
                        <span>{countdown}</span>
                    </div>

                    {  
                        showSolution ? 
                        <Splide className={`${s.swapper} ${s.imgWrapper}`} options={{
                            pagination: true,    
                        }}>
                            {imgToRenderObj.solutionUrls.map((url, index) => {
                                return <SplideSlide key={index} >
                                    <div className={`${s.imgWrapper}`}>
                                        <img onClick={e => imageScaler(e, setModalToRender) } src={url} alt="" />
                                    </div>
                                </SplideSlide>
                            })}
                        </Splide>
                        :
                        <div className={`${s.imgWrapper}`}>
                            <img onClick={e => imageScaler(e, setModalToRender)} src={imgToRenderObj?.url} alt="" />
                        </div> 
                    }
                    <NavigationForPractice {...{setUrlWithInfo, setSectionToRender, showSolution, setShowSolution, imgToRenderObj}} renderIndex={imgToRenderIndex} setter={setImgToRenderIndex}/>
                </>
                : <div className="main-container">
                    <div className="box center"></div>
                    <div className="box color-1"></div>
                    <div className="box color-2"></div>
                    <div className="box color-3"></div>
                    <div className="box color-4"></div>
                </div>
            }
        </div>
    )
}

