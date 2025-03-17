import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ResourceList from "../components/ResourceList";
import ResourceForm from "../components/ResourceForm";
import axios from "axios";

const Dashboard = () => {
  const { user, isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [selectedSubcategory, setSelectedSubcategory] = useState("HTML");
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      fetchResources();
    }
  }, [selectedCategory, selectedSubcategory]);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/resources`, {
        params: {
          category: selectedCategory,
          subcategory: selectedSubcategory,
        },
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources", error);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-700">
        <p className="text-xl">
          ⚠️ Cargando usuario... Por favor, espera.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0FF]">
      <Header setSelectedCategory={setSelectedCategory} setSelectedSubcategory={setSelectedSubcategory} />

      <div className="flex p-6">
        <Sidebar selectedCategory={selectedCategory} setSelectedSubcategory={setSelectedSubcategory} />

        <div className="flex-grow bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-[#6A0DAD]" />
            <div>
              <h2 className="text-2xl font-bold text-[#6A0DAD]">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <button onClick={() => {
            handleLogout();
            navigate("/");
          }}
            className="mb-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" > Cerrar Sesión
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#e65c00] transition float-right" > + Subir Recurso
          </button>

          <h2 className="text-2xl font-bold text-[#6A0DAD] mb-4">
            📚 Tus Recursos - {selectedCategory} / {selectedSubcategory}
          </h2>

          <ResourceList
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            userId={user?.id}
            userEmail={user?.email}
          />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-lg w-96">
                <ResourceForm onResourceAdded={fetchResources} closeModal={() => setIsModalOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
