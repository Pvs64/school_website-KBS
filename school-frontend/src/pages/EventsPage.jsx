import { useEffect, useMemo, useState } from "react";
import { 
  CalendarDays, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Sparkles, 
  Filter, 
  Download, 
  Share2, 
  Printer, 
  ChevronDown,
  School,
  Award,
  Trophy,
  Users,
  BookOpen,
  Sun,
  Star,
  Zap,
  TrendingUp,
  ChevronRight,
  Search,
  Bell,
  Home,
  CheckCircle,
  ExternalLink,
  Layers,
  BarChart
} from "lucide-react";
import { Link } from "react-router-dom";

const eventsByMonth = [
  {
    month: "MARCH 2025",
    items: [
      { day: "16", weekday: "Sunday", title: "Janmashtami", type: "Holiday", highlight: true },
    ],
  },
  {
    month: "APRIL 2025",
    items: [
      { day: "24", weekday: "Monday", title: "Beginning of New Session 2025–26", type: "Academic", highlight: true },
      { day: "29", weekday: "Friday", title: "Ram Navami", type: "Holiday" },
      { day: "30", weekday: "Saturday", title: "Mahaveer Jayanti", type: "Holiday" },
      { day: "—", weekday: "—", title: "Maths Olympiad (Class I onwards)", type: "Competition" },
      { day: "—", weekday: "—", title: "Major Dhyan Chand Anniversary Celebration", type: "Celebration" },
      { day: "—", weekday: "—", title: "Inter Branch Hindi Debate Competition", type: "Competition", highlight: true },
    ],
  },
  {
    month: "MAY 2025",
    items: [
      { day: "03", weekday: "Saturday", title: "Inter House English Debate Competition", type: "Competition" },
      { day: "26", weekday: "Saturday", title: "Good Friday", type: "Holiday" },
      { day: "—", weekday: "—", title: "Art Competition", type: "Competition" },
      { day: "—", weekday: "—", title: "Collage Competition", type: "Competition" },
    ],
  },
  {
    month: "JUNE 2025",
    items: [
      { day: "07", weekday: "Saturday", title: "Buddh Poornima", type: "Holiday" },
      { day: "21", weekday: "Saturday", title: "Parent Teacher Meeting", type: "PTM" },
      { day: "26", weekday: "Saturday", title: "School closes for Summer Vacation", type: "Holiday", highlight: true },
    ],
  },
  {
    month: "JULY 2025",
    items: [
      { day: "01", weekday: "Tuesday", title: "Id-ul-Zuha", type: "Holiday" },
      { day: "07–19", weekday: "Mon–Sat", title: "International Yoga Day & School reopens", type: "Academic", highlight: true },
      { day: "—", weekday: "—", title: "I Test / I Term Examination", type: "Academic" },
      { day: "—", weekday: "—", title: "Moharram", type: "Holiday" },
      { day: "—", weekday: "—", title: "Inter House Hindi Debate Competition", type: "Competition" },
      { day: "—", weekday: "—", title: "Parent Teacher Meeting", type: "PTM" },
    ],
  },
  {
    month: "AUGUST 2025",
    items: [
      { day: "02", weekday: "Saturday", title: "Raksha Bandhan", type: "Holiday" },
      { day: "14", weekday: "Thursday", title: "Inter House Declamation Competition", type: "Competition" },
      { day: "15", weekday: "Friday", title: "Independence Day Celebration", type: "Celebration", highlight: true },
      { day: "01–02", weekday: "Wed–Thu", title: "Checking and Stamping of Notebooks", type: "Academic" },
      { day: "07", weekday: "Tuesday", title: "World Students Day", type: "Observation", highlight: true },
      { day: "15", weekday: "Wednesday", title: "Parent Teacher Meeting", type: "PTM" },
      { day: "18", weekday: "Saturday", title: "Deepawali Holidays Begin", type: "Holiday" },
    ],
  },
  {
    month: "SEPTEMBER 2025",
    items: [
      { day: "01", weekday: "Monday", title: "Online Registration Open", type: "Academic", highlight: true },
      { day: "04–17", weekday: "Thu–Wed", title: "III Test / MCQ", type: "Academic" },
      { day: "—", weekday: "—", title: "I Pre-Board Examination", type: "Academic" },
    ],
  },
  {
    month: "OCTOBER 2025",
    items: [
      { day: "12", weekday: "Monday", title: "Checking and Stamping of Copies", type: "Academic" },
      { day: "20", weekday: "Tuesday", title: "Dussehra", type: "Holiday", highlight: true },
      { day: "07", weekday: "Saturday", title: "Parent Teacher Meeting", type: "PTM" },
    ],
  },
  {
    month: "NOVEMBER 2025",
    items: [
      { day: "—", weekday: "—", title: "Guru Nanak Jayanti", type: "Holiday" },
      { day: "—", weekday: "—", title: "Inter House G.K. Quiz", type: "Competition" },
      { day: "—", weekday: "—", title: "Children's Day", type: "Celebration" },
      { day: "11–14", weekday: "Wed–Sat", title: "Inter Branch G.K. Quiz", type: "Competition" },
      { day: "15", weekday: "Sunday", title: "Second Admission Test", type: "Academic" },
    ],
  },
  {
    month: "DECEMBER 2025",
    items: [
      { day: "25", weekday: "Thursday", title: "Christmas", type: "Holiday", highlight: true },
      { day: "27", weekday: "Saturday", title: "Parent Teacher Meeting", type: "PTM" },
      { day: "29 Dec – 03 Jan 26", weekday: "Mon–Sat", title: "Winter Vacation", type: "Holiday" },
    ],
  },
  {
    month: "JANUARY 2026",
    items: [
      { day: "05", weekday: "Monday", title: "School reopens after Winter Vacation", type: "Academic" },
      { day: "12–24", weekday: "Mon–Sat", title: "II Pre-Board Examination", type: "Academic" },
      { day: "18", weekday: "Sunday", title: "First Admission Test", type: "Academic", highlight: true },
      { day: "26", weekday: "Monday", title: "Republic Day", type: "Celebration", highlight: true },
    ],
  },
  {
    month: "FEBRUARY 2026",
    items: [
      { day: "—", weekday: "—", title: "Annual Examination", type: "Academic" },
    ],
  },
  {
    month: "MARCH 2026",
    items: [
      { day: "—", weekday: "—", title: "Holi", type: "Holiday" },
      { day: "14", weekday: "Saturday", title: "Annual Examination Result & Prize Distribution", type: "Ceremony", highlight: true },
      { day: "24", weekday: "Tuesday", title: "New Session 2026–27 Begins", type: "Academic", highlight: true },
    ],
  },
];

