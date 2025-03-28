// JoLogo.tsx - React component wrapper for JoLogo.svg to enable custom text colors.

import React, { useState, useEffect, useRef } from "react";

interface JoLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryColor?: string;
  secondaryColor?: string;
}

const JoLogo: React.FC<JoLogoProps> = ({ primaryColor, secondaryColor, style, ...rest }) => {
  const [svg, setSvg] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/JoLogo.svg")
      .then((res) => res.text())
      .then((text) => {
        // Remove XML declaration if present
        const cleaned = text.replace(/<\?xml.*?\?>\s*/, "");
        setSvg(cleaned);
      })
      .catch((err) => console.error("Error loading SVG:", err));
  }, []);

  useEffect(() => {
    if (svg && containerRef.current) {
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        // Ensure SVG respects container sizing
        svgEl.style.width = "100%";
        svgEl.style.height = "100%";
      }
    }
  }, [svg]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--primary-color", primaryColor || "#FFFFFF");
      containerRef.current.style.setProperty("--secondary-color", secondaryColor || "#FFFFFF");
    }
  }, [primaryColor, secondaryColor]);

  const customStyles = {
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      {...rest}
      style={customStyles}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default JoLogo;
