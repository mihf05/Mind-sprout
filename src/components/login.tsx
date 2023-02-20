import s from './login.module.scss';
import facebook from '../assets/img/facebook_logo.webp';
import google from '../assets/img/google_logo.svg';
import Button from './button';
import { signInWithGoogle, createUser, signInUser } from '../firebase';
import { errorContext, userContext } from '../context/contextProvider';
import { useContext, useState } from 'react';
import UserProfilePicture from './userProfilePicture';
import fallBackUserPhoto from '../assets/img/user.png';

export default function login() {
    const [, setUserData] = useContext(userContext);
    const [, setShowError] = useContext(errorContext);
    const [newUser, setNewUser] = useState(false);
    const [error, setError] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null)

return (
        <div className={`${s.wrapper}`}>
            <div className={`${s.container}`}>
                {!newUser ? <span className={`${s.title}`}>Welcome back to<wbr/>&nbsp;Mind&nbsp;Sprout</span>: ""}
                {newUser ? <UserProfilePicture cno={s.photo} setter={setSelectedPhoto} photoURL={fallBackUserPhoto}/> : null}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;

                    const userName = form.userName?.value;
                    const confirmPassword = form.confirmPassword?.value;

                    const email = form.email.value;
                    const password = form.password.value;

                    if(confirmPassword && confirmPassword !== password) {
                        setError("Password field and confirm password field doesn't matches.")
                        return
                    }

                    if(userName && userName.length < 4) {
                        setError("The user name have to be at least four characters.")
                        return
                    }

                    newUser ? createUser(userName, selectedPhoto, email, password, setUserData, setError, setShowError) : signInUser(email, password, setUserData, setError)
                }}>
                    {newUser ? 
                        <div>
                            <span>User Name</span>
                            <input type="text" name='userName' required/>
                        </div>
                        : null    
                    }                        
                    <div>
                        <span>User Email</span>
                        <input type="email" name='email' required/>
                    </div>
                    <div>
                        <span>Password</span>
                        <input type={showPass ? "text" : "password"} name='password'required/>
                        <span onClick={() => setShowPass(state => !state)} className={`material-symbols-outlined ${s.showPass}`}>{showPass ? "visibility" : "visibility_off"}</span>
                    </div>

                    {newUser ? 
                        <div>
                            <span>Confirm password</span>
                            <input type={showPass ? "text" : "password"} name='confirmPassword'required/>
                        </div>
                        : null    
                    }

                    <span className={`${s.error}`}>{error}</span>
                    <Button click={() => {}} className="wideBtn" text={`Sign ${newUser? "up" : "in"}`} icon='login'/>
                </form>
                <span className={`${s.or}`}>or</span>
                <div onClick={() => signInWithGoogle(setUserData, setShowError)} className={`${s.providerContainer}`}>
                    <img src={google} alt="google logo" />
                    <span>continue with Google</span>
                </div>
                <div className={`${s.new}`}>
                    <span>{newUser ? "Already have an Account?" : "New at Mind Sprout?"}</span>
                    <span onClick={() => {
                        setNewUser(state => !state)
                    }} 
                        className={`${s.underLine}`}>{newUser ? "Log in.": "Create Account."}</span></div>
            </div>
        </div>
    )
}
