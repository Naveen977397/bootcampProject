'use client'
import { useParams } from "next/navigation";
import Image from "next/image";
// import  doctors from "@/app/appointment/page";
import styles from '@/app/styles/profilePage.module.css';

const ProfilePage = () => {
    const doctors = [
        { id: 1, name: "Dr. Tony Stark", specialty: "Dentist", experience: 4, rating: 5, gender: "Male" },
        { id: 2, name: "Dr. Natasha Romanoff", specialty: "Cardiologist", experience: 10, rating: 4, gender: "Female" },
        { id: 3, name: "Dr. Bruce Banner", specialty: "Neurologist", experience: 15, rating: 2, gender: "Male" },
        { id: 4, name: "Dr. Carol Danvers", specialty: "Pediatrician", experience: 8, rating: 1, gender: "Female" },
        { id: 5, name: "Dr. Peter Parker", specialty: "Orthopedic", experience: 5, rating: 3, gender: "Male" },
        { id: 6, name: "Dr. Stephen Strange", specialty: "Surgeon", experience: 12, rating: 1, gender: "Male" },
        { id: 7, name: "Dr. Reed Richards", specialty: "Neurologist", experience: 18, rating: 5, gender: "Male" },
        { id: 8, name: "Dr. Susan Storm", specialty: "Gynecologist", experience: 14, rating: 4, gender: "Female" },
        { id: 9, name: "Dr. Johnny Storm", specialty: "Dermatologist", experience: 6, rating: 3, gender: "Male" },
        { id: 10, name: "Dr. Ben Grimm", specialty: "Orthopedic", experience: 9, rating: 4, gender: "Male" },
        { id: 11, name: "Dr. Wanda Maximoff", specialty: "Psychiatrist", experience: 11, rating: 5, gender: "Female" },
        { id: 12, name: "Dr. Vision", specialty: "AI Specialist", experience: 7, rating: 5, gender: "Male" },
        { id: 13, name: "Dr. Scott Lang", specialty: "Microbiologist", experience: 5, rating: 4, gender: "Male" },
        { id: 14, name: "Dr. Hope Pym", specialty: "Immunologist", experience: 12, rating: 4, gender: "Female" },
        { id: 15, name: "Dr. Hank Pym", specialty: "Biochemist", experience: 20, rating: 5, gender: "Male" },
        { id: 16, name: "Dr. Shuri", specialty: "Biomedical", experience: 6, rating: 1, gender: "Female" },
        { id: 17, name: "Dr. Erik Selvig", specialty: "Astrophysicist", experience: 22, rating: 3, gender: "Male" },
        { id: 18, name: "Dr. Jane Foster", specialty: "Astrophysicist", experience: 16, rating: 4, gender: "Female" },
        { id: 19, name: "Dr. Nick Fury", specialty: "Ophthalmologist", experience: 30, rating: 5, gender: "Male" },
        { id: 20, name: "Dr. Maria Hill", specialty: "General Physician", experience: 8, rating: 4, gender: "Female" },
        { id: 21, name: "Dr. Peggy Carter", specialty: "Oncologist", experience: 19, rating: 5, gender: "Female" },
        { id: 22, name: "Dr. Howard Stark", specialty: "Geneticist", experience: 25, rating: 4, gender: "Male" },
        { id: 23, name: "Dr. Sam Wilson", specialty: "Physical Therapist", experience: 10, rating: 3, gender: "Male" },
        { id: 24, name: "Dr. Bucky Barnes", specialty: "Prosthetic Specialist", experience: 12, rating: 4, gender: "Male" },
        { id: 25, name: "Dr. T'Challa", specialty: "Trauma Surgeon", experience: 15, rating: 5, gender: "Male" },
        { id: 26, name: "Dr. Okoye", specialty: "Emergency", experience: 9, rating: 2, gender: "Female" },
        { id: 27, name: "Dr. M'Baku", specialty: "General Surgery", experience: 13, rating: 3, gender: "Male" }
        ];
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
