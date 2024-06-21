document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fetch job listings from Adzuna API
    fetchJobs();

    function fetchJobs() {
        const appId = 'a08a8501'; // Replace with your Adzuna App ID
        const appKey = 'e32571c0af674307373f26c0b26d6639'; // Replace with your Adzuna App Key
        const url = `        const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=a08a8501&app_key=e32571c0af674307373f26c0b26d6639&results_per_page=10&what=software%20developer&where=new%20york`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const jobList = document.getElementById('job-list');
                jobList.innerHTML = ''; // Clear any existing content
                data.results.forEach(job => {
                    const jobItem = document.createElement('div');
                    jobItem.classList.add('job-item');
                    jobItem.innerHTML = `
                        <h3>${job.title}</h3>
                        <p>${job.description}</p>
                        <a href="${job.redirect_url}" class="btn" target="_blank">Apply Now</a>
                    `;
                    jobList.appendChild(jobItem);
                });
            })
            .catch(error => console.error('Error fetching jobs:', error));
    }
});
