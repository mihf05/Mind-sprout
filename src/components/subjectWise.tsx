import React, { useContext, useEffect, useReducer } from 'react'
import Header from './header'
import Button from './button'
import s from './subjectWise.module.scss';
import { useState } from 'react';
import SegmentedBtns from './SegmentedBtns';
import disableBtn from './helper_functions/disableBtn'
import {  getSubjects } from './helper_functions/simplifyAppData';
import { stateType } from '../globalStates';
import { appContext, userContext, feedBackContext, modalContext } from '../context/contextProvider';
import { updateSubjects } from '../firebase';
import ToggleView from './toggleView';
import {SingleChart} from './singleChart';
import heroImg from '../assets/img/subject_wise_hero.webp';
import ModalHeadsUp from './modals/modalHeadsUp';



const state: stateType = {
    "Physics": {"1st": [], "2nd": []},
    "Chemistry": {"1st": [], "2nd": []},
    "Higher math": {"1st": [], "2nd": []},
}


export default function SubjectWise({questionSetter, setSectionToRender}: {questionSetter: any, setSectionToRender: any}) {
    const [selectedSubject, setSelectedSubject] = useState(state)
    const [appData, setAppData] = useContext(appContext);
    // const [userData] = useContext(userContext);
    const [, setFeedBack] = useContext(feedBackContext);
    const [,setModalRender] = useContext(modalContext);
    const [chartToShow, setChartToShow] = useState('')

    useEffect(() => {
        getSubjects("chapter wise", appData, state => {
            setSelectedSubject(state)
        })
    }, [appData])

    return (
        <div className='content'>
            <Header img={heroImg}title="Subject wise" subTitle="Practice on all chapters of a subject or paper."/>
            <div className="wrapper">
                
                <div className="toggleViewContainer">
                    <h1 className='statistics_heading '>Statistics:</h1>
                    <ToggleView />
                </div>

                <div className='chartWrapper'>
                <SingleChart className={`chart1 ${chartToShow == 'chart1' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart1') return ''
            return "chart1"
        })}} sectionName='subject wise' subjectName='Physics' backgroundColor='rgb(66, 133, 244)'/>
                <SingleChart className={`chart2 ${chartToShow == 'chart2' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart2') return ''
            return "chart2"
        })}} sectionName='subject wise' subjectName='Chemistry' backgroundColor='rgb(15, 157, 88)'/>
                <SingleChart className={`chart3 ${chartToShow == 'chart3' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart3') return ''
            return "chart3"
        })}}  sectionName='subject wise' subjectName='Higher math' backgroundColor='rgb(244, 160, 0)'/>
            </div>
                
                <h1 className='content_heading'>Choose the desired subject & paper.</h1>

                <div className={`${s.segMentedBtnContainer}`}>
                    <SegmentedBtns subjectName='Physics' state={selectedSubject} setter={setSelectedSubject}/>
                    <SegmentedBtns subjectName='Chemistry' state={selectedSubject} setter={setSelectedSubject}/>
                    <SegmentedBtns subjectName='Higher math' state={selectedSubject} setter={setSelectedSubject}/>
                </div>

                <Button className="wideBtn" disable={disableBtn(selectedSubject)} click={() => {
                setModalRender({showModal: true, componentToRender: <ModalHeadsUp blueText='Understood' click={() => {
                    setModalRender({showModal: false, componentToRender: null});
                    setFeedBack("Thankyou for understanding.");

                }}>
                        <h1>Out of support.</h1>
                        <p>Currently we only supports the 2nd and 4th chapter of Physics 1st paper. Try it out in chapter wise section.</p>
                </ModalHeadsUp>})
            }}/>
            </div>
        </div>
    )
}



