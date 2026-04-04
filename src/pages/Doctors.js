import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../services/api';

function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then(res => setDoctors(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👨‍⚕️ Available Doctors</h2>
      <div style={styles.grid}>
        {doctors.map(doc => (
          <div key={doc.id} style={styles.card}>
            <h3 style={styles.name}>{doc.name}</h3>
            <p style={styles.spec}>🏥 {doc.specialization}</p>
            <p style={styles.exp}>⭐ {doc.experience} years experience</p>
            <p style={styles.days}>📅 {doc.availableDays}</p>
            <button style={styles.btn} onClick={() => navigate(`/book/${doc.id}`)}>Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', padding: '30px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '30px' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' },
  card: { background: 'white', padding: '25px', borderRadius: '15px', width: '250px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' },
  name: { color: '#333', marginBottom: '8px' },
  spec: { color: '#667eea', marginBottom: '5px' },
  exp: { color: '#666', marginBottom: '5px' },
  days: { color: '#666', marginBottom: '15px' },
  btn: { width: '100%', padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default Doctors;