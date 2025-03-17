import { useState } from "react";
import axios from "axios";

const ResourceForm = ({ onResourceAdded, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [subcategory, setSubcategory] = useState("");
  const [type, setType] = useState("URL");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const subcategories = {
    Frontend: ["HTML", "CSS", "JAVASCRIPT", "REACT"],
    Backend: ["SPRING BOOT", "NODE.JS", "API REST"],
    Testing: ["JUNIT", "HAMCREST", "JEST"],
    Ciberseguridad: ["REDES", "INYECION SQL", "CCNA", "TROYANDO"]
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    if (type === "Archivo" && file) {
      formData.append("file", file);
    } else {
      formData.append("url", url);
    }

    try {
      await axios.post("http://localhost:8080/api/resources", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResourceAdded();
      closeModal();
    } catch (error) {
      console.error("Error al subir el recurso", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">

        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ❌
        </button>

        <h2 className="text-xl font-bold text-[#6A0DAD] mb-4">📤 Subir Recurso</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            className="w-full p-2 border rounded-lg"
          >
            {Object.keys(subcategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="" disabled>
              Selecciona una subcategoría
            </option>
            {subcategories[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="URL">Enlace (URL)</option>
            <option value="Archivo">Subir Archivo</option>
          </select>

          {type === "URL" ? (
            <input
              type="text"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-lg" />
          )}

          <button type="submit" className="w-full bg-[#FF6600] text-white py-2 rounded-lg hover:bg-[#e65c00]">
            Subir Recursos
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full bg-[#6A0DAD] text-white py-2 rounded-lg mt-2 hover:bg-[#6A0DAD]"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResourceForm;