const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating circles */}
      <div className="absolute top-[10%] left-[15%] w-64 h-64 border border-foreground/5 rounded-full animate-float-slow" />
      <div className="absolute top-[60%] right-[20%] w-96 h-96 border border-foreground/5 rounded-full animate-float-slower" />
      <div className="absolute bottom-[20%] left-[25%] w-48 h-48 border border-foreground/5 rounded-full animate-float-medium" />
      
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Scanning lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-scan-down" />
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-foreground/10 to-transparent animate-scan-right" />
      
      {/* Glowing orbs */}
      <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-foreground/20 rounded-full blur-sm animate-pulse-slow" />
      <div className="absolute bottom-[40%] left-[10%] w-2 h-2 bg-foreground/20 rounded-full blur-sm animate-pulse-slower" />
    </div>
  );
};

export default BackgroundAnimation;
