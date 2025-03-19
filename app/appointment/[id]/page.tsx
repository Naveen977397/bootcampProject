'use client'
import { useParams } from "next/navigation";
import Image from "next/image";
import { doctors } from "../page";
import styles from '@/app/styles/profilePage.module.css';

const ProfilePage = () => {
    const { id } = useParams();
    const doctor = doctors.find((doc) => doc.id === Number(id));

    // If doctor is not found, return a message
    if (!doctor) {
        return <h1 className={styles.notFound}>Doctor not found</h1>;
    }

    return (
        <div className={styles.card}>
            <div className={styles.Title}>
                <div className={styles.imageFrame}>
                    <img src="/Frame.svg" alt="Doctor Frame" />
                </div>
                <div className={styles.titleFrame}>
                    <h6>{doctor.name}</h6>
                    <div className={styles['role-exp']}>
                        <div className={styles.role}>
                            <img src="/Stethoscope.svg" alt="Stethoscope" />
                            <p>{doctor.specialty}</p>
                        </div>
                        <div className={styles.experience}>
                            <img src="/Hourglass.svg" alt="Hourglass" />
                            <p>{doctor.experience} years</p>
                        </div>
                    </div>
                </div>
                <div className={styles.ratingContainer}>
                    <div className={styles.ratingText}>
                        <p>Rating :</p>
                    </div>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, index) => (
                            <Image
                                key={index}
                                src="/Star.svg"
                                alt="Star"
                                width={20}
                                height={20}
                                className={index < doctor.rating ? styles.filledstar : styles.emptystar}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <button className={styles.button}>Book Appointment</button>
        </div>
    );
};

export default ProfilePage;
