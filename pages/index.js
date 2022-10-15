import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { webAuth, WebAuth } from '../config/auth'; 

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    emailError: false,
    otpError: false
  });

  const [success, setSuccess] = useState(false);
  const handleAuth = (e) => {
    e.preventDefault();

    webAuth.passwordlessStart(
      {
        connection: "email",
        send:"code", 
        email: email
      },
      function (err, res) {
        if(res.Id) {
          setSuccess(true);
        } else {
          setError({...error, emailError: true});
        }
      }
    );
  };


  const handleVerifyToken = (e) => {
    e.preventDefault();
    webAuth.passwordlessLogin(
      {
        connection: "email",
        email: email,
        verificationCode: otp
      },
      
      function (err, res) {
        if (err) {
          setError({...error, otpError: true});
        } else {
          router.push("/page");
        }

      }
    );
  };

  return(
    <div className={styles.container}>

    </div>
  );

  
}
