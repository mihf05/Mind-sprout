import { useContext, useEffect } from 'react'
import Header from './header'
import Button from './button'
import SegmentedBtns from './SegmentedBtns';
import { useState, useReducer } from 'react';
import s from './chapterWise.module.scss';
import disableBtn from './helper_functions/disableBtn';
import { updateSubjects } from '../firebase';
import { getSubjects} from './helper_functions/simplifyAppData';
import { subjectRef, subjectType, emptyState } from '../globalStates';
import { getPhotoPath } from './algoForQuestions';
import { appContext, errorContext, userContext } from '../context/contextProvider';
import {SingleChart} from './singleChart';
import ToggleView from './toggleView';
import heroImg from '../assets/img/chapter_wise_hero.webp';



export default function ChapterWise({questionSetter, setSectionToRender}: {questionSetter: any, setSectionToRender: any}) {
    const [appData, setAppData] = useContext(appContext);
    const [userData] = useContext(userContext);
    const [, setShowError] = useContext(errorContext);
    const [chartToShow, setChartToShow] = useState("")
    const [selectedSubject, setSelectedSubject] = useState(emptyState);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    //* using to change the layout
    const paperChapterBreakPoint = +getComputedStyle(document.documentElement).getPropertyValue("--paperChapterBreakPoint").replace("px", "");


    useEffect(() => {
        getSubjects("chapter wise", appData, state => {
            setSelectedSubject(state)
        })
    }, [appData])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
    }, [])


    

    return (
        <div className='content'>
            <Header img={heroImg} position="bottom" title="Chapter wise" subTitle="Focusing on specific chapters or portions."/>
            <div className="wrapper chapterWiseSection">
            
            <div className="toggleViewContainer">
                <h1 className='statistics_heading '>Statistics:</h1>
                <ToggleView />
            </div>


            <div className='chartWrapper'>
                <SingleChart className={`chart1 ${chartToShow == 'chart1' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart1') return ''
            return "chart1"
        })}} sectionName='chapter wise' subjectName='Physics' backgroundColor='rgb(66, 133, 244)'/>
                <SingleChart className={`chart2 ${chartToShow == 'chart2' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart2') return ''
            return "chart2"
        })}} sectionName='chapter wise' subjectName='Chemistry' backgroundColor='rgb(15, 157, 88)'/>
                <SingleChart className={`chart3 ${chartToShow == 'chart3' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart3') return ''
            return "chart3"
        })}}  sectionName='chapter wise' subjectName='Higher math' backgroundColor='rgb(244, 160, 0)'/>
            </div>
                
            <h1 className='content_heading'>Choose the desired subject & chapter</h1>
            {windowWidth > paperChapterBreakPoint ?
                <>
                    <div className={`${s.segMentedBtnContainer}`}>
                        <SegmentedBtns subjectName='Physics' state={selectedSubject} setter={setSelectedSubject}/>
                        <SegmentedBtns subjectName='Chemistry' state={selectedSubject} setter={setSelectedSubject}/>
                        <SegmentedBtns subjectName='Higher math' state={selectedSubject} setter={setSelectedSubject}/>
                    </div>

                    <div className={`${s.listedBtns}`}>
                        <SecondPart subjectObj={subjectRef[0]} state={selectedSubject}  setter={setSelectedSubject}/>
                        <SecondPart subjectObj={subjectRef[1]} state={selectedSubject}  setter={setSelectedSubject}/>
                        <SecondPart subjectObj={subjectRef[2]} state={selectedSubject}  setter={setSelectedSubject}/>
                    </div>
                </>
                : 
                <>
                    <div className={`${s.segMentedBtnContainer}`}>
                        <SegmentedBtns subjectName='Physics' state={selectedSubject} setter={setSelectedSubject}/>
                    </div>
                    <div className={`${s.listedBtns}`}>
                        <SecondPart subjectObj={subjectRef[0]} state={selectedSubject}  setter={setSelectedSubject}/>
                    </div>

                    <div className={`${s.segMentedBtnContainer}`}>
                        <SegmentedBtns subjectName='Chemistry' state={selectedSubject} setter={setSelectedSubject}/>
                    </div>
                    <div className={`${s.listedBtns}`}>
                        <SecondPart subjectObj={subjectRef[1]} state={selectedSubject}  setter={setSelectedSubject}/>
                    </div>

                    <div className={`${s.segMentedBtnContainer}`}>
                        <SegmentedBtns subjectName='Higher math' state={selectedSubject} setter={setSelectedSubject}/>
                    </div>
                    <div className={`${s.listedBtns}`}>
                        <SecondPart subjectObj={subjectRef[2]} state={selectedSubject}  setter={setSelectedSubject}/>
                    </div>
                </>
                
            }           

                <Button className="wideBtn" disable={disableBtn(selectedSubject)} click={() => {
                    updateSubjects("chapter wise", selectedSubject, userData, setAppData, setShowError)
                    setSectionToRender("Practice section");
                    questionSetter(getPhotoPath(selectedSubject, "chapter wise"))
                }}/>
            </div>
        </div>
    )
}

function SecondPart({state, setter, subjectObj}: {subjectObj: any, state: any, setter: Function}) {
    const [redState, dispatch] = useReducer(reducer, state)
    const { subjectName } = subjectObj;

    useEffect(() => {        
        setter(redState)
    }, [redState]);

    useEffect(() => {
        dispatch({subjectName: "string", paper: "string", chapter: "string", subjectRef: "any", mokState: state})
    }, [state])

    
    return (
        <div className={`${s.subjectSection}`}>
            {["1st", "2nd"].map((paper, index) => {
                return <div key={index} className={`${s.paperSection}`}>

                    {[...subjectObj[paper as keyof subjectType]].map((chapter, index) => {
                        return <button key={index} className={`${s.chapterSection} ${isActive(redState, subjectName, paper, chapter) ?  s.active : ""}`}
                            onClick={() => {
                                dispatch({chapter, paper, subjectName, subjectRef})
                            }}
                        ><span className="material-symbols-outlined">done</span><p>{chapter}</p>
                        </button>
                    })}

                </div>
            })}
        </div>
    )
}


function reducer(state: any, {subjectName, paper, chapter, subjectRef, mokState}: {subjectName: string, paper: string, chapter: string, subjectRef: any, mokState?: any} ) {
    if(mokState !== undefined) return mokState
    
    const currentArr = [...state[subjectName][paper]];
    const workingArray = currentArr.includes("all") ? [...subjectRef.find((item : any) => item.subjectName == subjectName)[paper]] : currentArr 
    
    const index = workingArray.indexOf(chapter);
    if(index == -1) workingArray.push(chapter);
    else workingArray.splice(index, 1);
    return {...state, [subjectName]: {...state[subjectName], [paper]: workingArray}}
}


function isActive(state: any, subjectName: string, paper: string, chapter: string) {
    if(state[subjectName][paper].includes("all")) return true    
    if(state[subjectName][paper].includes(chapter)) return true    
    else return false
}