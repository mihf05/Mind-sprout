import { useState, useEffect, useContext } from 'react';
import SideMenu from './components/sideMenu';
import Home from './components/home';
import ChapterWise from './components/chapterWise';
import SubjectWise from './components/subjectWise';
import QuickStart from './components/quickStart';
import PracticeSection from './components/practiceSection';
import SideMenuQuestions from './components/sideMenuQuestions';
import { checkIfTheUserIsValid, downLoadUrlWithInfo, setAppDataFireBase, setPracticeDataFirebase, getQuestionsIndex } from './firebase';
import Modal from './components/modals/modal';
import { modalContext, userContext, errorContext, appContext, practiceContext, feedBackContext} from './context/contextProvider';
import { closeSideMenu } from './components/helper_functions/closeSideMenu';
import Login from './components/login';
import Error from './components/error';
import FeedBack from './components/feedBack';
import Footer from './components/footer';


export default function App() {
  const [sectionToRender, setSectionToRender] = useState("Home");
  const [questionsToRender, setQuestionToRender] = useState<any>("");

  const [urlWithInfo, setUrlWithInfo] = useState<downLoadUrlWithInfo>([]);
  const [imgToRenderIndex, setImgToRenderIndex] = useState(0);  
  const [showSolution, setShowSolution] = useState(false);
  const [modalRender, setModalRender] = useContext(modalContext);
  const [userData, setUserData] = useContext(userContext);
  const [showError, setShowError] = useContext(errorContext);
  const [, setAppData] = useContext(appContext)
  const [, setPracticeData] = useContext(practiceContext)

  useEffect(() => {
    checkIfTheUserIsValid(userData, setUserData);
    getQuestionsIndex(setShowError)
  }, [])

  useEffect(() => {
    if(userData) {
      setAppDataFireBase(userData, setAppData, setShowError);
      setPracticeDataFirebase(userData, setPracticeData, setShowError);
    }
  }, [userData])
  

  function decideWhichComponentTORender(sectionName: string) : any {
    switch (sectionName) {
      case "Quick start": return <QuickStart questionSetter={setQuestionToRender} {...{setSectionToRender}}/>
      case "Subject wise": return <SubjectWise questionSetter={setQuestionToRender} {...{setSectionToRender}}/>
      case "Chapter wise": return <ChapterWise questionSetter={setQuestionToRender} {...{setSectionToRender}}/>
      case "Practice section": return <PracticeSection {...{showSolution, setShowSolution, setUrlWithInfo, setSectionToRender, urlWithInfo, imgToRenderIndex, setImgToRenderIndex, questionsToRender, setShowError}}/>
      default: return <Home questionSetter={setQuestionToRender} {...{setSectionToRender}}/>
    }
  }  

  return (
    <div className="App">
      {
        showError ? <Error/>
        : userData ?
        <>
          <button className='sideMenuBlock' onClick={closeSideMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
          {
            sectionToRender == "Practice section" ? 
            <SideMenuQuestions {...{setShowSolution, setUrlWithInfo, setImgToRenderIndex, imgToRenderIndex, urlWithInfo}} sectionSetter={setSectionToRender}/> : 
            <SideMenu state={sectionToRender} setter = {setSectionToRender}/> 
          }
            <div className="sectionFooterWrapper">
              <div className='sectionsWrapper'>
                {decideWhichComponentTORender(sectionToRender)}
              </div>
              {sectionToRender !== "Practice section" ? <Footer /> : null}
            </div> 

            <FeedBack/>

          { modalRender.showModal ? 
            <Modal click={() => {
              setModalRender({showModal: false, componentToRender: null})
            }}> {modalRender.componentToRender} </Modal>  : ""
          } 
        </> : <Login/> 
      }

    </div> 
  )
}

