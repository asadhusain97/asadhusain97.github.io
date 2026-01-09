/**
 * Loader.js
 * Fetches content from data/content.json and renders it to the page.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Determine the base path for assets (images) and data
    // If we are in a subfolder (e.g., pages/), we need to go up one level
    const isPagesDir = window.location.pathname.includes('/pages/');
    const isProjectsDir = window.location.pathname.includes('/projects/') && !window.location.pathname.endsWith('projects.html');

    // Actually, projects.html is in root. Detail pages are in projects/.
    // Check if we are in a subdirectory
    const pathSegments = window.location.pathname.split('/').filter(p => p.length > 0);
    // Simple heuristic: if we are deeper than root, prepend "../"
    // Note: This might need adjustment based on exact deployment, but for now assuming standard structure
    // standard: /index.html (depth ~1 or 0 depending on host), /pages/work.html (depth +1)

    let basePath = '';
    if (isPagesDir || (isProjectsDir && !window.location.pathname.endsWith('projects.html'))) {
        basePath = '../';
    }

    const dataUrl = basePath + 'data/content.json';

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            renderProjects(data.projects, basePath);
            renderEducation(data.education, basePath);
            renderWork(data.work, data.internships, basePath);
            renderInterests(data.interests, basePath);
            renderCertifications(data.certifications, basePath);
        })
        .catch(error => console.error('Error loading content:', error));
});

function renderProjects(projects, basePath) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const limit = container.dataset.limit ? parseInt(container.dataset.limit) : projects.length;
    let html = '';

    projects.slice(0, limit).forEach(project => {
        html += `
            <div class="project-entry">
                <a href="${basePath}${project.link}">
                    <img class="project-image" src="${basePath}${project.image}" alt="${project.alt}">
                </a>
                <a class="project-link" href="${basePath}${project.link}">
                    <b>${project.title}</b>
                </a>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderEducation(educationList, basePath) {
    const container = document.getElementById('education-container');
    if (!container) return;

    const limit = container.dataset.limit ? parseInt(container.dataset.limit) : educationList.length;
    let html = '';

    educationList.slice(0, limit).forEach(edu => {
        html += `
            <div class="education-entry">
                <a href="${edu.school_url}" target="_blank">
                    <img src="${basePath}${edu.image}" alt="School picture">
                </a>
                <div class="education-details">
                    <p>
                        <a href="${edu.school_url}" target="_blank"><b>${edu.school}</b></a>
                        <i>(${edu.period})</i>
                    </p>
                    <p>${edu.description}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderWork(workList, internshipsList, basePath) {
    const container = document.getElementById('work-container');
    if (!container) return;

    const limit = container.dataset.limit ? parseInt(container.dataset.limit) : null;
    let html = '';

    // If limit is set (e.g. home page), just show top work entries
    const items = limit ? workList.slice(0, limit) : workList;

    items.forEach(job => {
        html += createWorkEntryHtml(job, basePath);
    });

    // If no limit (full page), also show internships header and items
    if (!limit && internshipsList && internshipsList.length > 0) {
        html += `<h2>Internships</h2>`;
        internshipsList.forEach(job => {
            html += createWorkEntryHtml(job, basePath);
        });
    }

    container.innerHTML = html;
}

function createWorkEntryHtml(job, basePath) {
    const tasksHtml = job.tasks.map(task => `<li>${task}</li>`).join('');
    return `
        <div class="work-entry">
            <a href="${job.company_url}" target="_blank">
                <img src="${basePath}${job.image}" alt="Company Logo">
            </a>
            <div class="work-details">
                <a href="${job.company_url}" target="_blank">
                    <h3>${job.company}</h3>
                </a>
                <p><strong>${job.role}</strong> | ${job.period}</p>
                <ul>${tasksHtml}</ul>
            </div>
        </div>
    `;
}

function renderInterests(interests, basePath) {
    const container = document.getElementById('interests-container');
    if (!container) return;

    const limit = container.dataset.limit ? parseInt(container.dataset.limit) : interests.length;
    let html = '';

    interests.slice(0, limit).forEach(interest => {
        html += `
            <div class="interest-entry">
                <img src="${basePath}${interest.image}" alt="${interest.alt}">
                <p>${interest.description}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderCertifications(certList, basePath) {
    const container = document.getElementById('certifications-container');
    if (!container || !certList) return;

    let html = '';

    certList.forEach(cert => {
        const titleText = cert.institution ? `<b>${cert.title}</b> - ${cert.institution}` : `<b>${cert.title}</b>`;
        html += `
            <div class="certification-entry">
                <a href="${cert.link}" target="_blank">
                    <img src="${basePath}${cert.image}" alt="${cert.alt}">
                </a>
                <div class="certification-details">
                    <p>
                        <a href="${cert.link}" target="_blank">
                            ${titleText}
                        </a>
                    </p>
                    <p><i>Issued: ${cert.issued}</i></p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
