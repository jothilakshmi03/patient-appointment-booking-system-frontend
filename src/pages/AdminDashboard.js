import React, { useEffect, useState } from 'react';
import { getAllAppointments, confirmAppointment, cancelAppointment, addDoctor, deleteDoctor, getDoctors } from '../services/api';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', experience: '', availableDays: '' });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = () => {
    getAllAppointments().then(res => setAppointments(res.data));
  };

  const fetchDoctors = () => {
    getDoctors().then(res => setDoctors(res.data));
  };

  const handleConfirm = async (id) => {
    await confirmAppointment(id);
    alert('Appointment confirmed!');
    fetchAppointments();
  };

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    alert('Appointment cancelled!');
    fetchAppointments();
  };

  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialization) {
      alert('Please fill name and specialization!');
      return;
    }
    await addDoctor(newDoctor);
    alert('Doctor added successfully!');
    setNewDoctor({ name: '', specialization: '', experience: '', availableDays: '' });
    fetchDoctors();
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await deleteDoctor(id);
      alert('Doctor deleted!');
      fetchDoctors();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🏥 Hospital Admin Dashboard</h1>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <h2 style={styles.statNum}>{appointments.length}</h2>
          <p style={styles.statLabel}>Total Appointments</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNum}>{appointments.filter(a => a.status === 'PENDING').length}</h2>
          <p style={styles.statLabel}>Pending</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNum}>{appointments.filter(a => a.status === 'CONFIRMED').length}</h2>
          <p style={styles.statLabel}>Confirmed</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNum}>{doctors.length}</h2>
          <p style={styles.statLabel}>Total Doctors</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === 'appointments' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('appointments')}>
          📋 Appointments
        </button>
        <button
          style={activeTab === 'doctors' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('doctors')}>
          👨‍⚕️ Manage Doctors
        </button>
      </div>

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div>
          <h3 style={styles.sectionTitle}>All Appointments</h3>
          {appointments.length === 0 ? (
            <p style={styles.empty}>No appointments found</p>
          ) : (
            appointments.map(apt => (
              <div key={apt.id} style={styles.card}>
                <div style={styles.cardRow}>
                  <div>
                    <p style={styles.cardText}>👤 Patient: <strong>{apt.patient?.name}</strong></p>
                    <p style={styles.cardText}>👨‍⚕️ Doctor: <strong>{apt.doctor?.name}</strong></p>
                    <p style={styles.cardText}>🏥 Specialization: {apt.doctor?.specialization}</p>
                    <p style={styles.cardText}>📅 Date: {apt.appointmentDate}</p>
                    <p style={styles.cardText}>🕐 Time: {apt.appointmentTime}</p>
                    <p style={styles.cardText}>
                      Status: <span style={{
                        color: apt.status === 'PENDING' ? 'orange' : apt.status === 'CONFIRMED' ? 'green' : 'red',
                        fontWeight: 'bold'
                      }}>{apt.status}</span>
                    </p>
                  </div>
                  <div style={styles.actionButtons}>
                    {apt.status === 'PENDING' && (
                      <button style={styles.btnConfirm} onClick={() => handleConfirm(apt.id)}>
                        ✅ Confirm
                      </button>
                    )}
                    {apt.status !== 'CANCELLED' && (
                      <button style={styles.btnCancel} onClick={() => handleCancel(apt.id)}>
                        ❌ Cancel
                      </button>
                    )}
                    {apt.status === 'CONFIRMED' && (
                      <span style={styles.confirmedBadge}>✅ Confirmed</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <div>
          {/* Add Doctor Form */}
          <div style={styles.addDoctorCard}>
            <h3 style={styles.sectionTitle}>➕ Add New Doctor</h3>
            <div style={styles.formRow}>
              <input style={styles.input} placeholder="Doctor Name" value={newDoctor.name}
                onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} />
              <input style={styles.input} placeholder="Specialization" value={newDoctor.specialization}
                onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})} />
              <input style={styles.input} placeholder="Experience (years)" value={newDoctor.experience}
                onChange={e => setNewDoctor({...newDoctor, experience: e.target.value})} />
              <input style={styles.input} placeholder="Available Days (e.g. Mon,Wed,Fri)" value={newDoctor.availableDays}
                onChange={e => setNewDoctor({...newDoctor, availableDays: e.target.value})} />
              <button style={styles.btnAdd} onClick={handleAddDoctor}>Add Doctor</button>
            </div>
          </div>

          {/* Doctors List */}
          <h3 style={styles.sectionTitle}>All Doctors</h3>
          <div style={styles.doctorsGrid}>
            {doctors.map(doc => (
              <div key={doc.id} style={styles.doctorCard}>
                <h3 style={styles.doctorName}>{doc.name}</h3>
                <p style={styles.doctorSpec}>🏥 {doc.specialization}</p>
                <p style={styles.doctorExp}>⭐ {doc.experience} years</p>
                <p style={styles.doctorDays}>📅 {doc.availableDays}</p>
                <button style={styles.btnDelete} onClick={() => handleDeleteDoctor(doc.id)}>
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', padding: '0' },
  header: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px 30px' },
  headerTitle: { color: 'white', margin: 0, fontSize: '1.8rem' },
  statsRow: { display: 'flex', gap: '20px', padding: '20px 30px', flexWrap: 'wrap' },
  statCard: { background: 'white', padding: '20px 30px', borderRadius: '12px', textAlign: 'center', flex: '1', minWidth: '120px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  statNum: { color: '#667eea', fontSize: '2rem', margin: '0 0 5px 0' },
  statLabel: { color: '#666', margin: 0 },
  tabs: { display: 'flex', gap: '10px', padding: '0 30px 20px' },
  tab: { padding: '10px 25px', background: 'white', border: '2px solid #667eea', borderRadius: '8px', cursor: 'pointer', color: '#667eea', fontSize: '1rem' },
  tabActive: { padding: '10px 25px', background: '#667eea', border: '2px solid #667eea', borderRadius: '8px', cursor: 'pointer', color: 'white', fontSize: '1rem' },
  sectionTitle: { color: '#333', padding: '0 30px', marginBottom: '15px' },
  card: { background: 'white', margin: '0 30px 15px', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  cardRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' },
  cardText: { margin: '4px 0', color: '#444' },
  actionButtons: { display: 'flex', flexDirection: 'column', gap: '10px' },
  btnConfirm: { padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' },
  btnCancel: { padding: '8px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' },
  confirmedBadge: { color: 'green', fontWeight: 'bold' },
  addDoctorCard: { background: 'white', margin: '0 30px 20px', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  formRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem', flex: '1', minWidth: '150px' },
  btnAdd: { padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' },
  doctorsGrid: { display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '0 30px' },
  doctorCard: { background: 'white', padding: '20px', borderRadius: '12px', width: '220px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  doctorName: { color: '#333', marginBottom: '8px' },
  doctorSpec: { color: '#667eea', marginBottom: '5px' },
  doctorExp: { color: '#666', marginBottom: '5px' },
  doctorDays: { color: '#666', marginBottom: '15px' },
  btnDelete: { padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' },
  empty: { textAlign: 'center', color: '#666', padding: '30px' }
};

export default AdminDashboard;