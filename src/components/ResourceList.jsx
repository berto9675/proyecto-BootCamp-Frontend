import { useState, useEffect, useMemo } from "react";
import { getUserResources } from "../services/ResourceService";
import CommentModal from "./CommentModal"; 
import axios from "axios";

const ResourceList = ({ selectedCategory, selectedSubcategory, userId, userEmail }) => {
  if (!userId || !userEmail) {
    return <p>Cargando usuario...</p>;
  }
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResourceId, setSelectedResourceId] = useState(null); 

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getUserResources(selectedCategory, selectedSubcategory);
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [selectedCategory, selectedSubcategory]);

  const filteredResources = useMemo(() => {
    return resources.filter((res) =>
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [resources, searchQuery]);

  const downloadFile = async (id, fileName, fileType) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/resources/file/json/id/${id}`);

      if (!response.data || !response.data.fileData) {
        alert("El archivo no está disponible.");
        return;
      }

      const base64File = response.data.fileData;
      const mimeType = response.data.fileType || "application/octet-stream";
      const byteCharacters = atob(base64File);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const fileBlob = new Blob([byteArray], { type: mimeType });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileBlob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
      alert("Hubo un error al descargar el archivo.");
    }
  };

  return (
    <div className="bg-[#D9B2FF] rounded-lg shadow-lg p-6">
      <ul className="space-y-4">
        {filteredResources.map((res) => (
          <li key={res.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{res.title}</h3>
            <p className="text-gray-600">{res.description}</p>
          
            <div className="mt-3 flex flex-wrap gap-2">
              {res.fileName && (
                <>
                  <a
                    href={`http://localhost:8080/api/resources/file/name/${encodeURIComponent(res.fileName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#6A0DAD] text-white px-4 py-2 rounded-lg hover:bg-[#4E097C] transition"
                  >
                    📂 Ver Archivo
                  </a>

                  <button
                    onClick={() => downloadFile(res.id, res.fileName, res.fileType)}
                    className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e65c00] transition"
                  >
                    ⬇️ Descargar
                  </button>
                </>
              )}

              {res.url && !res.fileName && (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  🌍 Abrir Enlace
                </a>
              )}           
              <button
                onClick={() => setSelectedResourceId(res.id)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
              >
                🗨️ Ver Comentarios
              </button>
            </div>
          </li>
        ))}
      </ul>    
      {selectedResourceId && userId && ( 
       <CommentModal
         resourceId={selectedResourceId} 
         userId={userId} 
         userEmail={userEmail} 
         closeModal={() => setSelectedResourceId(null)} 
       />
      )}
    </div>
  );
};

export default ResourceList;


