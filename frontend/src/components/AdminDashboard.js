import React, { useEffect, useState } from 'react';
import api from '../api';
import { 
  FiUser, FiUserPlus, FiEdit2, FiTrash2, FiBook, FiBookOpen, 
  FiDollarSign, FiClock, FiMail, FiPhone, FiUsers, FiAward,
  FiPlusCircle, FiX, FiSave, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { FaChalkboardTeacher, FaUserGraduate, FaUserShield } from 'react-icons/fa';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({});
  const [formType, setFormType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, facultiesRes] = await Promise.all([
        api.get('/dashboard/students'),
        api.get('/dashboard/faculties')
      ]);
      setStudents(studentsRes.data);
      setFaculties(facultiesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formType === 'student') {
        editMode 
          ? await api.put(`/dashboard/student/${formData._id}`, formData)
          : await api.post('/dashboard/student', formData);
      } else {
        editMode 
          ? await api.put(`/dashboard/faculty/${formData._id}`, formData)
          : await api.post('/dashboard/faculty', formData);
      }
      setFormData({});
      setFormType('');
      setEditMode(false);
      await fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data, type) => {
    setFormData(data);
    setFormType(type);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      setLoading(true);
      try {
        await api.delete(`/dashboard/${type}/${id}`);
        await fetchData();
      } catch (error) {
        console.error("Error deleting:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaculties = faculties.filter(faculty => 
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1><FiAward /> Elite Computer Classes</h1>
        <h2><FaUserShield /> Admin Dashboard</h2>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Search and Add Buttons */}
        <div className="action-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiUser className="search-icon" />
          </div>
          
          <div className="button-group">
            <button 
              className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <FaUserGraduate /> Students
            </button>
            <button 
              className={`tab-button ${activeTab === 'faculties' ? 'active' : ''}`}
              onClick={() => setActiveTab('faculties')}
            >
              <FaChalkboardTeacher /> Faculty
            </button>
          </div>

          <div className="add-buttons">
            <button 
              onClick={() => { 
                setFormType('student'); 
                setFormData({}); 
                setEditMode(false); 
              }}
              className="add-button"
            >
              <FiUserPlus /> Add Student
            </button>
            <button 
              onClick={() => { 
                setFormType('faculty'); 
                setFormData({}); 
                setEditMode(false); 
              }}
              className="add-button"
            >
              <FiUsers /> Add Faculty
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {formType && (
          <div className="form-container slide-in">
            <div className="form-header">
              <h3>
                {editMode ? <FiEdit2 /> : <FiPlusCircle />} 
                {editMode ? 'Edit' : 'Add'} {formType}
              </h3>
              <button onClick={() => setFormType('')} className="close-button">
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label><FiUser /> Name</label>
                <input 
                  placeholder="Full Name" 
                  value={formData.name || ''} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label><FiMail /> Email</label>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email || ''} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label><FiCheckCircle /> Password</label>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={formData.password || ''} 
                  onChange={e => setFormData({ ...formData, password: e.target.value })} 
                  required={!editMode}
                />
              </div>

              {formType === 'student' && (
                <>
                  <div className="form-group">
                    <label><FiBook /> Registration No</label>
                    <input 
                      placeholder="Registration Number" 
                      value={formData.regNo || ''} 
                      onChange={e => setFormData({ ...formData, regNo: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label><FiPhone /> Mobile</label>
                    <input 
                      type="tel" 
                      placeholder="Mobile Number" 
                      value={formData.mobNo || ''} 
                      onChange={e => setFormData({ ...formData, mobNo: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label><FiBookOpen /> Course</label>
                    <input 
                      placeholder="Course Name" 
                      value={formData.course || ''} 
                      onChange={e => setFormData({ ...formData, course: e.target.value })} 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label><FiDollarSign /> Total Fee</label>
                      <input 
                        type="number" 
                        placeholder="Total Fee" 
                        value={formData.totalFee || ''} 
                        onChange={e => setFormData({ ...formData, totalFee: e.target.value })} 
                      />
                    </div>

                    <div className="form-group">
                      <label><FiAlertCircle /> Pending Fee</label>
                      <input 
                        type="number" 
                        placeholder="Pending Fee" 
                        value={formData.pendingFee || ''} 
                        onChange={e => setFormData({ ...formData, pendingFee: e.target.value })} 
                      />
                    </div>

                    <div className="form-group">
                      <label><FiClock /> Duration</label>
                      <input 
                        placeholder="Course Duration" 
                        value={formData.duration || ''} 
                        onChange={e => setFormData({ ...formData, duration: e.target.value })} 
                      />
                    </div>
                  </div>
                </>
              )}

              {formType === 'faculty' && (
                <>
                  <div className="form-group">
                    <label><FiBookOpen /> Department</label>
                    <input 
                      placeholder="Department" 
                      value={formData.department || ''} 
                      onChange={e => setFormData({ ...formData, department: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label><FiAward /> Role</label>
                    <select 
                      value={formData.role || 'faculty'} 
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="form-checkbox">
                    <input 
                      type="checkbox" 
                      id="isAdmin" 
                      checked={formData.isAdmin || false} 
                      onChange={e => setFormData({ ...formData, isAdmin: e.target.checked })} 
                    />
                    <label htmlFor="isAdmin">Admin Privileges</label>
                  </div>
                </>
              )}

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    {editMode ? <FiSave /> : <FiPlusCircle />} 
                    {editMode ? 'Update' : 'Add'} {formType}
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Data Tables */}
        {!formType && (
          <div className="data-tables">
            {activeTab === 'students' ? (
              <div className="table-container">
                <h3><FaUserGraduate /> Student Records ({filteredStudents.length})</h3>
                {loading ? (
                  <div className="loading-indicator">Loading...</div>
                ) : filteredStudents.length > 0 ? (
                  <table className="data-table">
                    <thead>
  <tr>
    <th>Name</th>
    <th>Reg No</th>
    <th>Mobile No</th>
    <th>Email</th>
    <th>Duration</th>
    <th>Password</th>
    <th>Course</th>
    <th>Pending Fee</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {filteredStudents.map(student => (
    <tr key={student._id}>
      <td>{student.name}</td>
      <td>{student.regNo}</td>
      <td>{student.mobNo || '-'}</td>
      <td>{student.email || '-'}</td>
      <td>{student.duration || '-'}</td>
      <td>{student.password}</td>
      <td>{student.course || '-'}</td>
      <td className={student.pendingFee > 0 ? 'pending' : 'paid'}>
        ₹{student.pendingFee || 0}
      </td>
                          <td className="actions">
                            <button 
                              onClick={() => handleEdit(student, 'student')} 
                              className="edit-button"
                            >
                              <FiEdit2 />
                            </button>
                            <button 
                              onClick={() => handleDelete(student._id, 'student')} 
                              className="delete-button"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-data">No student records found</div>
                )}
              </div>
            ) : (
              <div className="table-container">
                <h3><FaChalkboardTeacher /> Faculty Records ({filteredFaculties.length})</h3>
                {loading ? (
                  <div className="loading-indicator">Loading...</div>
                ) : filteredFaculties.length > 0 ? (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFaculties.map(faculty => (
                        <tr key={faculty._id}>
                          <td>{faculty.name}</td>
                          <td>{faculty.email}</td>
                          <td>{faculty.password}</td>
                          <td>{faculty.department || '-'}</td>
                          <td className={faculty.isAdmin ? 'admin' : 'faculty'}>
                            {faculty.isAdmin ? 'Admin' : 'Faculty'}
                          </td>
                          <td className="actions">
                            <button 
                              onClick={() => handleEdit(faculty, 'faculty')} 
                              className="edit-button"
                            >
                              <FiEdit2 />
                            </button>
                            <button 
                              onClick={() => handleDelete(faculty._id, 'faculty')} 
                              className="delete-button"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-data">No faculty records found</div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* CSS Styles */}
      <style jsx>{`
        .admin-dashboard {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #2c3e50;
        }

        .dashboard-header h1 {
          color: #2c3e50;
          font-size: 2.2rem;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .dashboard-header h2 {
          color: #e74c3c;
          font-size: 1.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .action-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-container input {
          width: 100%;
          padding: 10px 15px 10px 35px;
          border: 1px solid #ddd;
          border-radius: 25px;
          font-size: 14px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #7f8c8d;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .tab-button {
          padding: 8px 15px;
          border: none;
          border-radius: 20px;
          background: #ecf0f1;
          color: #2c3e50;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s;
        }

        .tab-button.active {
          background: #3498db;
          color: white;
        }

        .add-buttons {
          display: flex;
          gap: 10px;
        }

        .add-button {
          padding: 8px 15px;
          border: none;
          border-radius: 20px;
          background: #2ecc71;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s;
        }

        .add-button:hover {
          background: #27ae60;
        }

        .form-container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          overflow: hidden;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #2c3e50;
          color: white;
        }

        .form-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px;
        }

        .admin-form {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .form-row {
          display: flex;
          gap: 15px;
        }

        .form-row .form-group {
          flex: 1;
        }

        .form-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 15px 0;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.3s;
        }

        .submit-button:hover {
          background: #2980b9;
        }

        .submit-button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .data-tables {
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .table-container {
          padding: 20px;
        }

        .table-container h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: #2c3e50;
          color: white;
          padding: 12px;
          text-align: left;
        }

        .data-table td {
          padding: 12px;
          border-bottom: 1px solid #ecf0f1;
        }

        .data-table tr:hover {
          background: #f8f9fa;
        }

        .pending {
          color: #e74c3c;
          font-weight: 500;
        }

        .paid {
          color: #27ae60;
          font-weight: 500;
        }

        .admin {
          color: #9b59b6;
          font-weight: 500;
        }

        .faculty {
          color: #3498db;
          font-weight: 500;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .edit-button {
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .delete-button {
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .loading-indicator,
        .no-data {
          text-align: center;
          padding: 30px;
          color: #7f8c8d;
        }

        @media (max-width: 768px) {
          .action-bar {
            flex-direction: column;
            align-items: stretch;
          }
          
          .button-group,
          .add-buttons {
            width: 100%;
          }
          
          .tab-button,
          .add-button {
            flex: 1;
            justify-content: center;
          }
          
          .form-row {
            flex-direction: column;
            gap: 15px;
          }
          
          .data-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}