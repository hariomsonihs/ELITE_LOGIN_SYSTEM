import React, { useState } from 'react';
import { FiMail, FiPhone, FiLock, FiArrowRight } from 'react-icons/fi';
import api from '../api';

export default function LoginForm({ onLogin }) {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post('https://ecc-backend-i44g.onrender.com/api/auth/login', {
        emailOrMobile,
        password
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      onLogin(res.data);
    } catch (err) {
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.5 + 0.2
  }));

  return (
    <div style={styles.container}>
      {/* Animated Gradient Background */}
      <div style={styles.gradientBg}></div>
      
      {/* Floating Particles */}
      <div style={styles.particles}>
        {particles.map((particle) => (
          <div 
            key={particle.id}
            style={{
              ...styles.particle,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: particle.opacity
            }}
          ></div>
        ))}
      </div>
      
      {/* Glass Morphism Card */}
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <img 
  src="https://elitecomputerclasses.com/logo.jpg" 
  alt="ELITE COMPUTER CLASSES Logo" 
  style={styles.logoImage}
/>
          </div>
          <h1 style={styles.institutionName}>ELITE COMPUTER CLASSES</h1>
          <h2 style={styles.dashboardTitle}>LOGIN PORTAL</h2>
        </div>
        
        {/* Login Form */}
        <form 
          onSubmit={handleLogin}
          style={{
            ...styles.form,
            animation: shake ? 'shake 0.5s' : 'fadeIn 0.8s ease'
          }}
        >
          {/* Email/Mobile Input */}
          <div 
            style={{
              ...styles.inputContainer,
              borderColor: activeInput === 'emailOrMobile' ? '#fff' : 'rgba(255,255,255,0.2)'
            }}
            onFocus={() => setActiveInput('emailOrMobile')}
            onBlur={() => setActiveInput(null)}
          >
            <div style={styles.inputIcon}>
              {emailOrMobile.includes('@') ? <FiMail size={20} /> : <FiPhone size={20} />}
            </div>
            <input 
              type="text" 
              placeholder="Email or Mobile" 
              value={emailOrMobile} 
              onChange={e => setEmailOrMobile(e.target.value)} 
              required 
              style={styles.input}
            />
            <div 
              style={{
                ...styles.inputUnderline,
                width: activeInput === 'emailOrMobile' ? '100%' : '0'
              }}
            ></div>
          </div>
          
          {/* Password Input */}
          <div 
            style={{
              ...styles.inputContainer,
              borderColor: activeInput === 'password' ? '#fff' : 'rgba(255,255,255,0.2)'
            }}
            onFocus={() => setActiveInput('password')}
            onBlur={() => setActiveInput(null)}
          >
            <div style={styles.inputIcon}>
              <FiLock size={20} />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
            <div 
              style={{
                ...styles.inputUnderline,
                width: activeInput === 'password' ? '100%' : '0'
              }}
            ></div>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonLoading : {}),
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={styles.buttonContent}>
                <span>Authenticating</span>
                <div style={styles.loader}></div>
              </div>
            ) : (
              <div style={styles.buttonContent}>
                <span>Login</span>
                <FiArrowRight style={styles.arrowIcon} />
              </div>
            )}
          </button>
        </form>
      </div>
      
      {/* Footer */}
      <div style={styles.footer}>
        <a 
          href="mailto:codevoraofficial@gmail.com" 
          style={styles.footerLink}
          target="_blank" 
          rel="noopener noreferrer"
        >
          DESIGN & DEVELOPED BY: CODEVORA
        </a>
      </div>
      
      {/* Global styles */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
    color: '#fff',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    zIndex: 0,
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '20px',
    boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    position: 'relative',
  },
  logo: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255,255,255,0.2)',
  },
  logoImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.2)',
    padding: '5px',
    backgroundColor: 'rgba(255,255,255,0.1)'
  }
  logoIcon: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #fff, #aaa)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  institutionName: {
    color: 'white',
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: '0',
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    letterSpacing: '1px',
    lineHeight: '1.3',
  },
  dashboardTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '1rem',
    fontWeight: '400',
    margin: '10px 0 0',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '30px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
  },
  inputIcon: {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.7)',
    transition: 'all 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '15px 0 15px 30px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  },
  inputUnderline: {
    position: 'absolute',
    bottom: '-1px',
    left: '0',
    width: '0',
    height: '2px',
    backgroundColor: 'white',
    transition: 'width 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  buttonLoading: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    position: 'relative',
    zIndex: 1,
  },
  arrowIcon: {
    transition: 'transform 0.3s ease',
  },
  buttonHover: {
    transform: 'translateX(5px)',
  },
  loader: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderTop: '3px solid #333',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
    animation: 'float 6s infinite ease-in-out',
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    left: '0',
    width: '100%',
    textAlign: 'center',
    zIndex: 2,
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.8rem',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    letterSpacing: '1px',
    ':hover': {
      color: 'white',
      textDecoration: 'underline',
    },
  },
};
