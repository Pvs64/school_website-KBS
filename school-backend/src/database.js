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
        const parsed = JSON.parse(content);
        return {
          announcements: parsed.announcements || [],
          teachers: parsed.teachers || [],
          galleryAlbums: parsed.galleryAlbums || [],
          contactMessages: parsed.contactMessages || [],
          admissions: parsed.admissions || []
        };
      }
    } catch (error) {
      console.error('❌ Error loading database:', error);
    }
    return {
      announcements: [],
      teachers: [],
      galleryAlbums: [],
      contactMessages: [],
      admissions: []
    };
  }

  saveData() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
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
      _id: 'ann-' + Date.now().toString(),
      type: 'general',
      category: 'General',
      priority: 'normal',
      isActive: true,
      publishedAt: new Date().toISOString(),
      ...announcement,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.announcements.unshift(newAnnouncement);
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
      const deleted = this.data.announcements.splice(index, 1);
      this.saveData();
      return deleted[0];
    }
    return null;
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
      _id: 'tch-' + Date.now().toString(),
      section: 'Primary',
      subjects: [],
      experience: 0,
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
      isActive: true,
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
      const deleted = this.data.teachers.splice(index, 1);
      this.saveData();
      return deleted[0];
    }
    return null;
  }

  // ============ GALLERY METHODS ============
  getGalleryAlbums() {
    return this.data.galleryAlbums || [];
  }

  getGalleryAlbum(idOrSlug) {
    return this.data.galleryAlbums?.find(
      album => album._id === idOrSlug || album.slug === idOrSlug
    ) || null;
  }

  addGalleryAlbum(album) {
    if (!this.data.galleryAlbums) this.data.galleryAlbums = [];
    const baseSlug = (album.name || 'album')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newAlbum = {
      _id: 'alb-' + Date.now().toString(),
      slug: baseSlug + '-' + Date.now().toString().slice(-4),
      description: '',
      category: 'Campus',
      coverImageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
      photos: [],
      tags: [],
      ...album,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.galleryAlbums.unshift(newAlbum);
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
      const deleted = this.data.galleryAlbums.splice(index, 1);
      this.saveData();
      return deleted[0];
    }
    return null;
  }

  // ============ CONTACT METHODS ============
  getContactMessages() {
    return this.data.contactMessages || [];
  }

  getContactMessageById(id) {
    return this.data.contactMessages?.find(message => message._id === id) || null;
  }

  addContactMessage(message) {
    if (!this.data.contactMessages) this.data.contactMessages = [];
    const newMessage = {
      _id: 'msg-' + Date.now().toString(),
      category: 'General',
      status: 'unread',
      isRead: false,
      ...message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.contactMessages.unshift(newMessage);
    this.saveData();
    return newMessage;
  }

  markMessageAsRead(id) {
    const message = this.getContactMessageById(id);
    if (message) {
      message.isRead = true;
      message.status = 'read';
      message.updatedAt = new Date().toISOString();
      this.saveData();
      return message;
    }
    return null;
  }

  deleteContactMessage(id) {
    const index = this.data.contactMessages?.findIndex(message => message._id === id);
    if (index !== -1 && index !== undefined) {
      const deleted = this.data.contactMessages.splice(index, 1);
      this.saveData();
      return deleted[0];
    }
    return null;
  }

  // ============ ADMISSIONS METHODS ============
  getAdmissions() {
    return this.data.admissions || [];
  }

  getAdmissionById(id) {
    return this.data.admissions?.find(
      adm => adm._id === id || adm.applicationNumber === id
    ) || null;
  }

  addAdmission(application) {
    if (!this.data.admissions) this.data.admissions = [];
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newApplication = {
      _id: 'adm-' + Date.now().toString(),
      applicationNumber: `KBS-2026-${randomSuffix}`,
      status: 'Under Review',
      academicYear: '2026-27',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...application
    };
    this.data.admissions.unshift(newApplication);
    this.saveData();
    return newApplication;
  }

  updateAdmissionStatus(id, status, notes = '') {
    const index = this.data.admissions?.findIndex(
      adm => adm._id === id || adm.applicationNumber === id
    );
    if (index !== -1 && index !== undefined) {
      this.data.admissions[index] = {
        ...this.data.admissions[index],
        status,
        notes: notes || this.data.admissions[index].notes,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.admissions[index];
    }
    return null;
  }

  deleteAdmission(id) {
    const index = this.data.admissions?.findIndex(
      adm => adm._id === id || adm.applicationNumber === id
    );
    if (index !== -1 && index !== undefined) {
      const deleted = this.data.admissions.splice(index, 1);
      this.saveData();
      return deleted[0];
    }
    return null;
  }

  // ============ UTILITY STATS ============
  getStats() {
    const unread = (this.data.contactMessages || []).filter(m => !m.isRead).length;
    const pendingAdmissions = (this.data.admissions || []).filter(
      a => a.status === 'Under Review' || a.status === 'Pending Documents'
    ).length;

    return {
      announcements: this.data.announcements?.length || 0,
      teachers: this.data.teachers?.length || 0,
      galleryAlbums: this.data.galleryAlbums?.length || 0,
      contactMessages: this.data.contactMessages?.length || 0,
      unreadMessages: unread,
      admissions: this.data.admissions?.length || 0,
      pendingAdmissions: pendingAdmissions
    };
  }
}

// Singleton database instance
const db = new JSONDatabase('../data.json');

module.exports = db;