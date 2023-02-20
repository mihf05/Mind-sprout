// import { getQuestionIndexFromFirebase } from "../firebase";
import { cqCount, subjectRef } from "../globalStates";

let questionIndexWithPath : {[key: string]: number[]} = {};

export function getPhotoPath(state:any, sectionName: string) {
    const subjectNames  = Object.keys(state);
    const questionSubjectObj = subjectNames.map(item => {
        return {subjectName: item, questions: Array(cqCount).fill("cq")}
    })


    return questionSubjectObj.map(item => {
        const {subjectName, questions} = item;
        const returnObj: {subjectName: string, links: {}[], sectionName: string} = {subjectName, links: [], sectionName}
        
        questions.forEach(item => {
            const {subjectPaperChapterPath, paperName, chapterName} = getPathFromState(state, subjectName);
            questionIndexWithPath[subjectPaperChapterPath] = questionIndexWithPath[subjectPaperChapterPath] ?? [];

            const restLink = `/${item}/question/${getQuestionIndex(subjectName, paperName, chapterName, subjectPaperChapterPath, JSON.parse(sessionStorage.getItem("questionIndex") as string))}`
            const finalLink = "questionsAndSolutions/" + subjectPaperChapterPath + restLink;
            if(!subjectPaperChapterPath.includes("undefined")) returnObj.links.push({[item]: {
                questionPath: finalLink + '.jpg',
                solutionPath: finalLink.replace("/question", "/solution"),
                paperName, chapterName
            }})
        })

        questionIndexWithPath = {}
        return returnObj
    }).filter(item => item.links.length != 0 )
}

function getQuestionIndex(subjectName: string, paperName: string, chapterName: string, subjectPaperChapterPath: string, questionIndex: any) {
    const number = questionIndex[subjectName][paperName][chapterName] as undefined | number;
    if(!number) return;
    function recurse(): number {
        const rndNumber = getRndInteger(1, number ? number : 0);
        if(questionIndexWithPath[subjectPaperChapterPath].includes(rndNumber)) return recurse()
        else {
            questionIndexWithPath[subjectPaperChapterPath].push(rndNumber);
            return rndNumber
        }
    }
    return recurse()
}


function getPathFromState(state: any, subjectName: string){
    const paperObject = state[subjectName];
    const [paperName, chapterName] = getRandomChapter(paperObject["1st"], paperObject["2nd"], subjectName)
    return {subjectPaperChapterPath: `${subjectName}/${paperName}/${chapterName}`, paperName, chapterName}
}

function getRandomChapter(array1: [], array2: [], subjectName: string) {
    const randomNumber1 = getRndInteger(0, 1);
    const paperName = array1.length == 0 ? "2nd" : array2.length == 0 ? "1st" : randomNumber1 == 0 ? "1st" : "2nd";
    const workingArray = array1.length == 0 ? treatAll(array2) : array2.length == 0 ? treatAll(array1) : randomNumber1 == 0 ? treatAll(array1) : treatAll(array2);
    const randomNumber2 = getRndInteger(0, (workingArray.length - 1))
    return [paperName, workingArray[randomNumber2]]


    function treatAll(array: string[]) {
        if(!array.includes('all')) return array;
        const obj = subjectRef.find(item => {
            return item.subjectName == subjectName 
        }) as any
        const desiredArray = obj[paperName];
        return desiredArray;
    }
}

function getRndInteger(min: number, max: number) {
    // if(max == 0) return 'false'
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
