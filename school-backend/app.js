const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/database");

const app = express();

// Security & Parsing Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Simple secure session token store for admin
const ADMIN_USERNAME = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kbs@admin2026";
const activeTokens = new Set(["kbs_admin_static_session_token_2026"]);

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, error: "Authorization required" });
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!activeTokens.has(token)) {
    return res.status(403).json({ success: false, error: "Invalid or expired session token" });
  }

  next();
};

// ==========================================
// HEALTH & STATS
// ==========================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KBS Public School API is operational",
    version: "2.0.0",
    school: {
      name: "KBS Public School",
      location: "Gaura Garhi, Raebareli, Uttar Pradesh",
      udise: "9281002502"
    },
    endpoints: {
      health: "/api/health",
      stats: "/api/stats",
      announcements: "/api/announcements",
      teachers: "/api/teachers",
      gallery: "/api/gallery",
      contact: "/api/contact",
      admissions: "/api/admissions"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/stats", (req, res) => {
  const stats = db.getStats();
  res.json({ success: true, data: stats });
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username and password are required"
    });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = `kbs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    activeTokens.add(token);

    return res.json({
      success: true,
      message: "Admin authentication successful",
      token: token,
      user: {
        username: ADMIN_USERNAME,
        role: "Administrator",
        school: "KBS Public School"
      }
    });
  }

  return res.status(401).json({
    success: false,
    error: "Invalid admin username or password"
  });
});

app.get("/api/admin/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ success: false, authenticated: false });
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  const isValid = activeTokens.has(token);
  return res.json({ success: true, authenticated: isValid });
});

// ==========================================
// ANNOUNCEMENTS
// ==========================================
app.get("/api/announcements", (req, res) => {
  const { type, category, search, limit } = req.query;
  let items = db.getAnnouncements().filter(a => a.isActive !== false);

  if (type && type !== "all") {
    items = items.filter(a => a.type?.toLowerCase() === type.toLowerCase());
  }
  if (category && category !== "all") {
    items = items.filter(a => a.category?.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(a => 
      a.title?.toLowerCase().includes(q) || a.body?.toLowerCase().includes(q)
    );
  }

  items.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));

  if (limit) {
    items = items.slice(0, parseInt(limit));
  }

  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

app.get("/api/announcements/:id", (req, res) => {
  const item = db.getAnnouncementById(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: "Announcement not found" });
  }
  res.json({ success: true, data: item });
});

app.post("/api/announcements", (req, res) => {
  const { title, body, type = "general", category = "General", priority = "normal" } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      success: false,
      error: "Title and content body are required"
    });
  }

  const created = db.addAnnouncement({
    title: title.trim(),
    body: body.trim(),
    type,
    category,
    priority,
    publishedAt: new Date().toISOString()
  });

  res.status(201).json({ success: true, data: created });
});

app.put("/api/announcements/:id", (req, res) => {
  const updated = db.updateAnnouncement(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: "Announcement not found" });
  }
  res.json({ success: true, data: updated });
});

app.delete("/api/announcements/:id", (req, res) => {
  const deleted = db.deleteAnnouncement(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: "Announcement not found" });
  }
  res.json({ success: true, message: "Announcement deleted successfully", data: deleted });
});

// ==========================================
// TEACHERS / FACULTY
// ==========================================
app.get("/api/teachers", (req, res) => {
  const { section, search, sortBy } = req.query;
  let items = db.getTeachers().filter(t => t.isActive !== false);

  if (section && section !== "All") {
    items = items.filter(t => t.section === section);
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(t => 
      t.name?.toLowerCase().includes(q) ||
      t.qualification?.toLowerCase().includes(q) ||
      t.subjects?.some(s => s.toLowerCase().includes(q))
    );
  }

  if (sortBy === "experience") {
    items.sort((a, b) => (b.experience || 0) - (a.experience || 0));
  } else {
    items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

app.get("/api/teachers/:id", (req, res) => {
  const item = db.getTeacherById(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: "Teacher not found" });
  }
  res.json({ success: true, data: item });
});

app.post("/api/teachers", (req, res) => {
  const { name, qualification, designation, section = "Primary", subjects = [], experience = 0, email, phone, bio, achievements, photoUrl } = req.body;

  if (!name || !qualification || !designation) {
    return res.status(400).json({
      success: false,
      error: "Name, qualification, and designation are required"
    });
  }

  const created = db.addTeacher({
    name: name.trim(),
    qualification: qualification.trim(),
    designation: designation.trim(),
    section,
    subjects: Array.isArray(subjects) ? subjects : subjects.split(",").map(s => s.trim()).filter(Boolean),
    experience: parseInt(experience) || 0,
    email: email || "info@kbsps.com",
    phone: phone || "+91 80522 42453",
    bio: bio || `Educator at KBS Public School with focus on student enrichment.`,
    achievements: achievements || "Dedicated educator",
    photoUrl: photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400"
  });

  res.status(201).json({ success: true, data: created });
});

app.put("/api/teachers/:id", (req, res) => {
  const updated = db.updateTeacher(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: "Teacher not found" });
  }
  res.json({ success: true, data: updated });
});

app.delete("/api/teachers/:id", (req, res) => {
  const deleted = db.deleteTeacher(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: "Teacher not found" });
  }
  res.json({ success: true, message: "Teacher deleted successfully", data: deleted });
});

// ==========================================
// GALLERY
// ==========================================
app.get("/api/gallery", (req, res) => {
  const albums = db.getGalleryAlbums();
  res.json({
    success: true,
    count: albums.length,
    data: albums
  });
});

app.get("/api/gallery/:idOrSlug", (req, res) => {
  const album = db.getGalleryAlbum(req.params.idOrSlug);
  if (!album) {
    return res.status(404).json({ success: false, error: "Gallery album not found" });
  }
  res.json({ success: true, data: album });
});

app.post("/api/gallery", (req, res) => {
  const { name, description = "", category = "Campus", coverImageUrl, photos = [], tags = [] } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, error: "Album name is required" });
  }

  const created = db.addGalleryAlbum({
    name: name.trim(),
    description: description.trim(),
    category,
    coverImageUrl: coverImageUrl || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    photos: Array.isArray(photos) ? photos : [photos],
    tags: Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim()).filter(Boolean)
  });

  res.status(201).json({ success: true, data: created });
});

app.put("/api/gallery/:id", (req, res) => {
  const updated = db.updateGalleryAlbum(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: "Gallery album not found" });
  }
  res.json({ success: true, data: updated });
});

app.delete("/api/gallery/:id", (req, res) => {
  const deleted = db.deleteGalleryAlbum(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: "Gallery album not found" });
  }
  res.json({ success: true, message: "Gallery album deleted", data: deleted });
});

// ==========================================
// CONTACT ENQUIRIES
// ==========================================
app.get("/api/contact", (req, res) => {
  const messages = db.getContactMessages();
  res.json({
    success: true,
    count: messages.length,
    data: messages
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message, category = "General" } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Full name, email address, subject, and message are required"
    });
  }

  // Basic email syntax check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address"
    });
  }

  const newMessage = db.addContactMessage({
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : "",
    subject: subject.trim(),
    message: message.trim(),
    category
  });

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out to KBS Public School. Our administration will contact you shortly.",
    data: newMessage
  });
});

app.patch("/api/contact/:id/read", (req, res) => {
  const updated = db.markMessageAsRead(req.params.id);
  if (!updated) {
    return res.status(404).json({ success: false, error: "Message not found" });
  }
  res.json({ success: true, data: updated });
});

app.delete("/api/contact/:id", (req, res) => {
  const deleted = db.deleteContactMessage(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: "Message not found" });
  }
  res.json({ success: true, message: "Contact message deleted", data: deleted });
});

// ==========================================
// ADMISSIONS (ONLINE APPLICATION)
// ==========================================
app.get("/api/admissions", (req, res) => {
  const items = db.getAdmissions();
  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

app.get("/api/admissions/:idOrAppNum", (req, res) => {
  const item = db.getAdmissionById(req.params.idOrAppNum);
  if (!item) {
    return res.status(404).json({ success: false, error: "Admission record not found" });
  }
  res.json({ success: true, data: item });
});

app.post("/api/admissions", (req, res) => {
  const {
    studentName,
    dob,
    gender,
    gradeApplying,
    parentName,
    parentRelation = "Parent",
    email,
    phone,
    address,
    city = "Raebareli",
    state = "Uttar Pradesh",
    previousSchool,
    transportRequired = false
  } = req.body;

  if (!studentName || !gradeApplying || !parentName || !phone) {
    return res.status(400).json({
      success: false,
      error: "Student name, class applying for, parent name, and contact phone are required"
    });
  }

  const newAdmission = db.addAdmission({
    studentName: studentName.trim(),
    dob: dob || "",
    gender: gender || "Not Specified",
    gradeApplying: gradeApplying.trim(),
    parentName: parentName.trim(),
    parentRelation,
    email: email ? email.trim() : "",
    phone: phone.trim(),
    address: address ? address.trim() : "",
    city: city.trim(),
    state: state.trim(),
    previousSchool: previousSchool ? previousSchool.trim() : "N/A",
    transportRequired: Boolean(transportRequired),
    status: "Under Review",
    notes: "Application submitted online via KBS School portal."
  });

  res.status(201).json({
    success: true,
    message: "Admission application submitted successfully! Please save your application number.",
    applicationNumber: newAdmission.applicationNumber,
    data: newAdmission
  });
});

app.patch("/api/admissions/:id/status", (req, res) => {
  const { status, notes } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, error: "Status is required" });
  }

  const updated = db.updateAdmissionStatus(req.params.id, status, notes);
  if (!updated) {
    return res.status(404).json({ success: false, error: "Application not found" });
  }
  res.json({ success: true, data: updated });
});

app.delete("/api/admissions/:id", (req, res) => {
  const deleted = db.deleteAdmission(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: "Application not found" });
  }
  res.json({ success: true, message: "Application deleted successfully", data: deleted });
});

// ==========================================
// 404 & ERROR HANDLING
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url}`
  });
});

app.use((err, req, res, next) => {
  console.error("Server exception:", err);
  res.status(500).json({
    success: false,
    error: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` KBS Public School Management API v2.0.0`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Initial Database Loaded:`);
  console.log(`  - Announcements: ${db.getAnnouncements().length}`);
  console.log(`  - Teachers: ${db.getTeachers().length}`);
  console.log(`  - Gallery Albums: ${db.getGalleryAlbums().length}`);
  console.log(`  - Contact Messages: ${db.getContactMessages().length}`);
  console.log(`  - Admissions: ${db.getAdmissions().length}`);
  console.log(`===============================================`);
});
