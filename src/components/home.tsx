import s from './home.module.scss';
import Button from './button';
import { userContext, modalContext, appContext, feedBackContext} from '../context/contextProvider';
import { useContext, useEffect, useState  } from 'react';
import UserModal from './modals/userModal';
import { CombinedChart } from './combinedChart';
import ToggleView from './toggleView';
import heroImg from '../assets/img/home_hero.webp';
import { calCulateLoginStreak } from './helper_functions/calculateLoginStreak';

import CountUp from 'react-countup';
import ModalHeadsUp from './modals/modalHeadsUp';

let number = 1;

export default function Home({questionSetter, setSectionToRender}: {questionSetter: any, setSectionToRender: any}) {
    const [appData] = useContext(appContext);
    const [, setModal] = useContext(modalContext);
    const [userData] = useContext(userContext);
    const [, setFeedBack] = useContext(feedBackContext);
    const [,setModalRender] = useContext(modalContext)


    const [streak, setStreak] = useState(1)

    useEffect(() => {
        if(streak !== 1) number = streak;
    }, [streak])

    useEffect(() => {
        calCulateLoginStreak(appData, setStreak, setModal, userData);
    }, [appData])
    
    
    return (
    <div className={`${s.home} content`}>
            <Header/>
            <div className='wrapper'>

                <div className={`${s.loginStreakContainer}`}>
                    <div className={s.loginStreakWrapper}>
                        <span className={s.main}>
                            <span className={s.number}>
                                {streak.toString().length == 1 ? <span>0</span>: null}
                                <CountUp start={number} end={streak} delay={1} useEasing={false} duration={1}/>
                            </span>
                        </span>
                        <span className={s.bottom}>Days login streak</span>
                    </div>
                </div>

                <div className="toggleViewContainer">
                    <h1 className='statistics_heading '>Statistics:</h1>
                    <ToggleView />
                </div>

                <HomeChart sectionToRender= {setSectionToRender}/>
                
                
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

function Header () {
    const [userData] = useContext(userContext)
    const [,setModalRender] = useContext(modalContext)
    const [, setFeedBack] = useContext(feedBackContext);


    return (
        <header className={`${s.header}`} style={{backgroundImage: `url(${heroImg})`}}>
            <button className="menuIcon" onClick={() => {
                const sideMenu = document.querySelector(".sideMenu") as HTMLDivElement;
                sideMenu.classList.add('unHide')
            }}>
                <span className="material-symbols-outlined">menu</span>
            </button>

            <div className='userPhotoWrapper'
                onClick={() => {
                    setModalRender({showModal: true, componentToRender: <UserModal/>})
                }}
            ><img src={userData.photoURL} alt="" /></div>

            <div className={`${s.titleWrapper}`}>
                <h1>Mind Sprout</h1>
            </div>
            <p>An open-source learning platform for daily practicing the good old questions which we all love and rely on.</p>
            <Button className="wideBtn" click={() => {
                setModalRender({showModal: true, componentToRender: <ModalHeadsUp blueText='Understood' click={() => {
                    setModalRender({showModal: false, componentToRender: null});
                    setFeedBack("Thankyou for understanding.");
                }}>
                        <h1>Out of support.</h1>
                        <p>Currently we only supports the 2nd and 4th chapter of Physics 1st chapter. Try it out in chapter wise section.</p>
                </ModalHeadsUp>})
            }}/>
        </header>
    )
}


function HomeChart({sectionToRender}: any) {
    const [chartToShow, setChartToShow] = useState('chart1')

    return <div className='chartWrapper'>
        <CombinedChart  setter={sectionToRender} className={`chart1 home ${chartToShow == 'chart1' ? 'chart-active ': null}`} click={() => {setChartToShow(currentState => {
            if(currentState == 'chart1') return ''
            return "chart1"
        })}} sectionName='quick start' backgroundColor='rgb(15, 157, 88)'/>
        <CombinedChart  setter={sectionToRender} className={`chart2 home ${chartToShow == 'chart2' ? 'chart-active ': null}`} click={() => {setChartToShow(currentState => {
            if(currentState == 'chart2') return ''
            return "chart2"
        })}} sectionName='subject wise' backgroundColor='rgb(244, 160, 0)'/>
        <CombinedChart  setter={sectionToRender} className={`chart3 home ${chartToShow == 'chart3' ? 'chart-active ': null}`} click={() => {setChartToShow(currentState => {
            if(currentState == 'chart3') return ''
            return "chart3"
        })}} sectionName='chapter wise' backgroundColor='rgb(66, 133, 244)'/>
    </div>
}