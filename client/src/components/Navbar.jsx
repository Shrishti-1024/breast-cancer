import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.scss";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const navItems = [
    { path: "/upload", label: "Upload Scan" },
    { path: "/tips", label: "Tips & Care" },
    { path: "/find-doctor", label: "Find Doctors" },
    { path: "/free-camps", label: "Free Camps" },
    { path: "/about", label: "About Us" },
  ];

  const loadUserFromStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const storedAvatar = localStorage.getItem("userAvatar");
    setUser(storedUser || null);
    setAvatar(storedAvatar || null);
  };

  useEffect(() => {
    loadUserFromStorage();

    const syncUser = () => loadUserFromStorage();

    window.addEventListener("userAvatarChange", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("userAvatarChange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userAvatar");
    setUser(null);
    setAvatar(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const handleRegisterClick = () => {
    setMenuOpen(false);
    navigate("/register");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleNavClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  return (
    <header className="topnav">
      <div className="topnav-inner">
        {/* BRAND */}
        <button type="button" className="topnav-brand" onClick={handleLogoClick}>
          <img
            src="https://www.svgheart.com/wp-content/uploads/2021/11/breast-cancer-awareness-ribbon-symbol-free-svg-file-SvgHeart.Com.png"
            alt="HerHealth AI"
          />
          <span>HerHealth AI</span>
        </button>

        {/* DESKTOP LINKS */}
        <nav className="topnav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `topnav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="topnav-right">
          {user && (
            <div
              className="topnav-user"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              <img
                src={avatar || defaultAvatar}
                alt="profile"
                className="topnav-avatar"
              />
              <div className="topnav-user-text">
                <span className="topnav-user-name">{user.name}</span>
                <span className="topnav-user-email">{user.email}</span>
              </div>
            </div>
          )}

          {user ? (
            <button className="topnav-cta" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <button className="topnav-cta ghost" onClick={handleLoginClick}>
                Login
              </button>
              <button className="topnav-cta" onClick={handleRegisterClick}>
                Register
              </button>
            </>
          )}

          {/* HAMBURGER */}
          <button
            className="topnav-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`topnav-mobile ${menuOpen ? "open" : ""}`}>
        <div className="topnav-mobile-inner">
          {user && (
            <div className="mobile-user" onClick={handleProfileClick}>
              <img
                src={avatar || defaultAvatar}
                alt="profile"
                className="topnav-avatar"
              />
              <div className="topnav-user-text">
                <span className="topnav-user-name">{user.name}</span>
                <span className="topnav-user-email">{user.email}</span>
              </div>
            </div>
          )}

          <div className="mobile-links">
            {navItems.map((item) => (
              <button
                key={item.path}
                className="mobile-link"
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {user ? (
            <button className="mobile-cta" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: 6 }} />
              Logout
            </button>
          ) : (
            <>
              <button className="mobile-cta ghost" onClick={handleLoginClick}>
                Login
              </button>
              <button className="mobile-cta" onClick={handleRegisterClick}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
