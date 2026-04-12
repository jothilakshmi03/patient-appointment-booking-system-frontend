import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const registerUser = (user) => axios.post(`${BASE_URL}/users/register`, user);
export const loginUser = (user) => axios.post(`${BASE_URL}/users/login`, user);
export const getDoctors = () => axios.get(`${BASE_URL}/doctors`);
export const bookAppointment = (appointment) => axios.post(`${BASE_URL}/appointments`, appointment);
export const getAppointmentsByPatient = (patientId) => axios.get(`${BASE_URL}/appointments/patient/${patientId}`);
export const cancelAppointment = (id) => axios.put(`${BASE_URL}/appointments/cancel/${id}`);
export const getAllAppointments = () => axios.get(`${BASE_URL}/appointments`);
export const confirmAppointment = (id) => axios.put(`${BASE_URL}/appointments/confirm/${id}`);
export const addDoctor = (doctor) => axios.post(`${BASE_URL}/doctors`, doctor);
export const deleteDoctor = (id) => axios.delete(`${BASE_URL}/doctors/${id}`);