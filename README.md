# Personal Website

This is the repository for my [personal website](https://asadhusain97.github.io). It's a simple, static website built with HTML and CSS. No fancy frameworks, just good old-fashioned web development.

## File Structure

The website is organized into the following directories:

- `css/`: Contains the stylesheets for the website.
- `projects/`: Contains the individual project pages.
- `pages/`: Contains the other pages of the website, such as `education.html` and `interests.html`.
- `images/`: Contains all the images used on the website.

The main entry point for the website is `index.html`.

## Updating the Website

### Adding a New Project

To add a new project, you'll need to do two things:

1. Create a new HTML file in the `projects/` directory. You can use one of the existing project files a template.
2. Add a new project entry in `projects.html`. Copy one of the existing `project-entry` divs and update the `href` for the link and the `src` for the image.

### Adding New Work Experience

To add a new work experience, you'll need to edit `pages/work.html`. Add a new `work-entry` div and fill in the details of the company, your role, and your responsibilities.

## Using this as a Template

If you want to use this repo as a template for your own website, here are the things you'll want to change:

- **`index.html`**: This is the home page of the website and has the About me section.
- **`left-panel.html`**: This contains the photo, name, and social media links. You'll want to update these to point to your own face, name and profiles.
- **`projects/`, `pages/`, `images/`**: You'll want to replace the existing pages with your own content and images. Make sure you change the names and references everywhere.
- **`css/`**: You can change the colors and fonts in here to match your personal style. It is divided into multiple files to be easier to manage.
