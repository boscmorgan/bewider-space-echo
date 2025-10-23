const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grain texture */}
      <div className="absolute inset-0 opacity-[0.15]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.9" 
              numOctaves="4" 
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                values="0.9;0.92;0.9"
                dur="3s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
        </svg>
      </div>
      
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
