// LogoIcon.tsx – Renders the SVG logo for the application.

const backgroundWidth = 556;
const backgroundHeight = 480;

const LogoIcon = () => (
  <svg 
    viewBox="0 0 512 512" 
    xmlns="http://www.w3.org/2000/svg" 
    width="32"
    height="32"
    overflow="visible"
  >
    <rect 
      x="50%"
      y="50%"
      width={backgroundWidth}
      height={backgroundHeight}
      transform={`translate(-${backgroundWidth / 2}, -${backgroundHeight / 2})`}
      fill="#E53E3E" 
      rx="80" 
      ry="80"
    />
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="central" 
      textAnchor="middle" 
      fontFamily="Roboto Flex, sans-serif"
      fontWeight="700"
      style={{
        fontVariationSettings: "'wght' 700",
        paintOrder: "stroke fill",
        stroke: "#ffffff",
        strokeWidth: "1px",
        strokeLinejoin: "round"
      }}
      fill="#FFFFFF" 
      fontSize="456"
    >
      Jo
    </text>
  </svg>
);

export default LogoIcon;
