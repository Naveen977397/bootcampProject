'use client'

import Input from "../components/Input";
import styles from "../styles/signup.module.css"
import Button from "../components/Button"
import {useState} from "react"

const signup = () =>{
    const[pass, setPass] = useState(true);
    return(
        <div className={styles.signup}>
            <div className={styles['signup-form']}>
                <h6 className={styles.title}>Signup</h6>
                <div className={styles['signup-text']}>
                   <p>Are you already a member? <a className = {styles['signup-link']}href="/login">Login</a></p>
                </div>
                <form className={styles.form}>
                    {/* Name Field */}
                    <Input label='Name' placeholder="Enter your name" type="text" text="./Name.svg"/>

                    {/* Email Field */}
                    <Input label="Email" placeholder="Enter your email address" type="email" text="./At.svg"/>
                    
                    {/* Password Field */}
                    <Input label="Password" placeholder="Enter your Password" type="password" text="./Lock.svg"/>

                    {/* Login Button */}
                    <Button text="login" variant='primary' onClick={undefined} />

                    {/* Reset Button */}
                    <Button text='Reset' variant='secondary' onClick={undefined}/>
                </form>
            </div>
        </div>
    )
}

export default signup;