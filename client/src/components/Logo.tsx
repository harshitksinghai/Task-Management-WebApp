
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      {/*<img src="/assets/react.svg" height="40" width="40" alt="Logo" className="dark:hidden"/> {/* img shown only in light mode */}
      {/*<img src="/assets/react.svg" height="40" width="40" alt="Logo" className="hidden dark:block"/> {/* img shown only in dark mode */}
      <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
      <p className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
        WorkNow
      </p>
    </div>
  );
};

export default Logo;
