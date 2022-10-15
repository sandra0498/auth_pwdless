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
          router.push("/hamster");
        }

      }
    );
  };

  return(
    <div className={styles.container}>
      {
        !success && (
          <form onSubmit={handleAuth}>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="enter email"
            required
            />

            <button className={styles.button}>Get hamster pic </button>
            {error.emailError && (
              <p className={styles.error}> Error sending email </p>
            )}
          </form>
        )
      }

      {
        success && (
          <form onSubmit={handleVerifyToken}>
            <input 
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
            placeholder="input token"
            required
            />
            <button className={styles.button}> Verify Token</button>
            {
              error.otpError && (
                <p className={styles.button}>Error validating OTP</p>
              )}
          </form>
        )}
    </div>
  );
}
