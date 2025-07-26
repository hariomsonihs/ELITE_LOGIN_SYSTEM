import React, { useState } from 'react';
import api from '../api';

export default function LoginForm({ onLogin }) {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.institutionName}>ELITE COMPUTER CLASSES</h1>
        <h2 style={styles.dashboardTitle}>LOGIN DASHBOARD</h2>
      </div>
      
      <form 
        onSubmit={handleLogin}
        style={{
          ...styles.form,
          animation: 'fadeIn 0.8s ease',
          transform: shake ? 'translateX(5px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div style={styles.inputContainer}>
          <input 
            type="text" 
            placeholder="Email or Mobile" 
            value={emailOrMobile} 
            onChange={e => setEmailOrMobile(e.target.value)} 
            required 
            style={styles.input}
          />
          <div style={styles.inputUnderline}></div>
        </div>
        
        <div style={styles.inputContainer}>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={styles.input}
          />
          <div style={styles.inputUnderline}></div>
        </div>
        
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
            <span style={styles.buttonText}>Login</span>
          )}
        </button>
      </form>
      
      {/* Particles background effect */}
      <div style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={styles.particle}></div>
        ))}
      </div>
      
      {/* Global styles */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
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
    background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    zIndex: 2,
  },
  institutionName: {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
    letterSpacing: '1px',
  },
  dashboardTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '1.5rem',
    fontWeight: '400',
    margin: '10px 0 0',
    letterSpacing: '3px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 2,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '15px 0',
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    outline: 'none',
  },
  inputUnderline: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '0',
    height: '2px',
    backgroundColor: 'white',
    transition: 'width 0.3s ease',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '15px 0',
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    outline: 'none',
  },
  inputUnderline: {
    position: 'absolute',
    bottom: '0',
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
    color: '#1a2a6c',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    overflow: 'hidden',
    position: 'relative',
  },
  buttonLoading: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  buttonText: {
    position: 'relative',
    zIndex: 1,
  },
  loader: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(26, 42, 108, 0.2)',
    borderTop: '3px solid #1a2a6c',
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
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
    animation: 'float 6s infinite ease-in-out, pulse 3s infinite ease-in-out',
  },
};

// Generate random particles
for (let i = 0; i < 20; i++) {
  styles.particle = {
    ...styles.particle,
    [`&:nth-child(${i + 1})`]: {
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    },
  };
}
