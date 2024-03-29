import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        console.log("google mama is coming");
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                // const user = result.user();
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error ,', error.message);
            })
    }

    const handleGithubLogin = () =>{
        signInWithPopup(auth , githubProvider)
        .then(result =>{
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

    return (
        <div>
            {
                user ?
                    <button onClick={handleSignOut}>sign out</button>:
                    <div>
                        <button onClick={handleGoogleSignIn}>Google Login</button> 
                        <button onClick={handleGithubLogin}> Github Login </button>
                    </div>
                    // <button onClick={handleSignOut}>sign out</button>
            }
            <div>
                {/* <h1>User : {user.displayName}</h1> */}
                {
                    user && <div>
                        <h3>User : {user.displayName}</h3>
                        <h4>Email : {user.email}</h4>
                        <img src={user.photoURL} alt="no photo found" />
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;