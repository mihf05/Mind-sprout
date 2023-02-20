import s from './footer.module.scss';
import CurvyLine from './curvyline'
import logo from '../assets/img/mindsprout.webp';


export default function Footer() {
    return (
        <footer className={`${s.footer}`}>
            <CurvyLine/>
            <div className={`${s.wrapper}`}>

                <div className={`${s.logoWithName}`}>
                    <div className={`${s.logoContainer}`}><img src={logo} alt="Mind Sprout logo" /></div>
                    <MindSprout />
                </div>

                <div className={`${s.top}`}>
                    
                    <div className={`${s.introSection}`}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi enim quas ipsa, in fugit quia labore repudiandae quis iusto culpa numquam quidem debitis doloribus quaerat adipisci nulla ratione iste? Modi, doloribus ea dolorem porro quibusdam deserunt eius fugit rerum asperiores, repudiandae nobis ipsa? Debitis similique eligendi quos quo dignissimos saepe.</p>
                    </div>
                    <div className={`${s.linkSection}`}>
                        <ul className={`${s.libraries}`}>
                            <li>Libraries</li>
                            <li><a href="https://vitejs.dev/" target='_blank'>Vite</a></li>
                            <li><a href="https://reactjs.org/" target='_blank'>React</a></li>
                            <li><a href="https://sass-lang.com/" target='_blank'>SCSS</a></li>
                            <li><a href="https://www.typescriptlang.org/" target='_blank'>Typescript</a></li>
                        </ul>
    
                        <ul className={`${s.services}`}>
                            <li>Services</li>
                            <li><a href="https://firebase.google.com/" target='_blank'>Firebase</a></li>
                            <li><a href="https://fonts.google.com/" target='_blank'>Google Icons</a></li>
                            <li><a href="https://fonts.google.com/icons" target='_blank'>Google Fonts</a></li>
                            <li><a href="https://m3.material.io/" target='_blank'>Material Design</a></li>
                        </ul>
    
                        <ul className={`${s.services}`}>
                            <li>Team members</li>
                            <li><a href="https://github.com/Injamul-rgb" target='_blank'>@Injamul&#8209;rgb</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`${s.bottom}`}>
                    <MindSprout />
                    <div>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Feedback</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}


function MindSprout() {
    return <span className={`${s.name}`}>Mind Sprout</span>
}