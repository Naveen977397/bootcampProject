'use client'

import Input from "../components/Input";
import styles from "../styles/signup.module.css";
import Button from "../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
    // const [pass, setPass] = useState(true);
    const [userInfo, setUserInfo] = useState({
        user_name: "",
        email: "",
        password: "",
    });


    const router = useRouter();
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v1/signup', {  // ✅ Fix: Correct API URL format
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            const data = await response.json();
            console.log("Signup Response:", data); // ✅ Debugging

            if (response.ok) {
                alert("Signup successful!");
                router.push('/login'); // ✅ Redirect to login
            } else {
                alert(data.message || "Signup failed. Please try again."); // ✅ Show error message from server
            }
        } catch (error) {
            console.error("Signup Error:", error); // ✅ Fix: Display error in console
            alert("An error occurred. Please try again.");
        }
    };

    const resetHandler = () => {
        setUserInfo({
            user_name: "",
            email: "",
            password: "",
        });
    };

    return (
        <div className={styles.signup}>
            <div className={styles['signup-form']}>
                <h6 className={styles.title}>Signup</h6>
                <div className={styles['signup-text']}>
                   <p>Are you already a member? <a className={styles['signup-link']} href="/login">Login</a></p>
                </div>
                <form className={styles.form} onSubmit={signupHandler}>
                    <Input 
                        label='Name' 
                        placeholder="Enter your name" 
                        type="text" 
                        text="./Name.svg"
                        name="user_name"
                        value={userInfo.user_name}
                        required
                        onChange={(e) => setUserInfo({ ...userInfo, user_name: e.target.value })}
                    />

                    <Input  
                        label="Email" 
                        placeholder="Enter your email address" 
                        type="email" 
                        text="./At.svg"
                        name="email"
                        value={userInfo.email}
                        required
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />

                    <Input 
                        label="Password" 
                        placeholder="Enter your Password" 
                        type="password" 
                        text="./Lock.svg"
                        name="password"
                        value={userInfo.password}
                        required
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    />

                    <Button text="Signup" variant='primary' type="submit" />

                    <Button text='Reset' variant='secondary' onClick={resetHandler}/>
                </form>
            </div>
        </div>
    );
};

export default Signup;
