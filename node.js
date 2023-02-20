import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { initializeApp } from "firebase/app";
import { uploadBytes, getStorage, ref} from "firebase/storage";
import { updateDoc, setDoc, getFirestore, doc,  } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOxoXPHcPNS0sLU2knK2_tNHOQm-uC3Pc",
    authDomain: "mindsprout.firebaseapp.com",
    projectId: "mindsprout",
    storageBucket: "mindsprout.appspot.com",
    messagingSenderId: "1047811960255",
    appId: "1:1047811960255:web:5f554dc75e9e800f08450a",
    measurementId: "G-LSZ17SMXG9"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBFUbDPen4sc72iJ3VTA2LpRkxzipqTPoE",
//     authDomain: "practice-helper.firebaseapp.com",
//     projectId: "practice-helper",
//     storageBucket: "practice-helper.appspot.com",
//     messagingSenderId: "337534902662",
//     appId: "1:337534902662:web:02b813750adaeda6e88c07",
// };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
    


const physics = {
    "subjectName": "Physics",
    "1st" : ["2nd", "4th", "5th", "6th", "7th", "8th", "10th"],
    "2nd" : ["1st", "2nd", "3rd", "7th", "8th", "9th", "10th"],
}

const chemistry = {
    "subjectName": "Chemistry",
    "1st" : ["2nd", "3rd", "4th", "5th"],
    "2nd" : ["1st", "2nd", "3rd", "4th"],
}
const higherMath = {
    "subjectName": "Higher math",
    "1st" : ["1st", "3rd", "4th", "7th", "9th", "10th"],
    "2nd" : ["3rd", "4th", "6th", "7th", "8th", "9th"],
}
export const subjectRef = [physics, chemistry, higherMath];
export const questionTypes = 4;

const path = "./images/Physics/1st/4th/cq";

function copyFilesFromStagingToPath (path){
    const questionPath = path + "/question";
    const solutionPath = path + "/solution";
    const files = readdirSync("./staging");
    files.forEach(fileName => {
        const filePath = `./staging/${fileName}`
        const fileIndex = fileName.match(/\d+/)[0];
        const file = readFileSync(filePath);
        if(fileName.includes("(1)")){
            writeFileSync(`${questionPath}/${fileIndex}.jpg`, file)
        }
        else{
            const bracketIndex = +fileName.match(/\d+\)/)[0].replace(")", "") - 1
            const dir = `${solutionPath}/${fileIndex}`;
            mkdirSync(dir, {recursive : true})
            writeFileSync(`${dir}/${bracketIndex}.jpg`, file)
        }
    })
}

function uploadToFirebase(link){
    const array = readdirSync(link);
    array.forEach(item => {
        if(item.includes(".")) { 
            const path = link + "/" + item;
            const pathForRef = path.replace("./images/", "questionsAndSolutions/");
            const imageRef = ref(storage, pathForRef);
            const image = new Uint8Array(readFileSync(path));

            uploadBytes(imageRef, image).then(() => {
                console.log("uploaded!");
            }).catch(error => {
                console.log(error);
            });
            return
        }
        uploadToFirebase(link + `/${item}`)
    })
}
const link = "./images/Physics"
uploadToFirebase(link)


function updateQuestionIndex (link){
    const array = readdirSync(link);
    
    if(link.endsWith("question")) {
        const [,, subject, paper, chapter] = link.match(/[^\/]+/g)
            
        const ref = doc(db, "questionIndex", "Physics");
        updateDoc(ref, {
            [`${paper}.${chapter}`] : array.length,
        });

        return
    };

    array.forEach(item => {
        if(item.includes(".")) {
            return
        };
        updateQuestionIndex(link + `/${item}`)
    })
}







function createLocalDirectories(boiler = "./images") {
    subjectRef.forEach(subjectObj => {
        const { subjectName } = subjectObj;
        // mkdirSync(`${boiler}/${subjectName}`, {recursive : true})
        for (const paperName in subjectObj) {
            const chapterArray = subjectObj[paperName];
            if(chapterArray == subjectName) continue;
            // mkdirSync(`${boiler}/${subjectName}/${paperName}`, {recursive : true})
            chapterArray.forEach(chapterName => {
                // mkdirSync(`${boiler}/${subjectName}/${paperName}/${chapterName}`, {recursive : true})
                const questionTypeArray = ["cq"];
                questionTypeArray.forEach( questionType => {
                    // mkdirSync(`${boiler}/${subjectName}/${paperName}/${chapterName}/${questionType}`, {recursive : true})
                    const photoTypes = ["question", "solution"] 
                    photoTypes.forEach(photoType => {
                        mkdirSync(`${boiler}/${subjectName}/${paperName}/${chapterName}/${questionType}/${photoType}`, { recursive: true })
                    })
                })
            })
        }
    })
}

// createLocalDirectories()