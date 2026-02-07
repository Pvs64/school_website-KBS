import { useState } from "react";
import { createAnnouncement, createTeacher } from "../../services/api";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    body: "",
    type: "news"
  });
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    qualification: "",
    designation: "",
    section: "Primary",
    subjects: "",
    experience: 0
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      await createAnnouncement(announcementForm);
      setMessage("✅ Announcement created successfully!");
      setAnnouncementForm({ title: "", body: "", type: "news" });
    } catch (error) {
      setMessage("❌ Error creating announcement: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const teacherData = {
      ...teacherForm,
      subjects: teacherForm.subjects.split(",").map(s => s.trim()).filter(s => s)
    };
    
    try {
      await createTeacher(teacherData);
      setMessage("✅ Teacher added successfully!");
      setTeacherForm({
        name: "",
        qualification: "",
        designation: "",
        section: "Primary",
        subjects: "",
        experience: 0
      });
    } catch (error) {
      setMessage("❌ Error adding teacher: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Admin Panel
      </h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          className={`px-6 py-3 font-medium ${activeTab === "announcements" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("announcements")}
        >
          Add Announcement
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === "teachers" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("teachers")}
        >
          Add Teacher
        </button>
      </div>

      {/* Announcement Form */}
      {activeTab === "announcements" && (
        <form onSubmit={handleAnnouncementSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Create New Announcement</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={announcementForm.title}
                onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Content *</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                value={announcementForm.body}
                onChange={(e) => setAnnouncementForm({...announcementForm, body: e.target.value})}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={announcementForm.type}
                onChange={(e) => setAnnouncementForm({...announcementForm, type: e.target.value})}
                disabled={loading}
              >
                <option value="news">News</option>
                <option value="event">Event</option>
                <option value="holiday">Holiday</option>
                <option value="general">General</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Announcement"}
            </button>
          </div>
        </form>
      )}

      {/* Teacher Form */}
      {activeTab === "teachers" && (
        <form onSubmit={handleTeacherSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Add New Teacher</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={teacherForm.name}
                onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Qualification *</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={teacherForm.qualification}
                onChange={(e) => setTeacherForm({...teacherForm, qualification: e.target.value})}
                required
                disabled={loading}
                placeholder="M.Sc. Mathematics, B.Ed"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Designation *</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={teacherForm.designation}
                onChange={(e) => setTeacherForm({...teacherForm, designation: e.target.value})}
                required
                disabled={loading}
                placeholder="Mathematics Department Head"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Section</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={teacherForm.section}
                onChange={(e) => setTeacherForm({...teacherForm, section: e.target.value})}
                disabled={loading}
              >
                <option value="Primary">Primary</option>
                <option value="Middle">Middle</option>
                <option value="High">High</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Subjects (comma separated)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={teacherForm.subjects}
                onChange={(e) => setTeacherForm({...teacherForm, subjects: e.target.value})}
                disabled={loading}
                placeholder="Mathematics, Physics, Chemistry"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Experience (years)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={teacherForm.experience}
                onChange={(e) => setTeacherForm({...teacherForm, experience: parseInt(e.target.value) || 0})}
                min="0"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Teacher"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Admin;
