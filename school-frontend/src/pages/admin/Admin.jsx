import { useState, useEffect } from "react";
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getTeachers,
  createTeacher,
  deleteTeacher,
  getContactMessages,
  markContactMessageRead,
  deleteContactMessage,
  getAdmissions,
  updateAdmissionStatus,
  deleteAdmission,
  adminLogin,
  adminVerify,
  getStats
} from "../../services/api";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Users,
  Bell,
  GraduationCap,
  Mail,
  Image as ImageIcon,
  Search,
  Filter,
  Eye,
  Shield,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  X
} from "lucide-react";

const Admin = () => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active section tab
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, announcements, teachers, admissions, contacts

  // Stats
  const [stats, setStats] = useState({
    announcements: 0,
    teachers: 0,
    galleryAlbums: 0,
    contactMessages: 0,
    unreadMessages: 0,
    admissions: 0,
    pendingAdmissions: 0
  });

  // Data collections
  const [announcements, setAnnouncements] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

  // Creation forms
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    body: "",
    type: "news",
    category: "General",
    priority: "normal"
  });

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    qualification: "",
    designation: "",
    section: "Primary",
    subjects: "",
    experience: 0,
    email: "",
    phone: "+91 80522 42453",
    photoUrl: ""
  });

  const [viewingMessage, setViewingMessage] = useState(null);

  // Check existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("kbs_admin_token");
      if (token) {
        setIsAuthenticated(true);
        loadDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await adminLogin(loginForm.username, loginForm.password);
      if (res.data?.success) {
        localStorage.setItem("kbs_admin_token", res.data.token);
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (err) {
      setLoginError(err.response?.data?.error || "Authentication failed. Check credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kbs_admin_token");
    setIsAuthenticated(false);
    setActionMessage({ type: "info", text: "Logged out successfully" });
  };

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [annRes, teachRes, admRes, cntRes, stRes] = await Promise.all([
        getAnnouncements(),
        getTeachers(),
        getAdmissions(),
        getContactMessages(),
        getStats()
      ]);

      setAnnouncements(annRes.data?.data || []);
      setTeachers(teachRes.data?.data || []);
      setAdmissions(admRes.data?.data || []);
      setContacts(cntRes.data?.data || []);
      setStats(stRes.data?.data || {});
    } catch (err) {
      console.error("Error loading admin records:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const showToast = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: "", text: "" }), 4000);
  };

  // ==========================================
  // ANNOUNCEMENT ACTIONS
  // ==========================================
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement(announcementForm);
      showToast("success", "Announcement created successfully!");
      setAnnouncementForm({
        title: "",
        body: "",
        type: "news",
        category: "General",
        priority: "normal"
      });
      loadDashboardData();
    } catch (err) {
      showToast("error", "Error creating announcement: " + err.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      showToast("success", "Announcement deleted");
      loadDashboardData();
    } catch (err) {
      showToast("error", "Failed to delete announcement");
    }
  };

  // ==========================================
  // TEACHER ACTIONS
  // ==========================================
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacherPayload = {
        ...teacherForm,
        subjects: teacherForm.subjects.split(",").map((s) => s.trim()).filter(Boolean)
      };
      await createTeacher(teacherPayload);
      showToast("success", "Teacher added to faculty directory!");
      setTeacherForm({
        name: "",
        qualification: "",
        designation: "",
        section: "Primary",
        subjects: "",
        experience: 0,
        email: "",
        phone: "+91 80522 42453",
        photoUrl: ""
      });
      loadDashboardData();
    } catch (err) {
      showToast("error", "Error adding teacher: " + err.message);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (!window.confirm("Are you sure you want to remove this teacher?")) return;
    try {
      await deleteTeacher(id);
      showToast("success", "Teacher removed");
      loadDashboardData();
    } catch (err) {
      showToast("error", "Failed to delete teacher");
    }
  };

  // ==========================================
  // ADMISSION ACTIONS
  // ==========================================
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdmissionStatus(id, newStatus);
      showToast("success", `Application status updated to "${newStatus}"`);
      loadDashboardData();
    } catch (err) {
      showToast("error", "Failed to update status");
    }
  };

  const handleDeleteAdmission = async (id) => {
    if (!window.confirm("Delete this admission application?")) return;
    try {
      await deleteAdmission(id);
      showToast("success", "Admission application deleted");
      loadDashboardData();
    } catch (err) {
      showToast("error", "Failed to delete application");
    }
  };

  // ==========================================
  // CONTACT ACTIONS
  // ==========================================
  const handleMarkRead = async (id) => {
    try {
      await markContactMessageRead(id);
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this inquiry message?")) return;
    try {
      await deleteContactMessage(id);
      showToast("success", "Inquiry deleted");
      loadDashboardData();
    } catch (err) {
      showToast("error", "Failed to delete message");
    }
  };

  // ==========================================
  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  // ==========================================
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-100 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-800 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              KBS Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Restricted Administrative Access • KBS Public School
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center">
              <AlertCircle size={15} className="mr-2 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Quick Demo Credentials Info */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
              <span className="font-bold">Authorized Default Credentials:</span>
              <div className="mt-1 flex justify-between font-mono text-[11px]">
                <span>Username: <strong>admin</strong></span>
                <span>Password: <strong>kbs@admin2026</strong></span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition disabled:opacity-50"
            >
              {loginLoading ? "Verifying Credentials..." : "Access Administrator Panel"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
              Admin
            </span>
            <span className="text-sm font-bold text-white hidden sm:inline">
              KBS Public School Management Portal
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={loadDashboardData}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              Refresh Data
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-xs text-red-300 hover:text-red-100 px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 transition border border-red-800/40"
            >
              <LogOut size={14} className="mr-1.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 flex overflow-x-auto space-x-1 border-t border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "dashboard"
                ? "border-blue-500 text-white bg-slate-800/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab("admissions")}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center ${
              activeTab === "admissions"
                ? "border-blue-500 text-white bg-slate-800/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Admissions ({admissions.length})
            {stats.pendingAdmissions > 0 && (
              <span className="ml-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "announcements"
                ? "border-blue-500 text-white bg-slate-800/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Announcements & Notices ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "teachers"
                ? "border-blue-500 text-white bg-slate-800/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Faculty Directory ({teachers.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center ${
              activeTab === "contacts"
                ? "border-blue-500 text-white bg-slate-800/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Contact Enquiries ({contacts.length})
            {stats.unreadMessages > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white">
                {stats.unreadMessages}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Toast notifications */}
      {actionMessage.text && (
        <div className="container mx-auto px-4 mt-4">
          <div
            className={`p-3.5 rounded-xl text-sm font-semibold flex items-center ${
              actionMessage.type === "success"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : actionMessage.type === "error"
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-blue-100 text-blue-800 border border-blue-200"
            }`}
          >
            {actionMessage.type === "success" ? (
              <CheckCircle size={18} className="mr-2 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        {/* ============================================================== */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ============================================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Metric Tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                  <span>Admissions</span>
                  <GraduationCap size={18} className="text-blue-600" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {admissions.length}
                </div>
                <div className="text-xs text-amber-600 font-medium mt-1">
                  {stats.pendingAdmissions || 0} Pending Review
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                  <span>Announcements</span>
                  <Bell size={18} className="text-indigo-600" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {announcements.length}
                </div>
                <div className="text-xs text-emerald-600 font-medium mt-1">
                  Active On Website
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                  <span>Faculty Members</span>
                  <Users size={18} className="text-purple-600" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {teachers.length}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Across 4 Wings
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                  <span>Inquiries</span>
                  <Mail size={18} className="text-pink-600" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {contacts.length}
                </div>
                <div className="text-xs text-red-600 font-medium mt-1">
                  {stats.unreadMessages || 0} Unread
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Admissions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Admissions */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base">
                    Recent Admission Registrations
                  </h3>
                  <button
                    onClick={() => setActiveTab("admissions")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {admissions.slice(0, 4).map((adm) => (
                    <div
                      key={adm._id}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {adm.studentName}{" "}
                          <span className="text-xs font-normal text-blue-700">
                            ({adm.gradeApplying})
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Parent: {adm.parentName} • {adm.phone}
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                        {adm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base">
                    Recent Contact Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {contacts.slice(0, 4).map((msg) => (
                    <div
                      key={msg._id}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {msg.name}{" "}
                          <span className="text-xs font-normal text-slate-500">
                            ({msg.category || "General"})
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 truncate mt-0.5">
                          {msg.subject}
                        </div>
                      </div>
                      <span
                        className={`text-[11px] px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${
                          msg.isRead
                            ? "bg-slate-200 text-slate-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {msg.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ADMISSIONS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "admissions" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Admission Applications (2026-27)
                </h2>
                <p className="text-xs text-slate-500">
                  Review registrations submitted through online portal or office counter.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">App No</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Class</th>
                    <th className="p-3.5">Parent Details</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissions.map((adm) => (
                    <tr key={adm._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-bold font-mono text-blue-900 text-xs">
                        {adm.applicationNumber || adm._id}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-900">
                        {adm.studentName}
                        <div className="text-[11px] font-normal text-slate-500">
                          DOB: {adm.dob || "N/A"} • {adm.gender}
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-slate-800">
                        {adm.gradeApplying}
                      </td>
                      <td className="p-3.5">
                        {adm.parentName}
                        <div className="text-xs text-slate-500">
                          {adm.parentRelation || "Parent"}
                        </div>
                      </td>
                      <td className="p-3.5 text-xs">
                        <div>{adm.phone}</div>
                        <div className="text-slate-400">{adm.email || "N/A"}</div>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={adm.status || "Under Review"}
                          onChange={(e) => handleStatusChange(adm._id, e.target.value)}
                          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending Documents">Pending Documents</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteAdmission(adm._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          title="Delete application"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {admissions.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No admission applications recorded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: ANNOUNCEMENTS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "announcements" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Announcement Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center">
                <Plus size={18} className="mr-1.5 text-blue-600" />
                Publish Notice / Circular
              </h3>

              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                    required
                    placeholder="e.g. Schedule of Term Examination"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Type
                    </label>
                    <select
                      value={announcementForm.type}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    >
                      <option value="news">News</option>
                      <option value="event">Event</option>
                      <option value="academic">Academic</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={announcementForm.category}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value })}
                      placeholder="e.g. Exam, Sports"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Content / Circular Body *
                  </label>
                  <textarea
                    rows="4"
                    value={announcementForm.body}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, body: e.target.value })}
                    required
                    placeholder="Enter detailed notice content for parents and students..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-900 text-white font-bold text-sm rounded-xl hover:bg-blue-800 transition"
                >
                  Publish Notice
                </button>
              </form>
            </div>

            {/* Existing Announcements List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Published Announcements ({announcements.length})
              </h3>

              <div className="space-y-3">
                {announcements.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 rounded-xl border border-slate-200 hover:shadow-md transition flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {item.body}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteAnnouncement(item._id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      title="Delete notice"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: TEACHERS / FACULTY MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "teachers" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Teacher Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center">
                <Plus size={18} className="mr-1.5 text-blue-600" />
                Add Faculty Member
              </h3>

              <form onSubmit={handleTeacherSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Qualification *
                  </label>
                  <input
                    type="text"
                    value={teacherForm.qualification}
                    onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                    required
                    placeholder="e.g. M.Sc. Physics, B.Ed."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={teacherForm.designation}
                    onChange={(e) => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                    required
                    placeholder="e.g. Senior Science Educator"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Wing Section
                    </label>
                    <select
                      value={teacherForm.section}
                      onChange={(e) => setTeacherForm({ ...teacherForm, section: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Pre-Primary">Pre-Primary</option>
                      <option value="Primary">Primary</option>
                      <option value="Middle">Middle</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Experience (Yrs)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={teacherForm.experience}
                      onChange={(e) => setTeacherForm({ ...teacherForm, experience: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Subjects (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={teacherForm.subjects}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subjects: e.target.value })}
                    placeholder="Physics, Chemistry, Astronomy"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-900 text-white font-bold text-sm rounded-xl hover:bg-blue-800 transition"
                >
                  Save Teacher Profile
                </button>
              </form>
            </div>

            {/* Existing Teachers Grid */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Faculty Members ({teachers.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map((t) => (
                  <div
                    key={t._id}
                    className="p-4 rounded-xl border border-slate-200 hover:shadow-md transition flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={t.photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400"}
                        alt={t.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                        <div className="text-xs text-blue-700 font-semibold">{t.designation}</div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {t.section} • {t.experience} yrs exp
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTeacher(t._id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      title="Remove teacher"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: CONTACT MESSAGES */}
        {/* ============================================================== */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Parent & Visitor Inquiries ({contacts.length})
            </h2>

            <div className="divide-y divide-slate-100">
              {contacts.map((c) => (
                <div
                  key={c._id}
                  className={`p-4 rounded-xl my-2 flex items-start justify-between gap-4 transition ${
                    c.isRead ? "bg-white" : "bg-blue-50/50 border border-blue-100"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                      <span className="text-xs text-slate-500">• {c.email}</span>
                      {c.phone && <span className="text-xs text-slate-500">• {c.phone}</span>}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {c.category || "General"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{c.subject}</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{c.message}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!c.isRead && (
                      <button
                        onClick={() => handleMarkRead(c._id)}
                        className="text-xs px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-semibold"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteContact(c._id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {contacts.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No inquiries received yet.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
