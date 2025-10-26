const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blurred album backdrop */}
      <div className="absolute inset-0">
        <img
          src="/assets/albums/ships-that-pass-in-the-night.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className="h-full w-full scale-110 object-cover blur-[120px] brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

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
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Glowing orbs */}
      <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-foreground/20 rounded-full blur-sm animate-pulse-slow" />
      <div className="absolute bottom-[40%] left-[10%] w-2 h-2 bg-foreground/20 rounded-full blur-sm animate-pulse-slower" />
    </div>
  );
};

export default BackgroundAnimation;
