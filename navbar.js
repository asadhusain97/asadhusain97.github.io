document.addEventListener('DOMContentLoaded', function () {
    const navHtml = `
        <ul>
            <li><a href="index.html">About</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="education.html">Education</a></li>
            <li><a href="interests.html">Interests</a></li>
        </ul>
    `;
    document.querySelector('nav').innerHTML = navHtml;
});

