import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AddJobForm() {
  const [positionName, setPositionName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsetRequired, setSkillsetRequired] = useState(["", ""]);
  const [payRange, setPayRange] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });

  const formRef = useRef(null);

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skillsetRequired];
    updatedSkills[index] = value;
    setSkillsetRequired(updatedSkills);
  };

  const addSkillField = () => {
    setSkillsetRequired([...skillsetRequired, ""]);
  };

  const handleAboutCompanyChange = (e) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setAboutCompany(text);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      positionName,
      companyName,
      aboutCompany,
      jobDescription,
      skillsetRequired,
      payRange,
      workMode,
      jobLocation,
    };
  
    axios
      .post("/api/jobs/add", formData)
      .then(() => {
        setPositionName("");
        setCompanyName("");
        setAboutCompany("");
        setJobDescription("");
        setSkillsetRequired(["", ""]);
        setPayRange("");
        setWorkMode("");
        setJobLocation("");
      })
      .catch((error) => alert(error.message));
  };

  const handleMouseMove = (e) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      setSpotlightPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      form.addEventListener('mousemove', handleMouseMove);
      return () => {
        form.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const styles = {
    addJobForm: {
      background: 'linear-gradient(135deg, #6a3cc7, #3a63cc)',
      padding: '2rem',
      borderRadius: '0.5rem',
      maxWidth: '40rem',
      margin: '2.5rem auto',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    },
    spotlight: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(200, 6, 230, 0.54) 0%, rgba(195, 18, 215, 0) 70%)',
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.01s, top 0.01s',
      left: spotlightPosition.x,
      top: spotlightPosition.y,
    },
    formTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      position: 'relative',
    },
    formGroup: {
      marginBottom: '1.5rem',
      transition: 'all 0.2s ease',
      position: 'relative',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      marginBottom: '0.25rem',
    },
    input: {
      width: '95%',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: '1px solid transparent',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#1a202c',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
    },
    textarea: {
      width: '95%',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: '1px solid transparent',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#1a202c',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      minHeight: '8rem',
      resize: 'vertical',
    },
    charCount: {
      fontSize: '0.75rem',
      color: '#e2e8f0',
    },
    addSkillBtn: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#6a3cc7',
      border: 'none',
      borderRadius: '0.375rem',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1rem',
    },
    submitBtn: {
      width: '95%',
      padding: '0.75rem 1rem',
      backgroundColor: 'rgba(9, 255, 0, 0.9)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative',
    },
  };

  return (
    <div style={styles.addJobForm} ref={formRef}>
      <div style={styles.spotlight}></div>
      <h2 style={styles.formTitle}>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="positionName">Position Name</label>
          <input
            style={styles.input}
            type="text"
            id="positionName"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="companyName">Company Name</label>
          <input
            style={styles.input}
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="aboutCompany">
            About Company <span style={styles.charCount}>({aboutCompany.length}/500 characters)</span>
          </label>
          <textarea
            style={styles.textarea}
            id="aboutCompany"
            value={aboutCompany}
            onChange={handleAboutCompanyChange}
            required
            maxLength={500}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="jobDescription">Job Description</label>
          <textarea
            style={styles.textarea}
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Skillset Required</label>
          {skillsetRequired.map((skill, index) => (
            <input
              key={index}
              style={styles.input}
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder={`Skill ${index + 1}`}
            />
          ))}
          <button type="button" onClick={addSkillField} style={styles.addSkillBtn}>
            + Add Skill
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="payRange">Pay Range</label>
          <input
            style={styles.input}
            type="text"
            id="payRange"
            value={payRange}
            onChange={(e) => setPayRange(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="workMode">Work Mode</label>
          <input
            style={styles.input}
            type="text"
            id="workMode"
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="jobLocation">Job Location</label>
          <input
            style={styles.input}
            type="text"
            id="jobLocation"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={styles.submitBtn}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default AddJobForm;

