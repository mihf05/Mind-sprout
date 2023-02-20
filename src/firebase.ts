import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, doc, setDoc, getDoc, query, limit, onSnapshot, updateDoc, deleteDoc, increment, serverTimestamp, orderBy, } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut as firebaseSingOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";

import { defaultAppData, defaultPracticeData, stateType } from "./globalStates";

import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes} from "firebase/storage";
import userPhotoFallback from './assets/img/user.png';

const firebaseConfig = {
    apiKey: "AIzaSyBOxoXPHcPNS0sLU2knK2_tNHOQm-uC3Pc",
    authDomain: "mindsprout.firebaseapp.com",
    projectId: "mindsprout",
    storageBucket: "mindsprout.appspot.com",
    messagingSenderId: "1047811960255",
    appId: "1:1047811960255:web:5f554dc75e9e800f08450a",
    measurementId: "G-LSZ17SMXG9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function getQuestionsIndex(setShowError: any){
    getDocs(collection(db, "questionIndex"))
    .then((docs) => {
        const returnObj: any = {};
        docs.forEach(item => {
            returnObj[item.id] = item.data()
        })
        sessionStorage.setItem("questionIndex", JSON.stringify(returnObj))
    }).catch(() => setShowError(true))
}

//code for checking if user is there;
export function checkIfTheUserIsValid(user: any, setUser: any){
    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser && user && (currentUser.uid !== user.uid))  setUser(null)
        if(!currentUser)  setUser(null)
    });
}

export function updateSubjects(sectionName: string, state: stateType, userData: any, setAppData: any, setShowError: any) {
    const docRef = doc(db, "userAppData", userData.uid)
    updateDoc(docRef, {
        [sectionName] : state
    }).catch((e) => {
        setShowError(true)
        console.log(e);
    })
}



export type downLoadUrlWithInfo = {subjectName: string, questionType: string, paperName: string, chapterName: string, solutionUrls: string[], url: string, sectionName: string}[] 

export function getQuestionsLinks(linkObject: {subjectName: string, links: any[], chapterName: string, paperName: string, sectionName: string}[], setter: any, errorSetter: any) {
    wrapper().then(state => {
        setter(state)
    })    
    async function wrapper() {
        const returnArray: downLoadUrlWithInfo = [];
        
        for (let index = 0; index < linkObject.length; index++) {
            const {subjectName, links, sectionName} = linkObject[index];
            
            for (let index = 0; index < links.length; index++) {
                const obj = links[index];
            
                for (const questionType in obj) {
                    let { questionPath, solutionPath, paperName, chapterName } = obj[questionType];
                    const questionImgRef = ref(storage, questionPath);
                    const listRef = ref(storage, solutionPath);
                    
                    try {
                        const res = await listAll(listRef)
                    
                        async function wrapper () {
                            const returnArray: string[] = []
                            for (let index = 0; index < res.items.length; index++) {
                                const solutionRef = res.items[index];
                                returnArray.push(await getDownloadURL(solutionRef))
                            }
                            return returnArray
                        } 
                        const url = await getDownloadURL(questionImgRef)
                        returnArray.push({subjectName, sectionName, chapterName, paperName, questionType, solutionUrls: await wrapper(), url});
    
                    } catch (error) {
                        console.log(error);
                        errorSetter(true)
                    }
                }
            }
        }

        return returnArray
    }
    
}


export function updateLastLoggedInDate(action: string, today: string, uid: string){
    const ref = doc(db, "userAppData", uid);
    updateDoc(ref, {
        'loginStreak.streak': action == "INCREMENT" ? increment(1) : 1,
        'loginStreak.lastLoggedIn': today,
        
    })
}   

export async function setAppDataFireBase(userData: any, setter: any, setShowError: any){
    const today = new Date().toDateString();
    const ref = doc(db, "userAppData", userData.uid);
    
    try {
        const docSnap = await getDoc(ref);
        if(!docSnap.exists()){
            const casualData = {
                ...defaultAppData, 
                uid: userData.uid,
                loginStreak: {
                    lastLoggedIn : today,
                    streak: 1,
                }
            }
            await setDoc(ref, casualData);
        }
        
        onSnapshot(ref, doc => {
            setter(
                doc.data()
            )
        });
    } catch (error) {
        console.log(error);
        setShowError(true)
    }
}

