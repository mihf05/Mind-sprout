import { stateType } from "../../globalStates";

export function getSubjects(sectionName : string, appData : any, callBack: (a: stateType) => void){
    callBack(appData[sectionName])
}
