import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

export const MobileLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      setScrolled(el.scrollTop > 4);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app-shell">
      <header className={`app-header ${scrolled ? "scrolled" : ""}`}>
        <Navbar />
      </header>

      <main ref={contentRef} className="app-content">
        {children}
      </main>

      <nav className="bottom-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </div>
  );
};
