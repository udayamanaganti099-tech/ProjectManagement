import { useState, useEffect } from "react";

function Adzuna({ jobTitle }) {
    const [jobs, setJobs] = useState([]);

    const APP_ID = "4feb121e"; 
    const APP_KEY = "fbac2d3ba62af84e341a00a25c7d5bb9";

    useEffect(() => {
        if (!jobTitle) return; // 1. Prevent fetching if jobTitle is empty

        // 2. Wrap jobTitle in encodeURIComponent to safely handle spaces/special characters in the URL
        fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=5&what=${encodeURIComponent(jobTitle)}`)
            .then(response => response.json())
            .then(data => {
                setJobs(data.results || []); // 3. Fallback to empty array to prevent map() crashes
            }).catch(error => {
                console.error("Error fetching Adzuna data:", error);
            });
    }, [jobTitle]); 
    
    return (
        <>
            <h1>Job Results for: {jobTitle}</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        {/* 4. Use optional chaining (?) in case company data is missing from the API */}
                        <p>{job.title} at {job.company?.display_name}</p>
                        <a href={job.redirect_url}>Apply Here</a>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Adzuna;