'use client'

import styles from "../styles/Appoint.module.css";
import Footer from '../components/Footer';
import DoctorCard from "../components/DoctorCard";
import { useState, useEffect } from 'react';
import {useRouter} from  'next/navigation';

interface Doctor {
    id:number;
    name: string;
    specialty: string;
    experience: number ;
    rating: number;
    gender: string;
}

export const doctors: Doctor[] = [
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


interface Filters {
    rating: number;
    experience: number;
    gender: string;
}

export default function Appoint() {
    const [filters, setFilters] = useState<Filters>({ rating: 0, experience: 0, gender: "All" });
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const doctorsPerPage = 6;
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const router = useRouter() ;
    // Function to filter doctors
    const applyFilters = () => {
        let filtered = doctors;

        // Apply rating filter
        if (filters.rating !== 0) {
            filtered = filtered.filter(doctor => doctor.rating === filters.rating);
        }

        // Apply experience filter
        if (filters.experience !== 0) {
            filtered = filtered.filter(doctor => {
                if (filters.experience === 1) return doctor.experience <= 1;
                if (filters.experience === 3) return doctor.experience > 1 && doctor.experience <= 3;
                if (filters.experience === 5) return doctor.experience > 3 && doctor.experience <= 5;
                if (filters.experience === 10) return doctor.experience > 5 && doctor.experience <= 10;
                if (filters.experience === 15) return doctor.experience > 10;
                return false;
            });
        }

        // Apply gender filter
        if (filters.gender !== "All") {
            filtered = filtered.filter(doctor => doctor.gender === filters.gender);
        }

        // Apply search query filter
        if (searchQuery) {
            filtered = filtered.filter(doctor => 
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    // Set filtered doctors based on applied filters and default to best rated doctors
    useEffect(() => {
        const bestRatedDoctors = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 6);
        const filtered = applyFilters();
        setFilteredDoctors(filtered.length > 0 ? filtered : bestRatedDoctors);
    }, [filters, searchQuery]);

    // Handle search change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({ rating: 0, experience: 0, gender: "All" });
        setSearchQuery("");
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
    const getDoctorsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * doctorsPerPage;
        const endIndex = startIndex + doctorsPerPage;
        return filteredDoctors.slice(startIndex, endIndex);
    };

    return (
        <div>
            <div className={styles.searchSection}>
                <h2 className={styles.heading}>Find a doctor at your own ease</h2>
                <div className={styles.searchContainer}>
                    <div className={styles.inputWrapper}>
                        <img src="./Vector.svg" alt="Search Icon" className={styles.icon} />
                        <input 
                            type="text" 
                            placeholder="Search Doctor" 
                            className={styles.inputField} 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                        />
                    </div>
                    <button className={styles.searchButton}>Search</button>
                </div>
            </div>

            <section className={styles.donateSection}>
                <div className={styles.donateTitle}>
                    <h2>{filteredDoctors.length} Doctors Available</h2>
                    <p>Book appointments with minimum wait-time & verified doctor details</p>
                </div>

                <div className={styles.mainFrame}>
                    <div className={styles.sideContent}>
                        <div className={styles.filterbtn}>
                            <p className={styles.filter}>Filter by:</p>
                            <button className={styles.reset} onClick={resetFilters}>
                                Reset
                            </button>
                        </div>

                        <div className={styles.filtersFrame}>
                            <div className={styles["left-filters"]}>
                                <div className={styles.content}>
                                    <p>Rating</p>
                                    <div className={styles.radioWrapper}>
                                        {[0, 1, 2, 3, 4, 5].map((value) => (
                                            <span key={value}>
                                                <input 
                                                    type="radio" 
                                                    id={`rating-${value}`} 
                                                    name="rating" 
                                                    value={value} 
                                                    checked={filters.rating === value} 
                                                    onChange={() => setFilters({ ...filters, rating: value })}
                                                />
                                                <label htmlFor={`rating-${value}`}>{value === 0 ? "Show All" : `${value} Star`}</label>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles["left-filters"]}>
                                <div className={styles.content}>
                                    <p>Experience</p>
                                    <div className={styles.radioWrapper}>
                                        {[[15, "15+ years"], [10, "10-15 years"], [5, "5-10 years"], [3, "3-5 years"], [1, "1-3 years"], [0, "0-1 years"]].map(([value, label]) => (
                                            <span key={value}>
                                                <input 
                                                    type="radio" 
                                                    id={`experience-${value}`} 
                                                    name="experience" 
                                                    value={value} 
                                                    checked={filters.experience === value} 
                                                    onChange={() => setFilters({ ...filters, experience: Number(value) })}
                                                />
                                                <label htmlFor={`experience-${value}`}>{label}</label>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles["left-filters"]}>
                                <div className={styles.content}>
                                    <p>Gender</p>
                                    <div className={styles.radioWrapper}>
                                        {["All", "Male", "Female"].map((value) => (
                                            <span key={value}>
                                                <input 
                                                    type="radio" 
                                                    id={`gender-${value}`} 
                                                    name="gender" 
                                                    value={value} 
                                                    checked={filters.gender === value} 
                                                    onChange={() => setFilters({ ...filters, gender: value })}
                                                />
                                                <label htmlFor={`gender-${value}`}>{value}</label>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        {getDoctorsForCurrentPage().length > 0 ? (
                            getDoctorsForCurrentPage().map((doctor, index) => (
                                // <DoctorCard key={index} onClick={()=>router.push(`/appointment/${doctor.id}`)} {...doctor} />
                                <div 
                                    key={doctor.id} 
                                    onClick={() => router.push(`/appointment/${doctor.id}`)}
                                    style={{ cursor: "pointer" }} // Make it visually clickable
                                >
                                    <DoctorCard {...doctor} />
                                </div>
                            ))
                        ) : (
                            <p>No doctors found matching the filters.</p>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.paginationSection}>
                <div id="paginationFrame">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <p>Prev</p>
                    </button>
                    <div id="pageNumbers">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={currentPage === index + 1 ? styles.activePage : ""}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <p>Next</p>
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
