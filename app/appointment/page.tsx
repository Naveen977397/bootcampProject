'use client'

import styles from "@/app/styles/Appoint.module.css";
import Footer from '@/app/components/Footer';
import DoctorCard from "@/app/components/DoctorCard";
import { useState, useEffect } from 'react';
import {useRouter} from  'next/navigation';

type Doctor = {
    doc_id:number;
    doc_name: string;
    specialization: string;
    experience: number;
    rating: number;
    gender: string;
}


interface Filters {
    rating: number;
    experience: number;
    gender: string;
}

export default function Appoint () {

    const [filters, setFilters] = useState<Filters>({ rating: 0, experience: 0, gender: "All" });
    const[searchValue,setsearchValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const doctorsPerPage = 6;
    const [doctors,setDoctors] = useState<Doctor[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter() ;



    useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/v1/appointment", {
              credentials: "include",
            });
    
            if (res.ok) {
              setIsAuthenticated(true);
            } else {
              router.push("/login"); // Redirect if not authenticated
            }
          } catch (error) {
            console.error("Auth check failed:", error);
            router.push("/login");
          } 
        };
        checkAuth();
      }, [router]);

    useEffect(()=>{
        if(!isAuthenticated){
            return;
        }
        const fetchDoc = async()=>{
            try {
                const res = await fetch("http://localhost:5000/api/v1/doctors");
                if(!res.ok){
                    throw new Error('failed to fetch doctors data');
                }
                const data = await res.json();
                console.log("Fetched Data:", data);
                setDoctors(data.data);
                setFilteredDoctors(data.data);
                console.log(doctors);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDoc();
    },[isAuthenticated]);
    console.log("After Fetch - Doctors:", doctors);
    // Function to filter doctors
    const applyFilters = () => {
        if(!doctors||doctors.length===0){
            return [];          
        }
        let filtered =[...doctors];
        
        // console.log("filtered doctors",filtered);
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
                doctor.doc_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    };

    // Set filtered doctors based on applied filters
    useEffect(() => {
        const filtered = applyFilters();
        
        if (filtered.length > 0) {
            setFilteredDoctors(filtered);
        }else{
            setFilteredDoctors([]);
        }
        setCurrentPage(1); 
    }, [filters, searchQuery]);

    // Handle search change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsearchValue(event.target.value);
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

    if(!isAuthenticated){
        return null;       
    }

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
                            onChange={(e)=>handleSearchChange(e)} 
                            onKeyDown={(e)=>{if(e.key==="Enter"){setSearchQuery(searchValue)}}}
                        />
                    </div>
                    <button className={styles.searchButton} onClick={()=>setSearchQuery(searchValue)}>Search</button>
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
                                    key={doctor.doc_id} 
                                    onClick={() => router.push(`/appointment/${doctor.doc_id}`)}
                                    style={{ cursor: "pointer" }} // Make it visually clickable
                                >
                                    <DoctorCard 
                                        name={doctor.doc_name} 
                                        specialty={doctor.specialization} 
                                        experience={doctor.experience} 
                                        rating={doctor.rating} 
                                        gender={doctor.gender} 
                                    />
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
