import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitAdmission } from "../../services/api";
import { jsPDF } from "jspdf";
import {
  X,
  GraduationCap,
  CheckCircle,
  FileText,
  Download,
  Printer,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";

const AdmissionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "Male",
    gradeApplying: "Nursery",
    parentName: "",
    parentRelation: "Father",
    email: "",
    phone: "",
    address: "",
    city: "Raebareli",
    state: "Uttar Pradesh",
    previousSchool: "",
    transportRequired: false
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.studentName.trim() || !formData.parentName.trim() || !formData.phone.trim()) {
      setError("Please fill in all mandatory fields (*)");
      setLoading(false);
      return;
    }

    try {
      const response = await submitAdmission(formData);
      if (response.data && response.data.success) {
        setSubmittedData(response.data.data);
      } else {
        setError(response.data?.error || "Failed to submit application");
      }
    } catch (err) {
      console.error("Admission submission error:", err);
      setError("Network error while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!submittedData) return;

    try {
      const doc = new jsPDF();

      // Header
      doc.setFillColor(30, 58, 138); // Royal blue
      doc.rect(0, 0, 210, 36, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("KBS PUBLIC SCHOOL", 105, 16, { align: "center" });

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Gaura Garhi, Raebareli, Uttar Pradesh 229204 | CBSE Affiliated (UDISE: 9281002502)", 105, 24, { align: "center" });
      doc.text("Phone: +91 80522 42453 / +91 99196 88800 | Email: kbsps@gmail.com", 105, 30, { align: "center" });

      // Title
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("ONLINE ADMISSION REGISTRATION RECEIPT (2026-27)", 105, 48, { align: "center" });

      // Application Badge
      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(15, 54, 180, 22, 3, 3, "FD");

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 58, 138);
      doc.text(`Application No: ${submittedData.applicationNumber || "KBS-2026-PENDING"}`, 22, 64);
      doc.setTextColor(16, 185, 129);
      doc.text(`Status: ${submittedData.status || "Under Review"}`, 22, 71);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`Submitted On: ${new Date(submittedData.submittedAt || Date.now()).toLocaleString()}`, 130, 68);

      // Section 1: Candidate Details
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("1. Student Details", 15, 86);

      doc.setDrawColor(226, 232, 240);
      doc.line(15, 88, 195, 88);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Student Name: ${submittedData.studentName}`, 20, 96);
      doc.text(`Date of Birth: ${submittedData.dob || "N/A"}`, 120, 96);
      doc.text(`Gender: ${submittedData.gender}`, 20, 104);
      doc.text(`Class Applying For: ${submittedData.gradeApplying}`, 120, 104);
      doc.text(`Previous School: ${submittedData.previousSchool || "N/A"}`, 20, 112);
      doc.text(`School Transport Required: ${submittedData.transportRequired ? "Yes" : "No"}`, 120, 112);

      // Section 2: Parent / Guardian Details
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("2. Parent / Guardian Information", 15, 126);
      doc.line(15, 128, 195, 128);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Parent/Guardian Name: ${submittedData.parentName} (${submittedData.parentRelation})`, 20, 136);
      doc.text(`Primary Mobile: ${submittedData.phone}`, 120, 136);
      doc.text(`Email Address: ${submittedData.email || "N/A"}`, 20, 144);
      doc.text(`City / District: ${submittedData.city}, ${submittedData.state}`, 120, 144);
      doc.text(`Residential Address: ${submittedData.address || "Gaura Garhi, Raebareli"}`, 20, 152);

      // Instructions Box
      doc.setFillColor(254, 243, 199); // Amber
      doc.setDrawColor(251, 191, 36);
      doc.roundedRect(15, 166, 180, 52, 3, 3, "FD");

      doc.setTextColor(146, 64, 14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Important Instructions For Parents:", 20, 174);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(120, 53, 15);
      doc.text("1. Please bring a printed copy of this receipt on the day of interaction/test.", 20, 182);
      doc.text("2. Required documents: Original Birth Certificate, 2 passport photos, and previous report card.", 20, 189);
      doc.text("3. Admissions office hours: Monday to Saturday, 8:30 AM to 1:30 PM.", 20, 196);
      doc.text("4. For any questions, please contact our admissions desk at +91 80522 42453 / kbsps@gmail.com.", 20, 203);
      doc.text("5. All admission decisions are subject to seat availability and administrative verification.", 20, 210);

      // Footer Signatures
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      doc.text("Parent / Guardian Signature: __________________", 20, 245);
      doc.text("Authorized School Seal & Signature: __________________", 110, 245);

      doc.setFontSize(8);
      doc.text("This is an electronically generated acknowledgment from KBS Public School Portal.", 105, 270, { align: "center" });

      doc.save(`KBS_Admission_${submittedData.applicationNumber || "Receipt"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Unable to generate PDF. Please print the screen directly.");
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      studentName: "",
      dob: "",
      gender: "Male",
      gradeApplying: "Nursery",
      parentName: "",
      parentRelation: "Father",
      email: "",
      phone: "",
      address: "",
      city: "Raebareli",
      state: "Uttar Pradesh",
      previousSchool: "",
      transportRequired: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 my-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
        >
          <X size={20} />
        </button>

        {!submittedData ? (
          <>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white flex items-center justify-center shadow-md">
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                  Online Admission Application
                </h2>
                <p className="text-xs text-slate-500">
                  Academic Session 2026-27 • Nursery to Class VIII
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs md:text-sm flex items-center">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Section 1: Student Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center">
                  <User size={14} className="mr-1.5 text-blue-600" />
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Aarav Sharma"
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Class Applying For *
                    </label>
                    <select
                      name="gradeApplying"
                      value={formData.gradeApplying}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-blue-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Nursery">Nursery (Age 3+)</option>
                      <option value="LKG">LKG (Age 4+)</option>
                      <option value="UKG">UKG (Age 5+)</option>
                      <option value="Class I">Class I</option>
                      <option value="Class II">Class II</option>
                      <option value="Class III">Class III</option>
                      <option value="Class IV">Class IV</option>
                      <option value="Class V">Class V</option>
                      <option value="Class VI">Class VI</option>
                      <option value="Class VII">Class VII</option>
                      <option value="Class VIII">Class VIII</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Parent Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center">
                  <Phone size={14} className="mr-1.5 text-blue-600" />
                  Parent / Guardian Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Relationship
                    </label>
                    <select
                      name="parentRelation"
                      value={formData.parentRelation}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Village / Mohalla, Landmark"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 3: Additional Notes & Transport */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Previous School Attended (If any)
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder="e.g. Primary School Gaura"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center pt-4 md:pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="transportRequired"
                        checked={formData.transportRequired}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="ml-2.5 text-xs md:text-sm font-semibold text-slate-800">
                        Require School Bus / Van Transport
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
                >
                  {loading ? "Submitting Application..." : "Submit Online Application"}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle size={36} />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Application Successfully Submitted!
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Your child's registration has been recorded at KBS Public School. Please save or download your official registration slip.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl max-w-md mx-auto mb-6 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-3">
                <span className="text-xs text-slate-500 font-medium">Application Number:</span>
                <span className="text-base font-extrabold text-blue-900">
                  {submittedData.applicationNumber}
                </span>
              </div>
              <div className="text-xs space-y-1.5 text-slate-700">
                <div><strong>Student Name:</strong> {submittedData.studentName}</div>
                <div><strong>Class Applying:</strong> {submittedData.gradeApplying}</div>
                <div><strong>Parent / Contact:</strong> {submittedData.parentName} ({submittedData.phone})</div>
                <div><strong>Status:</strong> <span className="text-emerald-700 font-semibold">{submittedData.status || "Under Review"}</span></div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition"
              >
                <Download size={16} className="mr-2" />
                Download PDF Receipt
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition"
              >
                Submit Another Application
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm rounded-xl transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdmissionModal;
