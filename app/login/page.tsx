'use client'

import styles from '../styles/login.module.css';
import Button from '../components/Button';
import { useState } from "react";

const Login = () => {

    const[pass,setPass] = useState(true);

    return (
        <div className={styles.login}>
            <div className={styles['login-form']}>
                <h2 className={styles.title}>Login</h2>
                <div className={styles['signup-text']}>
                   <p>Are you a new member? <a className = {styles['signup-link']}href=".\signup">Sign up here.</a></p>
                </div>
                <form>
                    {/* Email Field */}
                    <div className={styles.email}>
                        <label htmlFor='email'>Email</label>
                        <div className={styles.inputGroup}>
                            <span className={styles.icon}><img src='/At.svg'></img></span>
                            <input type="email" placeholder="emmawatson@gmail.com" />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className={styles.password}>
                        <label htmlFor='password'>Password</label>
                        <div className={styles.inputGroup}>
                            <span className={styles.icon}><img src='/Lock.svg'></img></span>
                            <input type={pass ? "password" : "text"} placeholder="Enter your Password"  />
                            <img 
                                src='.\Eye.svg' 
                                className={pass ? styles.toggleHidden: styles.toggleVisible}
                                onClick={()=>{setPass(!pass)}}></img>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button text="login" variant='primary' />

                    {/* Reset Button */}
                    <Button text='Reset' variant='secondary' onClick={undefined}/>

                    {/* Forgot Password */}
                    <p className={styles.forgotPassword}>Forgot Password ?</p>
                    
                </form>
            </div>
        </div>
    );
};

export default Login;
