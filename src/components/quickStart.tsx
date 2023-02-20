import React, { useContext, useState } from 'react'
import s from './quickStart.module.scss';
import Button from './button';
import Header from './header';
import ToggleView from './toggleView';
import {SingleChart} from "./singleChart"
import { userContext, modalContext, appContext, feedBackContext} from '../context/contextProvider';

import heroImg from '../assets/img/quick_start_hero.webp';
import ModalHeadsUp from './modals/modalHeadsUp';

export default function QuickStart({questionSetter, setSectionToRender}: {questionSetter: any, setSectionToRender: any}) {
    const [ ,setFeedBack] = useContext(feedBackContext);
    const [ ,setModalRender] = useContext(modalContext)
    const [chartToShow, setChartToShow] = useState("")
    
    return (
        <div className='content'>
            <Header title="Quick start" subTitle="Give the whole syllabus a shot." img={heroImg}/>
            <div className='wrapper'>
            <div className="toggleViewContainer">
                    <h1 className='statistics_heading '>Statistics:</h1>
                    <ToggleView/>
                </div>
                <div className='chartWrapper'>
                <SingleChart className={`chart1 ${chartToShow == 'chart1' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart1') return ''
            return "chart1"
        })}} sectionName='quick start' subjectName='Physics' backgroundColor='rgb(66, 133, 244)'/>
                <SingleChart className={`chart2 ${chartToShow == 'chart2' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart2') return ''
            return "chart2"
        })}} sectionName='quick start' subjectName='Chemistry' backgroundColor='rgb(15, 157, 88)'/>
                <SingleChart className={`chart3 ${chartToShow == 'chart3' ? 'chart-active ': null}`}  click={() => {setChartToShow(currentState => {
            if(currentState == 'chart3') return ''
            return "chart3"
        })}}  sectionName='quick start' subjectName='Higher math' backgroundColor='rgb(244, 160, 0)'/>
            </div>
                
                
                <Button className="wideBtn" click={() => {
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