// Color theme matching your project (pink-to-teal gradient)
const typeColors = {
  Holiday: {
    bg: "bg-gradient-to-br from-pink-50 to-rose-50",
    text: "text-pink-700",
    border: "border-pink-100",
    icon: <Sun size={14} className="text-pink-500" />,
    accent: "from-pink-400 to-rose-400",
  },
  PTM: {
    bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
    text: "text-teal-700",
    border: "border-teal-100",
    icon: <Users size={14} className="text-teal-500" />,
    accent: "from-teal-400 to-emerald-400",
  },
  Competition: {
    bg: "bg-gradient-to-br from-purple-50 to-indigo-50",
    text: "text-purple-700",
    border: "border-purple-100",
    icon: <Trophy size={14} className="text-purple-500" />,
    accent: "from-purple-400 to-indigo-400",
  },
  Observation: {
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    text: "text-amber-700",
    border: "border-amber-100",
    icon: <Star size={14} className="text-amber-500" />,
    accent: "from-amber-400 to-yellow-400",
  },
  Celebration: {
    bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    text: "text-blue-700",
    border: "border-blue-100",
    icon: <Sparkles size={14} className="text-blue-500" />,
    accent: "from-blue-400 to-cyan-400",
  },
  Ceremony: {
    bg: "bg-gradient-to-br from-violet-50 to-fuchsia-50",
    text: "text-violet-700",
    border: "border-violet-100",
    icon: <Award size={14} className="text-violet-500" />,
    accent: "from-violet-400 to-fuchsia-400",
  },
  Academic: {
    bg: "bg-gradient-to-br from-slate-50 to-gray-50",
    text: "text-slate-700",
    border: "border-slate-100",
    icon: <BookOpen size={14} className="text-slate-500" />,
    accent: "from-slate-400 to-gray-400",
  },
  Default: {
    bg: "bg-gradient-to-br from-slate-50 to-gray-50",
    text: "text-slate-700",
    border: "border-slate-100",
    icon: <Bell size={14} className="text-slate-500" />,
    accent: "from-slate-400 to-gray-400",
  },
};

