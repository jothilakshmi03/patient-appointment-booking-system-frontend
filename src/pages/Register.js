import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'PATIENT' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Register</h2>
        <input style={styles.input} placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input style={styles.input} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <input style={styles.input} placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
        <button style={styles.btn} onClick={handleSubmit}>Register</button>
        <p style={styles.link} onClick={() => navigate('/login')}>Already have an account? Login</p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { background: 'white', padding: '40px', borderRadius: '20px', width: '350px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
  link: { textAlign: 'center', marginTop: '15px', color: '#667eea', cursor: 'pointer' }
};

export default Register;