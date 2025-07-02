import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { getInitials } from "../../utils/helper";
import { toast } from 'react-hot-toast';
import { useTheme } from "../../context/ThemeContext";
import { 
  LuSun, 
  LuMoon, 
  LuSettings, 
  LuUser,
  LuLogOut,
  LuChevronRight,
  LuChevronLeft,
  LuMenu,
  LuX
} from "react-icons/lu";

const SideMenu = ({ activeMenu, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleClick = (route) => {
    if (route === "logout" || route === "/logout") {
      handleLogout();
    } else {
      navigate(route);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      toast.success('Profile picture updated!');
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block bg-white dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-xl transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Top Section */}
        <div className="p-6">
          {/* Logo/Brand */}
          <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">💰</span>
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Expense Tracker</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage your finances</p>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="absolute -right-4 top-24 w-8 h-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110"
          >
            {isCollapsed ? <LuChevronRight size={16} /> : <LuChevronLeft size={16} />}
          </button>

          {/* User Profile Section */}
          <div className="relative mb-8">
            <div 
              className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 cursor-pointer hover:shadow-md transition-all duration-300 group ${
                isCollapsed ? 'justify-center' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                !isCollapsed && setShowUserMenu(!showUserMenu);
              }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {user ? getInitials(user.fullName) : 'U'}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-600"></div>
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {user ? user.fullName : 'User'}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user ? user.email : 'user@example.com'}
                    </p>
                  </div>
                  <LuChevronRight 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-90' : ''}`}
                  />
                </>
              )}
            </div>

            {/* User Menu Dropdown */}
            {showUserMenu && !isCollapsed && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 z-10 animate-slide-up">
                <div className="p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <LuUser size={16} />
                    Change Photo
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {isDark ? <LuSun size={16} /> : <LuMoon size={16} />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <LuSettings size={16} />
                    Settings
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-gray-600" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LuLogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {SIDE_MENU_DATA.map((item, index) => (
                          <button
              key={`menu_${index}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(item.path);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                activeMenu === item.label
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  activeMenu === item.label
                    ? 'bg-white/20'
                    : 'bg-gray-100 dark:bg-gray-600 group-hover:bg-gray-200 dark:group-hover:bg-gray-500'
                }`}>
                  <item.icon 
                    size={20} 
                    className={activeMenu === item.label ? 'text-white' : 'text-gray-600 dark:text-gray-400'} 
                  />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {activeMenu === item.label && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-bounce-gentle"></div>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto p-6">
          {!isCollapsed && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💰</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Premium Plan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Unlimited features</p>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Upgrade Now
              </button>
            </div>
          )}
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isCollapsed ? 'v1.0' : 'Expense Tracker v1.0'}
            </p>
          </div>
        </div>
      </div>



      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Expense Tracker</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage your finances</p>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {SIDE_MENU_DATA.map((item, index) => (
                  <button
                    key={`mobile_menu_${index}`}
                    onClick={() => handleClick(item.path)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeMenu === item.label
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      activeMenu === item.label
                        ? 'bg-white/20'
                        : 'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      <item.icon 
                        size={20} 
                        className={activeMenu === item.label ? 'text-white' : 'text-gray-600 dark:text-gray-400'} 
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
