from flask import Flask, render_template, jsonify, request
import json
from datetime import datetime

app = Flask(__name__)

# Sample resume data - Replace with your own
RESUME_DATA = {
    "personal_info": {
        "name": "John Developer",
        "title": "Full Stack Developer",
        "email": "john@example.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedin": "https://linkedin.com/in/johndev",
        "github": "https://github.com/johndev",
        "summary": "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Expert in Python, JavaScript, and cloud technologies."
    },
    "skills": {
        "languages": ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
        "frameworks": ["React", "Node.js", "Flask", "Django", "Express.js"],
        "tools": ["Git", "Docker", "AWS", "Kubernetes", "Jenkins"],
        "databases": ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
    },
    "experience": [
        {
            "company": "Tech Corp",
            "position": "Senior Full Stack Developer",
            "start_date": "2021-01",
            "end_date": "Present",
            "description": [
                "Led development of microservices architecture handling 1M+ daily requests",
                "Implemented CI/CD pipeline reducing deployment time by 70%",
                "Mentored team of 5 junior developers"
            ]
        },
        {
            "company": "Startup Inc",
            "position": "Full Stack Developer",
            "start_date": "2018-06",
            "end_date": "2020-12",
            "description": [
                "Built RESTful APIs serving 500K+ users",
                "Developed real-time dashboard using React and WebSocket",
                "Optimized database queries improving response time by 40%"
            ]
        },
        {
            "company": "Freelance",
            "position": "Web Developer",
            "start_date": "2016-01",
            "end_date": "2018-05",
            "description": [
                "Designed and developed 20+ client websites",
                "Implemented SEO strategies improving client rankings",
                "Created custom WordPress themes and plugins"
            ]
        }
    ],
    "education": [
        {
            "institution": "Stanford University",
            "degree": "M.S. Computer Science",
            "year": "2018"
        },
        {
            "institution": "UC Berkeley",
            "degree": "B.S. Computer Engineering",
            "year": "2016"
        }
    ],
    "projects": [
        {
            "name": "AI Chatbot",
            "description": "Built intelligent chatbot using Python and NLP libraries",
            "technologies": ["Python", "TensorFlow", "Flask"],
            "link": "https://github.com/johndev/ai-chatbot"
        },
        {
            "name": "E-Commerce Platform",
            "description": "Full-featured e-commerce platform with payment integration",
            "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
            "link": "https://github.com/johndev/ecommerce"
        }
    ],
    "certifications": [
        "AWS Certified Solutions Architect",
        "Google Professional Cloud Developer",
        "Certified Scrum Master"
    ]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/resume')
def get_resume():
    return jsonify(RESUME_DATA)

@app.route('/api/skills')
def get_skills():
    return jsonify(RESUME_DATA['skills'])

@app.route('/api/experience')
def get_experience():
    return jsonify(RESUME_DATA['experience'])

@app.route('/api/education')
def get_education():
    return jsonify(RESUME_DATA['education'])

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    # Here you would typically send an email or save to database
    print(f"Contact form submission: {data}")
    return jsonify({"status": "success", "message": "Message sent successfully!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
