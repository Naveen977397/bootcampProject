'use client'

import styles from '../styles/login.module.css';
import Button from '../components/Button';
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Login = () => {

    const[pass,setPass] = useState(true);
    const[email,setemail] = useState('');
    const[password,setpassword] = useState('');

    const router = useRouter();

    const loginhandler = async(e)=>{
        e.preventDefault();
        console.log(email,password);

        const response = await fetch('http://localhost:5000/api/v1/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(response.headers.get('set-cookie'));
        
        if(response.ok){
            router.push('/appointment');
        }
        else{
            alert("invalid credentials");
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles['login-form']}>
                <h2 className={styles.title}>Login</h2>
                <div className={styles['signup-text']}>
                   <p>Are you a new member? <a className = {styles['signup-link']}href=".\signup">Sign up here.</a></p>
                </div>
                <form onSubmit={loginhandler}>
                    {/* Email Field */}
                    <div className={styles.email}>
                        <label htmlFor='email'>Email</label>
                        <div className={styles.inputGroup}>
                            <span className={styles.icon}><img src='/At.svg'></img></span>
                            <input 
                                  type="email" 
                                  placeholder="emmawatson@gmail.com"
                                //   value="email"
                                  onChange={(e)=>setemail(e.target.value)}
                                  name="email"
                                  required
                                  />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className={styles.password}>
                        <label htmlFor='password'>Password</label>
                        <div className={styles.inputGroup}>
                            <span className={styles.icon}><img src='/Lock.svg'></img></span>
                            <input 
                                 type={pass ? "password" : "text"} 
                                 placeholder="Enter your Password" 
                                //  value="password"
                                 name='password'
                                 required
                                 onChange={(e)=>setpassword(e.target.value)}
                                 />
                                 
                            <img 
                                src='.\Eye.svg' 
                                className={pass ? styles.toggleHidden: styles.toggleVisible}
                                onClick={()=>{setPass(!pass)}}></img>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button text="login" variant='primary' type='submit' />

                    {/* Reset Button */}
                    <Button text='Reset' variant='secondary' onClick={()=> {
                        setemail(""); 
                        setpassword("");
                        }}/>

                    {/* Forgot Password */}
                    <p className={styles.forgotPassword}>Forgot Password ?</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
