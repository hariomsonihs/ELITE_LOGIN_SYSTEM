import React, { useEffect, useState } from 'react';
import api from '../api';
import { FiSearch, FiUser, FiBook, FiDollarSign, FiPhone, FiMail, FiMapPin, FiCalendar, FiPrinter, FiEdit } from 'react-icons/fi';

export default function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get('/dashboard/students')
      .then(res => {
        setStudents(res.data);
        setFilteredStudents(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const results = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.institutionName}><FiUser /> Elite Computer Classes</h1>
        <h2 style={styles.dashboardTitle}>FACULTY DASHBOARD</h2>
      </header>

      {/* Main Content */}
      <main style={styles.content}>
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, reg no, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Students Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Reg No</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Pending Fee</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr 
                    key={student._id} 
                    style={styles.tr}
                    onClick={() => openStudentDetails(student)}
                  >
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.regNo}</td>
                    <td style={styles.td}>{student.course}</td>
                    <td style={{
                      ...styles.td,
                      color: student.pendingFee > 0 ? '#e74c3c' : '#27ae60',
                      fontWeight: '600'
                    }}>
                      ₹{student.pendingFee}
                    </td>
                    <td style={styles.td}>
                      <button style={styles.viewButton}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '20px' }}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Student Details Modal */}
      {isModalOpen && selectedStudent && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeModal}>×</button>
            <h3 style={styles.modalTitle}>Student Details</h3>
            
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiUser /> Name:</span>
                <span style={styles.infoValue}>{selectedStudent.name}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiBook /> Reg No:</span>
                <span style={styles.infoValue}>{selectedStudent.regNo}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiBook /> Course:</span>
                <span style={styles.infoValue}>{selectedStudent.course}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiDollarSign /> Pending Fee:</span>
                <span style={{
                  ...styles.infoValue,
                  color: selectedStudent.pendingFee > 0 ? '#e74c3c' : '#27ae60',
                  fontWeight: '600'
                }}>
                  ₹{selectedStudent.pendingFee}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiPhone /> Contact:</span>
                <span style={styles.infoValue}>{selectedStudent.mobNo || 'N/A'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiMail /> Email:</span>
                <span style={styles.infoValue}>{selectedStudent.email || 'N/A'}</span>
              </div>
              {/* <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiMapPin /> Address:</span>
                <span style={styles.infoValue}>{selectedStudent.address || 'N/A'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}><FiCalendar /> Join Date:</span>
                <span style={styles.infoValue}>{selectedStudent.joinDate || 'N/A'}</span>
              </div> */}
            </div>
            
            {/* <div style={styles.modalActions}>
              <button style={styles.printButton}>
                <FiPrinter /> Print Details
              </button>
              <button style={styles.editButton}>
                <FiEdit /> Update Fee
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #2c3e50'
  },
  institutionName: {
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  dashboardTitle: {
    color: '#3498db',
    fontSize: '1.5rem',
    fontWeight: '600',
    letterSpacing: '2px'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    padding: '20px'
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '20px',
    maxWidth: '500px'
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#7f8c8d'
  },
  searchInput: {
    width: '100%',
    padding: '12px 20px 12px 40px',
    border: '1px solid #ddd',
    borderRadius: '25px',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px',
    textAlign: 'left'
  },
  tr: {
    borderBottom: '1px solid #eee',
    transition: 'background 0.2s',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  td: {
    padding: '15px'
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#7f8c8d'
  },
  modalTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.5rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  infoItem: {
    marginBottom: '15px'
  },
  infoLabel: {
    display: 'block',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  infoValue: {
    display: 'block',
    padding: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '25px',
    gap: '15px'
  },
  printButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  editButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#27ae60'
    }
  }
};