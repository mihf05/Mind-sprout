import React, { useState, useEffect, useContext } from 'react';
import {
  checkIfTheUserIsValid,
  downLoadUrlWithInfo,
  setAppDataFireBase,
  setPracticeDataFirebase,
  getQuestionsIndex
} from './firebase';
import {
  modalContext,
  userContext,
  errorContext,
  appContext,
  practiceContext,
  feedBackContext
} from './context/contextProvider';
import { closeSideMenu } from './components/helper_functions/closeSideMenu';
import ChapterWise from './components/ChapterWise';
import Error from './components/Error';
import FeedBack from './components/FeedBack';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Modal from './components/modals/Modal';
import PracticeSection from './components/PracticeSection';
import QuickStart from './components/QuickStart';
import SideMenu from './components/SideMenu';
import SideMenuQuestions from './components/SideMenuQuestions';
import SubjectWise from './components/SubjectWise';


export default function App(): React.ReactElement {
  const [sectionToRender, setSectionToRender] = useState<string>("Home");
  const [questionsToRender, setQuestionToRender] = useState<string>("");
  const [urlWithInfo, setUrlWithInfo] = useState<downLoadUrlWithInfo>([]);
  const [imgToRenderIndex, setImgToRenderIndex] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [modalRender, setModalRender] = useContext(modalContext);
  const [userData, setUserData] = useContext(userContext);
  const [showError, setShowError] = useContext(errorContext);
  const [, setAppData] = useContext(appContext);
  const [, setPracticeData] = useContext(practiceContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await checkIfTheUserIsValid(userData, setUserData);
        await getQuestionsIndex(setShowError);
      } catch (error) {
        console.error("Error checking user or getting questions:", error);
        setShowError(true);
      }
    };
    checkUser();
  }, [userData, setUserData, setShowError]);

  useEffect(() => {
    const setUserData = async () => {
      if (userData) {
        try {
          await setAppDataFireBase(userData, setAppData, setShowError);
          await setPracticeDataFirebase(userData, setPracticeData, setShowError);
        } catch (error) {
          console.error("Error setting user data:", error);
          setShowError(true);
        }
      }
    };
    setUserData();
  }, [userData, setAppData, setPracticeData, setShowError]);

  const decideWhichComponentToRender = (sectionName: string): React.ReactElement => {
    const commonProps = {
      questionSetter: setQuestionToRender,
      setSectionToRender: setSectionToRender,
    };

    switch (sectionName) {
      case "Quick start":
        return <QuickStart {...commonProps} />;
      case "Subject wise":
        return <SubjectWise {...commonProps} />;
      case "Chapter wise":
        return <ChapterWise {...commonProps} />;
      case "Practice section":
        return (
          <PracticeSection
            showSolution={showSolution}
            setShowSolution={setShowSolution}
            setUrlWithInfo={setUrlWithInfo}
            urlWithInfo={urlWithInfo}
            imgToRenderIndex={imgToRenderIndex}
            setImgToRenderIndex={setImgToRenderIndex}
            questionsToRender={questionsToRender}
            setShowError={setShowError}
            {...commonProps}
          />
        );
      default:
        return <Home {...commonProps} />;
    }
  };

  return (
    <div className="App">
      {showError ? (
        <Error />
      ) : userData ? (
        <>
          <button className="sideMenuBlock" onClick={closeSideMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
          {sectionToRender === "Practice section" ? (
            <SideMenuQuestions
              setShowSolution={setShowSolution}
              setUrlWithInfo={setUrlWithInfo}
              setImgToRenderIndex={setImgToRenderIndex}
              imgToRenderIndex={imgToRenderIndex}
              urlWithInfo={urlWithInfo}
              sectionSetter={setSectionToRender}
            />
          ) : (
            <SideMenu state={sectionToRender} setter={setSectionToRender} />
          )}
          <div className="sectionFooterWrapper">
            <div className="sectionsWrapper">
              {decideWhichComponentToRender(sectionToRender)}
            </div>
            {sectionToRender !== "Practice section" && <Footer />}
          </div>
          <FeedBack />
          {modalRender.showModal && (
            <Modal
              click={() => setModalRender({ showModal: false, componentToRender: null })}
            >
              {modalRender.componentToRender}
            </Modal>
          )}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