const EventsPage = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const summary = useMemo(() => {
    const counts = {
      holidays: 0,
      ptms: 0,
      competitions: 0,
      observations: 0,
      celebrations: 0,
      ceremonies: 0,
      academics: 0,
    };

    eventsByMonth.forEach((m) =>
      m.items.forEach((ev) => {
        if (ev.type === "Holiday") counts.holidays++;
        else if (ev.type === "PTM") counts.ptms++;
        else if (ev.type === "Competition") counts.competitions++;
        else if (ev.type === "Observation") counts.observations++;
        else if (ev.type === "Celebration") counts.celebrations++;
        else if (ev.type === "Ceremony") counts.ceremonies++;
        else if (ev.type === "Academic") counts.academics++;
      })
    );

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return {
      ...counts,
      total,
    };
  }, []);

  const filteredEvents = eventsByMonth.map(month => ({
    ...month,
    items: month.items.filter(event => {
      const matchesFilter = activeFilter === "all" || event.type === activeFilter;
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
  })).filter(month => month.items.length > 0);

  const eventTypes = [
    { id: "all", label: "All Events", icon: <Layers size={16} />, count: summary.total },
    { id: "Holiday", label: "Holidays", icon: <Sun size={16} />, count: summary.holidays },
    { id: "PTM", label: "PTMs", icon: <Users size={16} />, count: summary.ptms },
    { id: "Competition", label: "Competitions", icon: <Trophy size={16} />, count: summary.competitions },
    { id: "Celebration", label: "Celebrations", icon: <Sparkles size={16} />, count: summary.celebrations },
    { id: "Academic", label: "Academics", icon: <BookOpen size={16} />, count: summary.academics },
  ];

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthEvents = eventsByMonth.find(month => {
    const monthName = month.month.split(' ')[0].toUpperCase();
    const monthYear = parseInt(month.month.split(' ')[1]);
    // Simple logic to find current/upcoming events
    return monthYear >= currentYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
             
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <CalendarDays size={18} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Events Calendar</h1>
                  <p className="text-xs text-gray-500">Academic Year 2025-2026</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                  className="p-2 text-gray-600 hover:text-pink-600"
                  onClick={handleDownload}
                >
                  <Download size={20} />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart size={18} className="mr-2 text-pink-500" />
                Year at a Glance
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3">
                    <p className="text-xs text-pink-700">Total Events</p>
                    <p className="text-2xl font-bold text-pink-600">{summary.total}</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3">
                    <p className="text-xs text-teal-700">Holidays</p>
                    <p className="text-2xl font-bold text-teal-600">{summary.holidays}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">PTMs</span>
                    <span className="font-semibold text-teal-600">{summary.ptms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Competitions</span>
                    <span className="font-semibold text-purple-600">{summary.competitions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Celebrations</span>
                    <span className="font-semibold text-blue-600">{summary.celebrations}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Type Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter size={18} className="mr-2 text-gray-600" />
                Filter by Type
              </h3>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilter(type.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      activeFilter === type.id 
                        ? 'bg-gradient-to-r from-pink-50 to-teal-50 border border-pink-100 shadow-sm' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        activeFilter === type.id 
                          ? 'bg-gradient-to-r from-pink-500 to-teal-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {type.icon}
                      </div>
                      <span className={`font-medium ${
                        activeFilter === type.id ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {type.label}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      activeFilter === type.id ? 'text-pink-600' : 'text-gray-400'
                    }`}>
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-gradient-to-br from-pink-50 to-teal-50 rounded-xl border border-pink-100 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Legend</h3>
              <div className="space-y-3">
                {Object.entries(typeColors).map(([type, config]) => (
                  type !== 'Default' && (
                    <div key={type} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${config.accent}`}></div>
                      <span className="text-sm text-gray-700">{type}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Calendar */}
          <div className="lg:col-span-3">
            {/* Current Month Highlight */}
            {currentMonthEvents && currentMonthEvents.items.length > 0 && (
              <div className="mb-8 bg-gradient-to-r from-pink-600 to-teal-600 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Current Month</h2>
                      <p className="text-pink-100">Upcoming events for this month</p>
                    </div>
                    <Bell size={24} className="text-white/80" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentMonthEvents.items.slice(0, 2).map((event, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-lg font-bold">{event.day}</span>
                            <span className="text-xs">{event.weekday}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-white/80">{event.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Calendar Timeline */}
            <div className="space-y-8">
              {filteredEvents.map((monthData) => (
                <div key={monthData.month} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Month Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-900">{monthData.month}</h2>
                    <p className="text-sm text-gray-600 mt-1">{monthData.items.length} events scheduled</p>
                  </div>

                  {/* Events List */}
                  <div className="divide-y divide-gray-100">
                    {monthData.items.map((event, index) => {
                      const config = typeColors[event.type] || typeColors.Default;
                      
                      return (
                        <div 
                          key={index} 
                          className=" transition-colors duration-200"
                        >
                          <div className="px-6 py-4 group hover:bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                              {/* Date */}
                              <div className="flex-shrink-0">
                                <div
                                  className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-center px-1 ${
                                    event.highlight
                                      ? "bg-gradient-to-br from-pink-500 to-teal-500 text-white shadow-lg"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  <div className="text-[10px] font-semibold tracking-wide uppercase line-clamp-1">
                                    {event.weekday}
                                  </div>
                                  <div className="text-base font-bold leading-tight mt-0.5 break-words">
                                    {event.day}
                                  </div>
                                </div>
                              </div>

                              {/* Event Details */}
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.bg} ${config.text} ${config.border}`}
                                  >
                                    <span className="mr-1.5 flex items-center justify-center">
                                      {config.icon}
                                    </span>
                                    {event.type}
                                  </span>
                                  {event.highlight && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200">
                                      <Star size={10} className="mr-1" />
                                      Important
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors mb-1">
                                  {event.title}
                                </h3>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock size={14} className="mr-2" />
                                  <span className="mr-4">{event.weekday}</span>
                                  <MapPin size={14} className="mr-2" />
                                  <span>KBS Public School</span>
                                </div>
                              </div>

                              {/* Action */}
                              <div className="flex-shrink-0">
                                <button className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm">
                                  Details
                                  <ExternalLink size={14} className="ml-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Empty State */}
                  {monthData.items.length === 0 && (
                    <div className="px-6 py-12 text-center">
                      <CalendarDays className="mx-auto text-gray-300 mb-3" size={48} />
                      <p className="text-gray-500 font-medium">No events found</p>
                      <p className="text-sm text-gray-400 mt-1">Try changing your filters</p>
                    </div>
                  )}
                </div>
              ))}

              {/* No Results */}
              {filteredEvents.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <Search className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    No events match your search criteria. Try changing your filters or search terms.
                  </p>
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchQuery("");
                    }}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Show All Events
                  </button>
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="mt-8 bg-gradient-to-r from-pink-50 to-teal-50 border border-pink-100 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Important Information</h4>
                  <p className="text-sm text-gray-600">
                    • All dates are subject to change as per government and school notifications.<br />
                    • Parents will be notified of any changes via SMS and school app.<br />
                    • Regular attendance is required during exam periods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EventsPage;