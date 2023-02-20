import s from './navigationForPractice.module.scss';
import Button from './button';
import { cqCount } from '../globalStates';
import { useContext, useState } from 'react';
import { modalContext, feedBackContext, errorContext } from '../context/contextProvider';
import { increaseCorrectAndWrong } from '../firebase';
import ModalHeadsUp from './modals/modalHeadsUp';


export default function navigationForPractice({renderIndex, imgToRenderObj, setter, setShowSolution, showSolution, setSectionToRender, setUrlWithInfo}: 
    {renderIndex: number, imgToRenderObj: any, setter: any, setShowSolution: any, showSolution: any, setSectionToRender: any, setUrlWithInfo: any}) {
    
    const [, setModalRender] = useContext(modalContext);
    const [, setFeedBack] = useContext(feedBackContext);
    const [, setShowError] = useContext(errorContext);
    const [submittedSolutionIndex, setSubmittedSolutionIndex] = useState<number[]>([]) 

    

        
    return (
        <div className={`${s.container}`}>
            <div>
    
                <Button click={() => {
                    if(showSolution) {
                        increaseCorrectAndWrong(imgToRenderObj, 'correct', setShowError)
                        
                        if(renderIndex == cqCount - 1){
                            if(submittedSolutionIndex.length < cqCount - 1) {
                                inCompleteData(setModalRender, setter, submittedSolutionIndex)
                            }
                            else {
                                setSubmittedSolutionIndex(state => [...state, renderIndex]);
                                renderModalAfterSolution(setModalRender, setter, setShowSolution, setSectionToRender, setUrlWithInfo, setFeedBack)
                            }
                        }   

                        else{
                            setter((state: any) => state + 1)
                            setSubmittedSolutionIndex(state => [...state, renderIndex])
                        }
                    }else setter((state: any) => state - 1)
                }} 
                disable={showSolution ?  submittedSolutionIndex.includes(renderIndex) : (renderIndex == 0) }
                text={showSolution ? "Correct" : 'Previous'} icon={showSolution? "check" :"arrow_back_ios"}            
                />
    
                <Button click={() => { 

                    if(showSolution) {
                        increaseCorrectAndWrong(imgToRenderObj, 'wrong', setShowError)
                        setSubmittedSolutionIndex(state => [...state, renderIndex])

                        if(renderIndex == cqCount - 1) {
                            if(submittedSolutionIndex.length < cqCount - 1) {
                                inCompleteData(setModalRender, setter, submittedSolutionIndex)
                            }
                            else {
                                setSubmittedSolutionIndex(state => [...state, renderIndex]);
                                renderModalAfterSolution(setModalRender, setter, setShowSolution, setSectionToRender, setUrlWithInfo, setFeedBack)
                            }
                        }
                        else {
                            setter((state: any) => state + 1)
                        }
                    }else setter((state: any) => state + 1)
                }}
                disable={showSolution ?  submittedSolutionIndex.includes(renderIndex) : (renderIndex == cqCount - 1)}
                text={showSolution ? "Wrong" : 'Next'} icon={showSolution ? "close" : "arrow_forward_ios"}
                red={showSolution}/>

            </div> 
            { ((renderIndex == cqCount - 1) && !showSolution) ? 
                <Button 
                text="proceed" icon="done"
                click={() => {
                    setModalRender({showModal: true, componentToRender: <ModalHeadsUp cancel click={() => {
                        setter(0) 
                        setModalRender({showModal: false, componentToRender: null});
                        setShowSolution(true)
                    }}>
                            <h1> Are you sure to submit? </h1>
                            <p> It was the answering session. By proceeding ahead you will bring to solution session.</p>
                    </ModalHeadsUp>})
                }}/> : null
            }

        </div>
    )
}


function renderModalAfterSolution(setModalRender: any, setter: any, setShowSolution: any, setSectionToRender: any, setUrlWithInfo: any, setFeedBack: any){
    setModalRender({showModal: true, componentToRender: <ModalHeadsUp click={() => {
        setter(0) 
        setModalRender({showModal: false, componentToRender: null});
        setShowSolution(false);
        setSectionToRender("Home");
        setUrlWithInfo([]);
        setFeedBack("Session completed.")
    }}>
        <h1>Session completed!</h1>
        <p>All results are captured, head back to the Home section by clicking the button bellow.</p>
    </ModalHeadsUp>})
}

function inCompleteData(setModalRender: any, setter: any, submittedSolutionIndex: number[]) {
    let redirectIndex: number;
    for (let index = 0; index < cqCount; index++) {
        if (!submittedSolutionIndex.includes(index)){
            redirectIndex = index;
            break;
        } 
    }

    setModalRender({showModal: true, componentToRender: <ModalHeadsUp click={() => {
        setter(redirectIndex)
        setModalRender({showModal: false, componentToRender: null});
    }}>
        <h1>Incomplete data submission.</h1>
        <p>It seems like you have missed some questions to verify. Click on proceed button to check those up.</p>
    </ModalHeadsUp>})
}