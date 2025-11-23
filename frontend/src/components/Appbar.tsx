import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../logout";

const AppBar: React.FC = () => {
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Ref for the dropdown and the button
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountIconRef = useRef<HTMLSpanElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

   // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        accountIconRef.current && !accountIconRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs only once when component mounts



    const token = localStorage.getItem("access");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleAccountClick = () => {
        navigate("/profile");
    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    const handlePurchasedClick = () => {
        navigate("/purchased");
    };

    const handleLogoClick = () => {
        navigate("/courses");
    };

    return (
        <div style={{ height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "transparent", color: "#148FA2" }}>
            <div style={{ cursor: "pointer", fontWeight: "bold" }} onClick={handleLogoClick}>
               <img src="/logo.svg" alt="" />
               <p>EduCoursera</p>
            </div>
            {token ? (
                <div style={{display:"flex", justifyContent: "space-between"}}>
                    <span style={{ marginRight: "10px", cursor: "pointer" }} onClick={handlePurchasedClick}><img src="/purchased.svg" alt="Logout" style={{ width: '20px', height: '20px' }} /></span>
                    <span style={{ marginRight: "10px", cursor: "pointer" }} onClick={handleCartClick}><span className="material-symbols-outlined">
                        <img src="/cart.svg" alt="Logout" style={{ width: '20px', height: '20px' }} />
                    </span></span>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        ref={accountIconRef}
        style={{
          marginRight: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={toggleDropdown}
      >
        {/* Account Icon - using the SVG file from the public folder */}
        <img src="/account.svg" alt="Account" style={{ width: '24px', height: '24px' }} />
      </span>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '30px',
            right: '0',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '150px',
            padding: '10px 0',
            zIndex: 1,
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#148FA2',
            }}
          >
            {/* Logout Icon - using the SVG file from the public folder */}
            <img src="/logout.svg" alt="Logout" style={{ width: '20px', height: '20px' }} />
            <span style={{ marginLeft: '10px' }}>Logout</span>
          </button>
        </div>
      )}
    </div>
                </div>
            ) : (<div>
                <span style={{ marginRight: "10px", cursor: "pointer" }} className="btn-outline" onClick={() => window.location.href = "/login"}>
                    Login
                </span>
                <span style={{ marginRight: "10px", cursor: "pointer" }} className="btn-primary-custom" onClick={() => window.location.href = "/register"}>
                    Register
                </span>
            </div>)}
        </div>
    );
};

export default AppBar;
