import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        🏥 PABS Hospital
      </div>
      <div style={styles.links}>
  <button style={styles.link} onClick={() => navigate('/doctors')}>Doctors</button>
  <button style={styles.link} onClick={() => navigate('/my-appointments')}>My Appointments</button>
  <button style={styles.btnLogin} onClick={() => navigate('/login')}>Login</button>
  <button style={styles.btnRegister} onClick={() => navigate('/register')}>Register</button>
</div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  link: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '5px 10px',
  },
  btnLogin: {
    padding: '8px 20px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  btnRegister: {
    padding: '8px 20px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
};

export default Navbar;