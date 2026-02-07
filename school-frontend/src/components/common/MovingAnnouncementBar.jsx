import { Link, useNavigate } from "react-router-dom";

const MovingAnnouncementBar = () => {
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/admissions");
    // ensure scroll-to-top after navigation
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const Message = () => (
    <div className="flex items-center">
      <span className="mx-4 text-sm md:text-base whitespace-nowrap">
        • Admission Open for 2026-27 Session | Class : Nursery to 8<sup>th</sup>
      </span>
      <Link
        to="/admissions"
        onClick={handleRegisterClick}
        className="text-sm md:text-base font-semibold text-red-700 underline underline-offset-2 hover:text-red-800 mx-2 whitespace-nowrap"
      >
        Register Now
      </Link>
    </div>
  );

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40">
      {/* gives distance from screen edges on all devices */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white border-y-2 border-red-700 shadow-md rounded-md overflow-hidden">
          <div className="flex">
            {/* Left label */}
            <div className="bg-red-700 text-white font-semibold px-4 md:px-6 py-2 flex items-center text-xs md:text-sm whitespace-nowrap rounded-l-md">
              IMPORTANT UPDATES
            </div>

            {/* Marquee area */}
            <div className="relative overflow-hidden flex-1">
              <div className="h-full flex items-center">
                {/* Track is 200% wide, containing two identical sequences */}
                <div className="marquee-track flex items-center w-[200%]">
                  <div className="flex items-center">
                    <Message />
                    <span className="w-12" />
                    <Message />
                    <span className="w-12" />
                  </div>
                  <div className="flex items-center">
                    <Message />
                    <span className="w-12" />
                    <Message />
                    <span className="w-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kbs-marquee-track {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* move exactly one sequence width */
        }
        .marquee-track {
          animation: kbs-marquee-track 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MovingAnnouncementBar;