export async function setPracticeDataFirebase(userData: any, setter: any, setShowError: any){
    const today = new Date().toDateString();

    const ref = doc(db, "userAppData", userData.uid);
    const practiceDataRef = doc(ref, "practiceData", today); 

    try {
        const practiceDocSnap = await getDoc(practiceDataRef);
        if(!practiceDocSnap.exists()){
            const practiceData = {...defaultPracticeData, date: today, createdAt: serverTimestamp()};
            await setDoc(practiceDataRef, practiceData);
        }
        onSnapshot(query(collection(ref, "practiceData"), orderBy("createdAt"), limit(2)), (doc) => {
            setter(
                doc.docs.map(item => {
                    return item.data()
                })
            )
        });   
    } catch (error) {
        console.log(error);
        setShowError(true)
    }
}

export function increaseCorrectAndWrong(imgObj: any, type: string, setShowError: any) {
    const user = auth.currentUser as any;
    const {sectionName, subjectName} = imgObj;
    const today = new Date().toDateString();
    const otherType = type == "correct" ? "wrong" : "correct";

    updateDoc(doc(db, "userAppData", user.uid, "practiceData", today) , {
        [`${sectionName}.${subjectName}.${type}`] : increment(1),
        [`${sectionName}.${subjectName}.${otherType}`] : increment(0),

    }).catch((error)=> {
        console.log(error);
        setShowError(true)
    })
}

export function signInWithGoogle(setter: any, setError: any){
    signInWithPopup(auth, googleProvider).then(userCred => {
        setter(handelUserData(userCred))
    }).catch(err => {
        console.log(err);
        setError(true)
    })
}

async function uploadProfilePhoto(photo: any, uid: string){
    if(!photo) return [null, null];
    const photoExtension = photo.name.match(/\.\w+/gi);
    const pathName = `userPhoto/${uid}${photoExtension[photoExtension.length - 1]}`;
    const photoRef = ref(storage, pathName);
    await uploadBytes(photoRef, photo)
    const url = await getDownloadURL(photoRef);
    return [url, photoExtension];
}

export async function updateProfilePicture(photo: any, userData: any, setter: any, setShowError: any, setFeedBack?: any){
    const [url, photoExtension] = await uploadProfilePhoto(photo, userData.uid);

    updateProfile(auth.currentUser as any, {
        photoURL: url,
        displayName: userData.displayName,    
    }).then(() => {
        setter({...userData, photoURL: url ?? userPhotoFallback, photoExtension });
        if(setFeedBack) setFeedBack("Profile picture updated.")
    }).catch((e) => {
        console.log(e);
        setShowError(true)
    });
}

export async function createUser(userName: string, photo: any, email: string, password: string, setter: any, setError: any, setShowError: any){
    createUserWithEmailAndPassword(auth, email, password)
    .then( async userCred => {
        updateProfile(auth.currentUser as any, {
            displayName: userName,
        }).then(() => {
            setter(handelUserData(userCred));
            updateProfilePicture(photo, userCred.user, setter, setShowError)
        }).catch((e) => {
            console.log(e);
            setShowError(true)            
        });
    }).catch(err => {
        handelFormErrors(err.message, setError)
    })
}

export async function signInUser(email: string, password: string, setter: any, setError: any){
    signInWithEmailAndPassword(auth, email, password)
    .then(userCred => {
        setter(handelUserData(userCred));
    }).catch(error => {
        handelFormErrors(error.message, setError);
    })
}

function handelUserData(userCred: any){
    const { uid, email, displayName, photoURL } = userCred.user;
    const now = new Date().getTime()
    const expiry = new Date(now + 2.592e+9).getTime();
    const userData = { uid, email, displayName, photoURL: photoURL ?? userPhotoFallback, expiry }
    return userData
}

export function signOut(setter: any, setShowError: any) {
    firebaseSingOut(auth).catch(() => setShowError(true))
    setter(null)
}   

export async function delUser(userData: any, setter: any){
    const user = auth.currentUser;
    if(user){
        const userPhotoRef = ref(storage, `userPhoto/${user.uid}${userData.photoExtension}`);

        try {
            Promise.all([
                deleteUser(user),
                deleteDoc(doc(db, "userAppData", user.uid)),
                deleteObject(userPhotoRef)
            ])
            setter(null);
            return false;
        } catch (error) {
            return true;
        }
    }
}

function handelFormErrors(message: string, setter: any){
    switch (message) {
        case "Firebase: Error (auth/user-not-found).": setter("No user found with this Email address.")
            break;
        case "Firebase: Error (auth/wrong-password)." : setter("wrong password.")
            break;
        case "Firebase: Error (auth/email-already-in-use)." : setter("This Email is already in use.")
            break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password)." : setter("Password should be at least 6 characters.")
            break;
        default: "Unexpected error occurred. Try again after refreshing the page. If the error still remains then contact the developer."
            break;
    }
}
