'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import resumeData from '../resume.json';

export default function AcademicCV() {
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'research-interests', 'education', 'research-experiences', 
        'publications', 'teaching-experiences', 'skills', 
        'language-skills', 'references'
      ];
      
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const navItems = [
    { id: 'research-interests', label: 'Research Interests' },
    { id: 'education', label: 'Education' },
    { id: 'research-experiences', label: 'Research Experiences' },
    { id: 'publications', label: 'Publications' },
    { id: 'teaching-experiences', label: 'Teaching' },
    { id: 'skills', label: 'Skills' },
    { id: 'language-skills', label: 'Languages' },
    // { id: 'references', label: 'References' }
  ];

  return (
    <div>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-header-content">
          <div className="mobile-name">{resumeData.personalInfo.name}</div>
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Ribbon Navigation */}
      <div className={`ribbon-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-buttons">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-button ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </button>
          ))}
          {/* Dark Mode Toggle Button */}
          <button 
            className="nav-button dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="cv-container">
        {/* Personal Information */}
        <div className="personal-info">
          <div className="name">{resumeData.personalInfo.name}</div>
          <div className="contact-info">
            <span className="contact-label">Address:</span> {resumeData.personalInfo.address}
          </div>
          <div className="contact-info">
            <span className="contact-label">Phone Num.:</span>{' '}
            <a href={`tel:${resumeData.personalInfo.phone[0].replace(/\s+/g, '')}`} className="contact-link">
              {resumeData.personalInfo.phone[0]}
            </a>
            {',    '}
            <a href={`tel:${resumeData.personalInfo.phone[1].replace(/\s+/g, '')}`} className="contact-link">
              {resumeData.personalInfo.phone[1]}
            </a>
          </div>
          <div className="contact-info">
            <span className="contact-label">Email:</span>{' '}
            <a href={`mailto:${resumeData.personalInfo.email[1]}`} className="contact-link">
              {resumeData.personalInfo.email[1]}
            </a>
            {',    '}
            <a href={`mailto:${resumeData.personalInfo.email[0]}`} className="contact-link">
              {resumeData.personalInfo.email[0]}
            </a>
          </div>
          <div className="contact-info">
            <span className="contact-label">Google Scholar:</span>{' '}
            <a href={resumeData.personalInfo.scholar[1]} target="_blank" rel="noopener noreferrer" className="contact-link">
              {resumeData.personalInfo.scholar[0]}
            </a>
          </div>
          <div className="contact-info">
            <span className="contact-label">Skype ID:</span>{' '}
            <a href={`skype:${resumeData.personalInfo.skype}?chat`} className="contact-link">
              {resumeData.personalInfo.skype}
            </a>
          </div>
          <div className="contact-info">
            <span className="contact-label">Telegeram:</span>{' '}
            <a href={resumeData.personalInfo.telegeram} className="contact-link">
              {resumeData.personalInfo.telegeram}
            </a>
          </div>
        </div>

        {/* Research Interests */}
        <div id="research-interests" className="section">
          <div className="section-title">Research Interests:</div>
          <ul className="research-interests">
            {resumeData.researchInterests.map((interest, index) => (
              <li key={index}> {interest}</li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div id="education" className="section">
          <div className="section-title">Education:</div>
          <ul className="education-Section">
            <li className="education-item">
               {resumeData.education[0].degree}, {resumeData.education[0].institution} ({resumeData.education[0].duration})
              <ul>
                <li> <b>Dissertation:</b> {resumeData.education[0].dissertation}</li>
                <li> <b>Supervisor:</b> {resumeData.education[0].supervisor}</li>
              </ul>
            </li>
            <li className="education-item">
               {resumeData.education[1].degree}, {resumeData.education[1].institution} ({resumeData.education[1].duration})
              <ul>
                <li> <b>Thesis:</b> {resumeData.education[1].dissertation}</li>
                <li> <b>Supervisor:</b> {resumeData.education[1].supervisor}</li>
              </ul>
            </li>
            <li className="education-item">
               {resumeData.education[2].degree}, {resumeData.education[2].institution} ({resumeData.education[2].duration})
              <ul>
                <li> <b>Thesis:</b> {resumeData.education[2].dissertation}</li>
                <li> <b>Supervisor:</b> {resumeData.education[2].supervisor}</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Research Experiences */}
        <div id="research-experiences" className="section">
          <div className="section-title">Research Experiences:</div>
          <ul className="experience-Section">
            {resumeData.researchExperiences.map((experience, index) => (
              <li key={index} className="experience-item"> {experience}</li>
            ))}
          </ul>
        </div>

        {/* Publications */}
        <div id="publications" className="section">
          <div className="section-title">Publications:</div>
          <div className="publication-Section">
            <h4> Journal papers:</h4>
            <ul className="bullet-list">
              {resumeData.publications.journalPapers.map((paper, index) => (
                <li key={index} className="publication-item">
                   {paper.authors}. &quot;{paper.title}&quot;. {paper.journal} {paper.volume} ({paper.year}). 
                  {paper.doi ? ` DOI: ${paper.doi}` : ''}{paper.status ? ` ${paper.status}.` : '.'}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="publication-Section">
            <h4> Conference papers:</h4>
            <ul className="bullet-list">
              {resumeData.publications.conferencePapers.map((paper, index) => (
                <li key={index} className="publication-item">
                   {paper.authors}, {paper.title}, {paper.conference}, {paper.location}, {paper.year} ({paper.language}).
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Teaching Experiences */}
        <div id="teaching-experiences" className="section">
          <div className="section-title">Teaching Experiences</div>
          <ul className="teaching-Section">
            {resumeData.teachingExperiences.map((teaching, index) => (
              <li key={index} className="teaching-item">
                 {teaching.role}: &quot;{teaching.course}&quot;,  {teaching.institution}  Lecturer: {teaching.lecturer}  {teaching.level}  {teaching.period}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills and Expertise */}
        <div id="skills" className="section">
          <div className="section-title">Skills and Expertise:</div>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Expert:</h4>
              <ul>
                {resumeData.skills.expert.map((skill, index) => (
                  <li key={index}> {skill}</li>
                ))}
              </ul>
            </div>
            <div className="skill-category">
              <h4>Skilled:</h4>
              <ul>
                {resumeData.skills.skilled.map((skill, index) => (
                  <li key={index}> {skill}</li>
                ))}
              </ul>
            </div>
            <div className="skill-category">
              <h4>Experienced:</h4>
              <ul>
                {resumeData.skills.experienced.map((skill, index) => (
                  <li key={index}> {skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Language Skills */}
        <div id="language-skills" className="section">
          <div className="section-title">Language Skill:</div>
          <ul className="bullet-list">
            <li> English: {resumeData.languageSkills.English}</li>
            <li> Persian: {resumeData.languageSkills.Persian}</li>
          </ul>
        </div>      
      </div>
    </div>
  );
}