const fs = require('fs');
const path = require('path');

class JSONDatabase {
  constructor(filename) {
    this.filename = path.join(__dirname, filename);
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(this.filename)) {
        const content = fs.readFileSync(this.filename, 'utf8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('❌ Error loading database:', error);
    }
    return { announcements: [], teachers: [], galleryAlbums: [], contactMessages: [] };
  }

  saveData() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
      console.log('💾 Data saved successfully');
      return true;
    } catch (error) {
      console.error('❌ Error saving database:', error);
      return false;
    }
  }

  // ============ ANNOUNCEMENT METHODS ============
  getAnnouncements() {
    return this.data.announcements || [];
  }

  getAnnouncementById(id) {
    return this.data.announcements?.find(ann => ann._id === id) || null;
  }

  addAnnouncement(announcement) {
    if (!this.data.announcements) this.data.announcements = [];
    const newAnnouncement = {
      _id: Date.now().toString(),
      ...announcement,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.announcements.push(newAnnouncement);
    this.saveData();
    return newAnnouncement;
  }

  updateAnnouncement(id, updates) {
    const index = this.data.announcements?.findIndex(ann => ann._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.announcements[index] = {
        ...this.data.announcements[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.announcements[index];
    }
    return null;
  }

  deleteAnnouncement(id) {
    const index = this.data.announcements?.findIndex(ann => ann._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.announcements.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // ============ TEACHER METHODS ============
  getTeachers() {
    return this.data.teachers || [];
  }

  getTeacherById(id) {
    return this.data.teachers?.find(teacher => teacher._id === id) || null;
  }

  addTeacher(teacher) {
    if (!this.data.teachers) this.data.teachers = [];
    const newTeacher = {
      _id: Date.now().toString(),
      ...teacher,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.teachers.push(newTeacher);
    this.saveData();
    return newTeacher;
  }

  updateTeacher(id, updates) {
    const index = this.data.teachers?.findIndex(teacher => teacher._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.teachers[index] = {
        ...this.data.teachers[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.teachers[index];
    }
    return null;
  }

  deleteTeacher(id) {
    const index = this.data.teachers?.findIndex(teacher => teacher._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.teachers.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // ============ GALLERY METHODS ============
  getGalleryAlbums() {
    return this.data.galleryAlbums || [];
  }

  getGalleryAlbum(id) {
    return this.data.galleryAlbums?.find(album => album._id === id) || null;
  }

  addGalleryAlbum(album) {
    if (!this.data.galleryAlbums) this.data.galleryAlbums = [];
    const newAlbum = {
      _id: Date.now().toString(),
      slug: album.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      ...album,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.galleryAlbums.push(newAlbum);
    this.saveData();
    return newAlbum;
  }

  updateGalleryAlbum(id, updates) {
    const index = this.data.galleryAlbums?.findIndex(album => album._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.galleryAlbums[index] = { 
        ...this.data.galleryAlbums[index], 
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.galleryAlbums[index];
    }
    return null;
  }

  deleteGalleryAlbum(id) {
    const index = this.data.galleryAlbums?.findIndex(album => album._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.galleryAlbums.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // ============ CONTACT METHODS ============
  getContactMessages() {
    return this.data.contactMessages || [];
  }

  getContactMessageById(id) {
    return this.data.contactMessages?.find(message => message._id === id) || null;
  }

  getUnreadContactMessages() {
    return this.data.contactMessages?.filter(message => !message.isRead) || [];
  }

  addContactMessage(message) {
    if (!this.data.contactMessages) this.data.contactMessages = [];
    const newMessage = {
      _id: Date.now().toString(),
      ...message,
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.contactMessages.push(newMessage);
    this.saveData();
    return newMessage;
  }

  markMessageAsRead(id) {
    const message = this.getContactMessageById(id);
    if (message) {
      message.isRead = true;
      message.updatedAt = new Date().toISOString();
      this.saveData();
      return message;
    }
    return null;
  }

  deleteContactMessage(id) {
    const index = this.data.contactMessages?.findIndex(message => message._id === id);
    if (index !== -1 && index !== undefined) {
      this.data.contactMessages.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // ============ UTILITY METHODS ============
  getStats() {
    return {
      announcements: this.data.announcements?.length || 0,
      teachers: this.data.teachers?.length || 0,
      galleryAlbums: this.data.galleryAlbums?.length || 0,
      contactMessages: this.data.contactMessages?.length || 0,
      unreadMessages: this.getUnreadContactMessages().length
    };
  }
}

// Create singleton instance
const db = new JSONDatabase('../data.json');

// Add initial data if empty
if (db.getAnnouncements().length === 0) {
  console.log('📢 Adding initial announcements...');
  db.addAnnouncement({
    title: "Welcome to New Academic Year",
    body: "School reopens on January 15, 2024 with new facilities. All students are requested to bring their summer vacation homework.",
    type: "academic",
    category: "General",
    isActive: true,
    publishedAt: new Date().toISOString()
  });

  db.addAnnouncement({
    title: "Annual Sports Day",
    body: "Annual Sports Day will be held on February 25, 2024. All students are encouraged to participate.",
    type: "sports",
    category: "Event",
    isActive: true,
    publishedAt: new Date(Date.now() + 86400000).toISOString()
  });
}

if (db.getTeachers().length === 0) {
  console.log('👨‍🏫 Adding initial teachers...');
  db.addTeacher({
    name: "Dr. Sarah Johnson",
    qualification: "Ph.D. in Education, M.Sc. Physics",
    designation: "Principal & Physics Professor",
    section: "Administration",
    subjects: ["Physics", "Educational Leadership"],
    experience: 15,
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
    isActive: true,
    bio: "With over 15 years of experience in education, Dr. Johnson is dedicated to innovative teaching methods."
  });

  db.addTeacher({
    name: "Mr. David Chen",
    qualification: "M.Sc. Mathematics, B.Ed.",
    designation: "Senior Mathematics Teacher",
    section: "Science",
    subjects: ["Mathematics", "Statistics"],
    experience: 10,
    email: "david.chen@school.edu",
    phone: "+1 (555) 987-6543",
    photoUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400",
    isActive: true,
    bio: "Specializes in making complex mathematical concepts accessible to all students."
  });
}

if (db.getGalleryAlbums().length === 0) {
  console.log('🖼️ Adding initial gallery albums...');
  db.addGalleryAlbum({
    name: "Annual Sports Day 2024",
    description: "Photos from our annual sports day event showcasing student talents in various sports.",
    coverImageUrl: "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=800",
    photos: [
      "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=800",
      "https://images.unsplash.com/photo-1543321269-9d86d3680e1c?w=800",
      "https://images.unsplash.com/photo-1543321269-83f5f8c0c869?w=800"
    ],
    tags: ["sports", "event", "students"]
  });

  db.addGalleryAlbum({
    name: "Science Fair Exhibition",
    description: "Students showcasing their innovative science projects and experiments.",
    coverImageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    photos: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800"
    ],
    tags: ["science", "projects", "exhibition"]
  });

  db.addGalleryAlbum({
    name: "Cultural Fest 2024",
    description: "Annual cultural festival celebrations with music, dance, and drama performances.",
    coverImageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    photos: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61623?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61624?w=800"
    ],
    tags: ["cultural", "festival", "performance"]
  });
}

if (db.getContactMessages().length === 0) {
  console.log('📧 Adding sample contact messages...');
  db.addContactMessage({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Admission Inquiry",
    message: "I would like to inquire about the admission process for the upcoming academic year for my son in grade 6.",
    category: "Admissions"
  });

  db.addContactMessage({
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 987-6543",
    subject: "Parent Feedback",
    message: "I'm very impressed with the recent improvements in the school library facilities. Thank you for your efforts.",
    category: "Feedback"
  });

  // Add a read message for demonstration
  const readMessage = db.addContactMessage({
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+1 (555) 456-7890",
    subject: "Transportation Service",
    message: "I would like to know about the school bus routes and timings for the new academic year.",
    category: "Transport"
  });
  db.markMessageAsRead(readMessage._id);
}

console.log('✅ Database initialized with:');
console.log(`   ${db.getAnnouncements().length} announcements`);
console.log(`   ${db.getTeachers().length} teachers`);
console.log(`   ${db.getGalleryAlbums().length} gallery albums`);
console.log(`   ${db.getContactMessages().length} contact messages`);
console.log(`   ${db.getUnreadContactMessages().length} unread messages`);

module.exports = db;