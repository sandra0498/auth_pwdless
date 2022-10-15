import React from 'react'
import styles from '../styles/Home.module.css';
import {useState, useEffect} from "react";
import { webAuth, WebAuth } from '../config/auth';
import { useRouter } from 'next/dist/client/router';

export default function hamster() {

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect( () => {
        if (window.location.hash) {
            webAuth.parseHash({hash: window.location.hash}, function (
                err,
                authResult
            ){
                if(err){
                    return console.log(err);
                }
                webAuth.client.userInfo(authResult.accessToken, function (err, user){
                    setUser(user);

                });
            });
        }
        else {
            if (user === null){
                router.push("/");
            }
        }
    }, []);

    
  return (
    <div className={styles.container}>
        <p>
            Congratulations {user && user.email}
            <span role="img" aria-label="emoji">
                🎉
            </span>
        </p>
        <h1>You have joined the party!! </h1>

        <iframe src="https://giphy.com/embed/jU2ZYjA8ngdKU" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen>
            
            
        </iframe>
    </div>
  );

}
