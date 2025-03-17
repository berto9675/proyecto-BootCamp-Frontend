import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Header = ({ setSelectedCategory }) => {
  const { user, handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#FF6600] p-4 shadow-md text-white">
      <div className="w-full flex justify-between items-center px-6 md:px-12">

        <div className="flex items-center gap-8">
          <Link to="/" className="text-white text-2xl font-bold">
            <span className="font-extrabold">Stack</span>Mentor
          </Link>

          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:underline"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Recursos</span>
              <FiChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg z-50">
                {["Frontend", "Backend", "Testing"].map((category) => (
                  <button
                    key={category}
                    className="block px-4 py-2 hover:bg-[#D9B2FF] w-full text-left"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>
    </nav>
  );
};

export default Header;