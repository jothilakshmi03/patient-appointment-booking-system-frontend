import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏥 Patient Appointment Booking</h1>
        <p style={styles.subtitle}><b>Book appointments with top doctors easily.</b></p>
        <div style={styles.buttons}>
          <button style={styles.btnPrimary} onClick={() => navigate('/register')}>
            Register
          </button>
          <button style={styles.btnSecondary} onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1d3290 0%, #07010d 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: 'Black',
    padding: '50px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: { color: '#f4f1ee', fontSize: '2rem', marginBottom: '10px' },
  subtitle: { color: '#666', marginBottom: '30px' },
  buttons: { display: 'flex', gap: '20px', justifyContent: 'center' },
  btnPrimary: {
    padding: '12px 30px',
    background: '#0e35e2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  btnSecondary: {
    padding: '12px 30px',
    background: 'white',
    color: '#02071c',
    border: '2px solid #010618',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default Home;