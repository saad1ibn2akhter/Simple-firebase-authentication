import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.init';
import './../Header/Header.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const lastLogin = '';
    const [loginTime, setLoginTime] = useState([]);
    const [lastLog, setLastLog] = useState([]);

    const handleGoogleSignIn = () => {
        console.log("google mama is coming");
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                // const user = result.user();
                console.log(loggedInUser);
                const { metadata: { creationTime } } = loggedInUser;
                const { metadata: { lastSignInTime } } = loggedInUser;
                setLoginTime(creationTime);
                setLastLog(lastSignInTime);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error ,', error.message);
            })
    }

    const handleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const gitHubUser = result.user;
                setUser(gitHubUser);
                console.log(gitHubUser);
            })
            .catch(error => console.log(error))
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser('');
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        AOS.init({
            // Global settings...
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 600, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: true, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom',
        });
    }, [])

    return (
        <div className='mb-[400px]'>
            {
                user ?
                    <button onClick={handleSignOut}>sign out</button> :
                    <div>
                        <button onClick={handleGoogleSignIn}>Google Login</button>
                        <button onClick={handleGithubLogin}> Github Login </button>
                    </div>
                // <button onClick={handleSignOut}>sign out</button>
            }
            <div>
                {/* <h1>User : {user.displayName}</h1> */}
                {
                    user && <div className='my-[200px]'>
                        <img data-aos="fade-up" src={user.photoURL} alt="no photo found" />
                        <h3 data-aos="fade-right" className='back2'>User : {user.displayName}</h3>
                        <h4 data-aos="fade-left" className='back'>Email : {user.email}</h4>
                        <h4 data-aos="fade-right" className='back3'>System creation : {loginTime}</h4>
                        <h4 data-aos="fade-left" className='back3'>Last login : {lastLog}</h4>
                        
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;