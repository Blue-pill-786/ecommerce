import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MobileLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app-shell">
      <header className={`app-header fixed ${scrolled ? "scrolled" : ""}`}>
        <h1>Kashmir Market</h1>
        <p>Srinagar & Nearby</p>
      </header>

      <main className="app-content">{children}</main>

      <nav className="bottom-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </div>
  );
};
