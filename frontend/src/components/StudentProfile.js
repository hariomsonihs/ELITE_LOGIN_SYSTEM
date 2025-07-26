import React from 'react';
import { FiUser, FiMail, FiPhone, FiBook, FiClock, FiDollarSign, FiAlertCircle, FiAward } from 'react-icons/fi';

export default function StudentProfile({ user }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.institutionName}><FiAward /> ELITE COMPUTER CLASSES</h1>
        <h2 style={styles.profileTitle}>Student Profile</h2>
      </div>
      
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>{user.name.charAt(0)}</div>
          <h3 style={styles.studentName}>{user.name}</h3>
          <p style={styles.regNo}>{user.regNo}</p>
        </div>
        
        <div style={styles.profileDetails}>
          <div style={styles.detailCard}>
            <div style={styles.detailItem}>
              <FiMail style={styles.icon} />
              <div>
                <p style={styles.detailLabel}>Email</p>
                <p style={styles.detailValue}>{user.email || 'Not provided'}</p>
              </div>
            </div>
            
            <div style={styles.detailItem}>
              <FiPhone style={styles.icon} />
              <div>
                <p style={styles.detailLabel}>Mobile</p>
                <p style={styles.detailValue}>{user.mobNo || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div style={styles.detailCard}>
            <div style={styles.detailItem}>
              <FiBook style={styles.icon} />
              <div>
                <p style={styles.detailLabel}>Course</p>
                <p style={styles.detailValue}>{user.course || 'Not enrolled'}</p>
              </div>
            </div>
            
            <div style={styles.detailItem}>
              <FiClock style={styles.icon} />
              <div>
                <p style={styles.detailLabel}>Duration</p>
                <p style={styles.detailValue}>{user.duration || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div style={styles.feeCard}>
            <div style={styles.feeItem}>
              <FiDollarSign style={styles.icon} />
              <div>
                <p style={styles.detailLabel}>Batch</p>
                <p style={styles.detailValue}>₹{user.batch || 0}</p>
              </div>
            </div>
            
            <div style={styles.feeItem}>
              <FiDollarSign style={styles.icon} />
              <div>
                <p style={styles.detailLabel}>Total Fee</p>
                <p style={styles.detailValue}>₹{user.totalFee || 0}</p>
              </div>
            </div>
          </div>

          <div style={styles.feeCard}>
            <div style={styles.feeItem}>
              <FiAlertCircle style={{ ...styles.icon, color: user.pendingFee > 0 ? '#e74c3c' : '#27ae60' }} />
              <div>
                <p style={styles.detailLabel}>Pending Fee</p>
                <p style={{ 
                  ...styles.detailValue, 
                  color: user.pendingFee > 0 ? '#e74c3c' : '#27ae60',
                  fontWeight: '600'
                }}>
                  ₹{user.pendingFee || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    width: '100%',
    maxWidth: '800px'
  },
  institutionName: {
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  profileTitle: {
    color: '#3498db',
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-out'
  },
  profileHeader: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '30px',
    textAlign: 'center',
    position: 'relative'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#2980b9',
    color: 'white',
    fontSize: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
    fontWeight: '600'
  },
  studentName: {
    fontSize: '1.8rem',
    margin: '0 0 5px',
    fontWeight: '600'
  },
  regNo: {
    fontSize: '1rem',
    opacity: '0.9',
    margin: '0'
  },
  profileDetails: {
    padding: '25px',
    display: 'grid',
    gap: '20px'
  },
  detailCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  feeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  detailItem: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  feeItem: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  icon: {
    fontSize: '1.5rem',
    color: '#3498db',
    minWidth: '30px'
  },
  detailLabel: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    margin: '0 0 5px'
  },
  detailValue: {
    fontSize: '1.1rem',
    fontWeight: '500',
    margin: '0',
    color: '#2c3e50'
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
};

// Add global styles
document.head.insertAdjacentHTML(
  'beforeend',
  `<style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>`
);
