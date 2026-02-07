import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Announcements API
export const getAnnouncements = () => API.get('/announcements');
export const createAnnouncement = (announcementData) => 
  API.post('/announcements', announcementData);

// Teachers API
export const getTeachers = () => API.get('/teachers');
export const createTeacher = (teacherData) => 
  API.post('/teachers', teacherData);

// Gallery API
export const getGalleryAlbums = () => API.get('/gallery');
export const createGalleryAlbum = (albumData) => 
  API.post('/gallery', albumData);

// Contact API
export const sendContactMessage = (messageData) => 
  API.post('/contact', messageData);

export default API;
