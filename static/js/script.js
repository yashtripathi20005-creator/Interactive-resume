// Load resume data from backend
async function loadResumeData() {
    try {
        const response = await fetch('/api/resume');
        const data = await response.json();
        populateResume(data);
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

// Populate all sections with data
function populateResume(data) {
    // Personal Info
    document.getElementById('profileName').textContent = data.personal_info.name;
    document.getElementById('profileTitle').textContent = data.personal_info.title;
    document.getElementById('profileSummary').textContent = data.personal_info.summary;
    
    // Social links
    document.getElementById('socialLinkedin').href = data.personal_info.linkedin;
    document.getElementById('socialGithub').href = data.personal_info.github;
    document.getElementById('socialEmail').href = `mailto:${data.personal_info.email}`;
    
    // About section
    document.getElementById('aboutText').innerHTML = `<p>${data.personal_info.summary}</p>`;
    document.getElementById('aboutEmail').textContent = data.personal_info.email;
    document.getElementById('aboutPhone').textContent = data.personal_info.phone;
    document.getElementById('aboutLocation').textContent = data.personal_info.location;
    
    // Contact info
    document.getElementById('contactEmailDisplay').textContent = data.personal_info.email;
    document.getElementById('contactPhoneDisplay').textContent = data.personal_info.phone;
    document.getElementById('contactLocationDisplay').textContent = data.personal_info.location;
    
    // Experience
    renderExperience(data.experience);
    
    // Skills
    renderSkills(data.skills);
    
    // Projects
    renderProjects(data.projects);
    
    // Education
    renderEducation(data.education);
}

// Render Experience
function renderExperience(experiences) {
    const container = document.getElementById('experienceContainer');
    container.innerHTML = '';
    
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const startDate = new Date(exp.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const endDate = exp.end_date === 'Present' ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        let descHtml = exp.description.map(d => `<li>${d}</li>`).join('');
        
        item.innerHTML = `
            <h3>${exp.position}</h3>
            <div class="company">${exp.company}</div>
            <div class="date">${startDate} - ${endDate}</div>
            <ul>${descHtml}</ul>
        `;
        
        container.appendChild(item);
    });
}

// Render Skills
function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    
    const categories = {
        'Programming Languages': skills.languages,
        'Frameworks & Libraries': skills.frameworks,
        'Tools & Platforms': skills.tools,
        'Databases': skills.databases
    };
    
    for (const [category, items] of Object.entries(categories)) {
        const div = document.createElement('div');
        div.className = 'skill-category';
        
        const tagsHtml = items.map(item => `<span class="skill-tag">${item}</span>`).join('');
        
        div.innerHTML = `
            <h3>${category}</h3>
            <div class="skill-tags">${tagsHtml}</div>
        `;
        
        container.appendChild(div);
    }
}

// Render Projects
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const techHtml = project.technologies.map(tech => `<span>${tech}</span>`).join('');
        
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">${techHtml}</div>
            <a href="${project.link}" target="_blank" class="project-link">View Project →</a>
        `;
        
        container.appendChild(card);
    });
}

// Render Education
function renderEducation(education) {
    const container = document.getElementById('educationContainer');
    container.innerHTML = '';
    
    education.forEach(edu => {
        const card = document.createElement('div');
        card.className = 'education-card';
        
        card.innerHTML = `
            <h3>${edu.institution}</h3>
            <div class="degree">${edu.degree}</div>
            <div class="year">${edu.year}</div>
        `;
        
        container.appendChild(card);
    });
}

// Navigation toggle for mobile
document.getElementById('navToggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            alert('Message sent successfully!');
            this.reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Download resume (simulated)
function downloadResume() {
    alert('Resume download functionality would be implemented here.\nYou can add a PDF file to the static folder and download it.');
}

// Initialize
loadResumeData();

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
