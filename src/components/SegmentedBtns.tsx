import { useEffect, useReducer } from 'react'
import s from './SegmentedBtns.module.scss'
// const subjectNames = ["Physics", "Chemistry", "Higher math"];


export default function SegmentedBtns({state, setter, subjectName}:{subjectName: string, state: any, setter: any}) {
    const [redState, dispatch] = useReducer(reducer, state)
    useEffect(() => {
        setter(redState)
    }, [redState])
    useEffect(() => {
        dispatch({action: "paper", subjectName: "subjectName", paper: "paperName", mokState: state})
    }, [state])


    return (
        <div className={`${s.segmentedButtons} segmentedButtons`}>
            {/* <div className={`${s.subjectNameWrapper}`}> */}
            <div className={`${s.btnContainer}`}> 
                <button className={`${isActive(redState, subjectName) ? s.active : ""}`} 
                    onClick={() => {
                        dispatch({action: "subject", subjectName: subjectName, paper: "undefined"})
                    }}>
                    <span className="material-symbols-outlined">done</span>
                    <p>{subjectName}</p>
                </button>
                    <div className={`${s.paperSelectDiv}`}>
                        {
                            ["1st", "2nd"].map((paperName, index) => {
                                return <button key={index} 
                                className={`${s.paperSelectBtn} ${redState ? redState[subjectName][paperName] ? redState[subjectName][paperName].length !== 0 ? s.active : "" : "" : ""}`}
                                onClick={() => {
                                    // action: string, subjectName: string, paper: string
                                    dispatch({action: "paper", subjectName: subjectName, paper: paperName})
                                }}
                                >
                                    <span className="material-symbols-outlined">done</span>
                                    <p>{paperName}</p>
                                </button>
                            })
                        }
                    </div>
                </div>
                        
                    
            {/* </div> */}
            
            
        </div>
    )
}

function reducer(state: any, {action, subjectName, paper, mokState}: {action: string, subjectName: string, paper: string, mokState?: any}){
    if(mokState != undefined) return mokState
    switch (action) {
        case "subject": {
            return isActive(state, subjectName) ? {...state, [subjectName] : {"1st": [], "2nd": []}} : 
                {...state, [subjectName] : {"1st": ["all"], "2nd": []}}
        }
        case "paper": {
            const isThere = state[subjectName][paper].length !== 0;
            return isThere ? {...state, [subjectName]: {...state[subjectName], [paper]: []}} :
            {...state, [subjectName]: {...state[subjectName], [paper]: ["all"]}}
        }
    }
}

function isActive (state: any, subjectName: string):boolean {
    const subjectObj = state[subjectName];
    return Object.keys(subjectObj).some(paperName => {
        return subjectObj[paperName].length !== 0
    })
}