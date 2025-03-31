// JoLogo.tsx - React component wrapper for JoLogo.svg to enable custom text colors and styling/effects

import React, { useState, useEffect, useRef } from "react";

interface JoLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryColor?: string;
  secondaryColor?: string;
  onLoad?: () => void;
}

const JoLogo: React.FC<JoLogoProps> = ({ primaryColor, secondaryColor, onLoad, style, ...rest }) => {
  const [svg, setSvg] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch svg content on mount
  useEffect(() => {
    // fetch logo svg file
    fetch("/JoLogo.svg")
      .then((res) => res.text())
      .then((text) => {
        // remove xml header, trim svg text
        const cleaned = text.replace(/<\?xml.*?\?>\s*/, "").trim();
        setSvg(cleaned);
      })
      .catch((err) => console.error("Error loading SVG:", err));
  }, []);

  // After svg is set, update svg style and container dimensions
  useEffect(() => {
    if (svg && containerRef.current) {
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        // set svg element size and center it
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";
        svgEl.style.display = "block";
        svgEl.style.margin = "0 auto";
        // ensure proper aspect ratio if not preset
        if (!svgEl.getAttribute("preserveAspectRatio")) {
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
        const gEl = svgEl.querySelector("g");
        if (gEl) {
          // adjust viewBox based on svg group's bbox for scaling
          const bbox = gEl.getBBox();
          const yOffset = bbox.y < 0 ? -bbox.y : 0;
          const adjustedY = bbox.y + yOffset;
          const adjustedHeight = bbox.height - yOffset;
          svgEl.setAttribute("viewBox", `${bbox.x} ${adjustedY} ${bbox.width} ${adjustedHeight}`);
        }
        // measure final dimensions, set container size explicitly
        const rect = svgEl.getBoundingClientRect();
        if (containerRef.current) {
          containerRef.current.style.width = rect.width + "px";
          containerRef.current.style.height = rect.height + "px";
        }
      }
      setIsLoaded(true);
      // signal parent that logo's ready
      onLoad?.();
    }
  }, [svg, onLoad]);

  // Update container css props when color props change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--primary-color", primaryColor || "#FFFFFF");
      containerRef.current.style.setProperty("--secondary-color", secondaryColor || "#FFFFFF");
    }
  }, [primaryColor, secondaryColor]);

  const customStyles = {
    display: "inline-block",
    verticalAlign: "bottom",
    opacity: isLoaded ? 1 : 0, // show only when svg loaded
    ...style
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      style={customStyles}
      {...rest}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default JoLogo;
