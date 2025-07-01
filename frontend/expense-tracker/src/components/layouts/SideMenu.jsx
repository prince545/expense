 import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);

  const handleClick = (route) => {
    if (route === "logout" || route === "/logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  // CSS-in-JS styles
  const styles = {
    container: {
      width: "256px",
      backgroundColor: "#ffffff",
      height: "100%",
      borderRight: "1px solid #e5e7eb",
      padding: "16px"
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
      cursor: "pointer"
    },
    avatarCircle: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      backgroundColor: "#f3e8ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      border: "1px solid #c4b5fd"
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%"
    },
    userName: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111827"
    },
    menuButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      fontSize: "15px",
      padding: "12px 24px",
      borderRadius: "8px",
      marginBottom: "12px",
      transition: "all 0.2s ease",
      cursor: "pointer",
      border: "none",
      outline: "none",
      background: "transparent",
      textAlign: "left"
    },
    activeMenuButton: {
      color: "#ffffff",
      backgroundColor: "#3b82f6"
    },
    inactiveMenuButton: {
      color: "#374151"
    },
    icon: {
      fontSize: "20px"
    },
    hiddenInput: {
      display: "none"
    }
  };

  const getButtonStyle = (label) => ({
    ...styles.menuButton,
    ...(activeMenu === label ? styles.activeMenuButton : styles.inactiveMenuButton)
  });

  return (
    <div style={styles.container}>
      {/* Avatar Section */}
      <div style={styles.avatarContainer} onClick={handleImageClick}>
        <div style={styles.avatarCircle}>
          {avatar ? (
            <img src={avatar} alt="avatar" style={styles.avatarImage} />
          ) : (
            <span style={{ color: "#7c3aed", fontWeight: "bold", fontSize: "18px" }}>U</span>
          )}
        </div>
        <span style={styles.userName}>Alex William</span>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={styles.hiddenInput}
        onChange={handleFileChange}
      />

      {/* Side Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          style={getButtonStyle(item.label)}
          onClick={() => handleClick(item.path)}
        >
          <item.icon style={styles.icon} />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
