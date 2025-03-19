import Image from 'next/image';
import styles from '../styles/home.module.css'

const LandingPage = () =>{
    return(
        <section className={styles.hero}>
        {/* Left Side - Text */}
            <div className={styles.left}>
                <div className={styles['left-text']}>
                    <h1>Health in Your Hands.</h1>
                    <p>
                        Take control of your healthcare with CareMate. Book appointments with ease,
                        explore health blogs, and stay on top of your well-being, all in one place.
                    </p>
                </div>
                <div className={styles['button-container']}>
                    <button className={styles.btn}>Get started</button>
                </div>
            </div>
    
            {/* Right Side - Image */}
            <div className={styles.rightdiv}>
                <Image src={'/home.png'} alt='hello' fill className={styles.img} />
            </div>
        </section>
    )
}

export default LandingPage;