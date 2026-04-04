import React, { useEffect, useState } from 'react';
import { getAppointmentsByPatient, cancelAppointment } from '../services/api';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointmentsByPatient(1).then(res => setAppointments(res.data));
  }, []);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    alert('Appointment cancelled!');
    getAppointmentsByPatient(1).then(res => setAppointments(res.data));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 My Appointments</h2>
      {appointments.length === 0 ? <p style={styles.empty}>No appointments found</p> : (
        appointments.map(apt => (
          <div key={apt.id} style={styles.card}>
            <p>👨‍⚕️ Doctor: {apt.doctor?.name}</p>
            <p>📅 Date: {apt.appointmentDate}</p>
            <p>🕐 Time: {apt.appointmentTime}</p>
            <p>Status: <span style={{ color: apt.status === 'PENDING' ? 'orange' : apt.status === 'CONFIRMED' ? 'green' : 'red' }}>{apt.status}</span></p>
            {apt.status !== 'CANCELLED' && (
              <button style={styles.btn} onClick={() => handleCancel(apt.id)}>Cancel</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', padding: '30px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '30px' },
  card: { background: 'white', padding: '20px', borderRadius: '15px', maxWidth: '500px', margin: '0 auto 20px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' },
  btn: { padding: '8px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  empty: { textAlign: 'center', color: '#666' }
};

export default MyAppointments;