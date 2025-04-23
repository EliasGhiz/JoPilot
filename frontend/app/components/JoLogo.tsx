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

  // Fetch SVG content using async/await
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const res = await fetch("/JoLogo.svg");
        const text = await res.text();
        const cleaned = text.replace(/<\?xml.*?\?>\s*/, "").trim();
        setSvg(cleaned);
      } catch (err) {
        console.error("Error loading SVG:", err);
      }
    };
    fetchSvg();
  }, []);

  // Update SVG styling and container dimensions
  useEffect(() => {
    if (svg && containerRef.current) {
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.style.display = "block";
        if (!svgEl.getAttribute("preserveAspectRatio")) {
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
        const customHeight = (style as React.CSSProperties)?.height;
        if (customHeight) {
          const heightStr =
            typeof customHeight === "number" ? customHeight + "px" : customHeight;
          svgEl.style.height = heightStr;
          containerRef.current.style.height = heightStr;
        } else {
          const { width, height } = svgEl.getBoundingClientRect();
          containerRef.current.style.width = `${width}px`;
          containerRef.current.style.height = `${height}px`;
        }
        // Force 'Roboto Flex' font on all text elements
        svgEl.setAttribute("font-family", "'Roboto Flex', sans-serif");
        svgEl.querySelectorAll("text").forEach(textEl => {
          textEl.style.cssText += "; font-family: 'Roboto Flex', sans-serif !important;";
        });
      }
      setIsLoaded(true);
      onLoad?.();
    }
  }, [svg, onLoad, style]);

  // Update CSS variables for colors when props change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--primary-color", primaryColor || "#FFFFFF");
      containerRef.current.style.setProperty("--secondary-color", secondaryColor || "#FFFFFF");
    }
  }, [primaryColor, secondaryColor]);

  const customStyles = {
    verticalAlign: "middle",
    opacity: isLoaded ? 1 : 0,
    ...style,
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
