import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookAppointment } from '../services/api';
import Navbar from '../components/Navbar';


function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ appointmentDate: '', appointmentTime: '' });

  const handleBook = async () => {
    try {
      await bookAppointment({
        patient: { id: 1 },
        doctor: { id: doctorId },
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime
      });
      alert('Appointment booked successfully!');
      navigate('/my-appointments');
    } catch (err) {
      alert('Booking failed!');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.card}>
        <h2 style={styles.title}>📅 Book Appointment</h2>
        <input style={styles.input} type="date" onChange={e => setForm({...form, appointmentDate: e.target.value})} />
        <input style={styles.input} type="time" onChange={e => setForm({...form, appointmentTime: e.target.value})} />
        <button style={styles.btn} onClick={handleBook}>Confirm Booking</button>
        <button style={styles.btnBack} onClick={() => navigate('/doctors')}>Back</button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #1e359b 0%, #914cd5 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { background: 'Black', padding: '40px', borderRadius: '20px', width: '350px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#f9f4f4' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#0524ab', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', marginBottom: '10px' },
  btnBack: { width: '100%', padding: '12px', background: 'white', color: '#02071a', border: '2px solid #020a2e', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }
};

export default BookAppointment;