import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import StudentProfile from './components/StudentProfile';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <div>
      <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '1rem',
  padding: '10px 20px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ddd'
}}>
  <span style={{
    fontSize: '16px',
    fontWeight: '500',
    color: '#333'
  }}>
    👋 Welcome, <span style={{ color: '#007BFF' }}>{user.data.name}</span>
  </span>

  <button
    onClick={handleLogout}
    style={{
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
    onMouseOut={e => e.currentTarget.style.backgroundColor = '#007BFF'}
  >
    Logout
  </button>
</div>


      {/* ✅ Show dashboard/profile based on role */}
      {user.role === 'student' && <StudentProfile user={user.data} />}
      {user.role === 'faculty' && <FacultyDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </div>
  );
}

export default App;
