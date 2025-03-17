import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
function App () {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F0FF]">
      
    <div className="flex-grow">
      <AppRoutes />
    </div>
    <Footer />
  </div>
  );
};

export default App;

