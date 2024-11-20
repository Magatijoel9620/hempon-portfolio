// Get the toggle button and icon
const darkModeToggle = document.getElementById("dark-mode-toggle");
const darkModeIcon = document.getElementById("dark-mode-icon");

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add("dark-mode");
  darkModeIcon.textContent = "🌞"; // Set icon to sun for light mode
  localStorage.setItem("dark-mode", "enabled");
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  darkModeIcon.textContent = "🌙"; // Set icon to moon for dark mode
  localStorage.setItem("dark-mode", "disabled");
}

// Load the saved mode from localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
  enableDarkMode();
} else {
  disableDarkMode();
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let position = 0;
const slideWidth = document.querySelector(".skill-category").offsetWidth + 16; // 16px gap or margin

// Event listener for the previous button
prevBtn.addEventListener("click", () => {
  // Move back to the previous item
  position += slideWidth;

  // If we go past the beginning, reset to the end
  if (position > 0) {
    position = -(track.children.length - 1) * slideWidth;
  }

  // Apply the transformation
  track.style.transform = `translateX(${position}px)`;
});

// Event listener for the next button
nextBtn.addEventListener("click", () => {
  // Move to the next item
  position -= slideWidth;

  // If we go past the last item, reset to the beginning
  if (Math.abs(position) >= track.children.length * slideWidth) {
    position = 0;
  }

  // Apply the transformation
  track.style.transform = `translateX(${position}px)`;
});

async function fetchExperience() {
  const res = await fetch("/api/experience");
  const data = await res.json();
  renderExperience(data);
}

function renderExperience(experiences) {
  const experienceSection = document.getElementById("experience");
  experienceSection.innerHTML = experiences
    .map(
      (exp) => `
    <div class="timeline-item">
      <span class="year">${exp.year}</span>
      <div class="experience-content">
        <h3>${exp.role} at ${exp.company}</h3>
        <span class="dates">${exp.dates}</span>
        <ul>${exp.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
      </div>
    </div>
  `
    )
    .join("");
}

async function fetchProjects() {
  const res = await fetch("/api/projects");
  const data = await res.json();
  renderProjects(data);
}

function renderProjects(projects) {
  const projectsSection = document.getElementById("projects");
  projectsSection.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card">
      <img src="${project.image}" alt="${project.title}" />
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  fetchExperience();
  fetchProjects();
});
const elements = document.querySelectorAll('.animated');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

elements.forEach(element => {
    observer.observe(element);
});
