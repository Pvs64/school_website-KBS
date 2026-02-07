const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "School Management API is running!",
    endpoints: {
      announcements: "/api/announcements",
      teachers: "/api/teachers",
      gallery: "/api/gallery (coming soon)",
      contact: "/api/contact (coming soon)"
    }
  });
});

// GET all announcements
app.get("/api/announcements", (req, res) => {
  console.log("📢 GET /api/announcements called");
  const announcements = db.getAnnouncements();
  const activeAnnouncements = announcements.filter(a => a.isActive);
  res.json({
    success: true,
    count: activeAnnouncements.length,
    data: activeAnnouncements.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  });
});

// POST new announcement
app.post("/api/announcements", (req, res) => {
  console.log("📢 POST /api/announcements called with data:", req.body);
  
  const { title, body, type = "general" } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({
      success: false,
      error: "Title and body are required"
    });
  }
  
  const newAnnouncement = {
    _id: Date.now().toString(),
    title,
    body,
    type,
    publishedAt: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  db.addAnnouncement(newAnnouncement);
  
  console.log("✅ Created announcement:", newAnnouncement._id);
  
  res.status(201).json({
    success: true,
    data: newAnnouncement
  });
});

// GET single announcement
app.get("/api/announcements/:id", (req, res) => {
  const announcement = db.getAnnouncements().find(a => a._id === req.params.id);
  if (!announcement) {
    return res.status(404).json({
      success: false,
      error: "Announcement not found"
    });
  }
  res.json({
    success: true,
    data: announcement
  });
});

// GET all teachers
app.get("/api/teachers", (req, res) => {
  console.log("👨‍🏫 GET /api/teachers called");
  const teachers = db.getTeachers();
  const activeTeachers = teachers.filter(t => t.isActive);
  res.json({
    success: true,
    count: activeTeachers.length,
    data: activeTeachers
  });
});

app.post("/api/teachers", (req, res) => {
  console.log("👨‍🏫 POST /api/teachers called with data:", req.body);
  
  const { name, qualification, designation, section = "Primary", subjects = [], experience = 0 } = req.body;
  
  if (!name || !qualification || !designation) {
    return res.status(400).json({
      success: false,
      error: "Name, qualification, and designation are required"
    });
  }
  
  const newTeacher = {
    _id: Date.now().toString(),
    name,
    qualification,
    designation,
    section,
    subjects: Array.isArray(subjects) ? subjects : [subjects],
    experience: parseInt(experience) || 0,
    photoUrl: "default-teacher.jpg",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  db.addTeacher(newTeacher);
  
  console.log("✅ Created teacher:", newTeacher.name);
  
  res.status(201).json({
    success: true,
    data: newTeacher
  });
});


// Gallery routes
app.get("/api/gallery", (req, res) => {
  console.log("🖼️ GET /api/gallery called");
  const albums = db.getGalleryAlbums();
  res.json({
    success: true,
    count: albums.length,
    data: albums
  });
});

app.get("/api/gallery/:id", (req, res) => {
  const album = db.getGalleryAlbum(req.params.id);
  if (!album) {
    return res.status(404).json({
      success: false,
      error: "Album not found"
    });
  }
  res.json({
    success: true,
    data: album
  });
});

app.post("/api/gallery", (req, res) => {
  console.log("🖼️ POST /api/gallery called with data:", req.body);
  
  const { name, description = "", coverImageUrl, photos = [] } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Album name is required"
    });
  }
  
  const newAlbum = {
    _id: Date.now().toString(),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    description,
    coverImageUrl: coverImageUrl || "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800",
    photos: Array.isArray(photos) ? photos : [photos],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  db.addGalleryAlbum(newAlbum);
  
  console.log("✅ Created gallery album:", newAlbum.name);
  
  res.status(201).json({
    success: true,
    data: newAlbum
  });
});


// Contact routes
app.post("/api/contact", (req, res) => {
  console.log("📧 POST /api/contact called with data:", req.body);
  
  const { name, email, phone, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, subject, and message are required"
    });
  }
  
  const newMessage = {
    _id: Date.now().toString(),
    name,
    email,
    phone: phone || "",
    subject,
    message,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "unread"
  };
  
  db.addContactMessage(newMessage);
  
  console.log("✅ Received contact message from:", name);
  
  res.status(201).json({
    success: true,
    data: newMessage,
    message: "Thank you for your message. We'll get back to you soon!"
  });
});

// Get contact messages (admin only - we'll add auth later)
app.get("/api/contact", (req, res) => {
  console.log("📧 GET /api/contact called");
  const messages = db.getContactMessages();
  res.json({
    success: true,
    count: messages.length,
    data: messages
  });
});


// 404 handler
app.use((req, res) => {
  console.log("❌ 404 - Route not found:", req.method, req.url);
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url}`
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`💾 Data will be saved to data.json`);
  console.log(`📊 Initial data: ${db.getAnnouncements().length} announcements, ${db.getTeachers().length} teachers`);
});
