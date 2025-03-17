
const Sidebar = ({ selectedCategory, setSelectedSubcategory }) => {
  const subcategories = {
    Frontend: ["HTML", "CSS", "JAVASCRIPT", "REACT"],
    Backend: ["SPRING BOOT", "NODE.JS", "API REST"],
    Testing: ["JUNIT", "HAMCREST", "JEST"],
  };
    return (
      <div className="bg-[#D9B2FF] p-6 rounded-lg shadow-lg w-56">
        <h3 className="text-[#6A0DAD] text-lg font-bold mb-4">Categorías</h3>
        {subcategories[selectedCategory].map((subcategory) => (
          <button
            key={subcategory}
            className={`block w-full px-4 py-2 mb-2 text-white font-medium rounded-lg transition-all shadow-md ${
              selectedCategory === subcategory ? "bg-[#FF6600]" : "bg-[#6A0DAD]"
            } hover:bg-[#FF6600] hover:scale-105`}
            onClick={() => setSelectedSubcategory(subcategory)}
          >
            {subcategory}
          </button>
        ))}
      </div>
    );
  };
  export default Sidebar;