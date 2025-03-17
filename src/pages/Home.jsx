import { Link } from "react-router-dom";
import { FaRocket, FaCode, FaServer, FaBug } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F0FF] text-gray-900 p-8">

      <div className="text-center max-w-3xl">

        <h1 className="text-5xl font-extrabold text-[#FF6600] flex items-center justify-center gap-2">
          Bienvenido a StackMentor <FaRocket />
        </h1>

        <p className="text-lg text-gray-700 mt-4">
          StackMentor es una plataforma diseñada para ayudarte a encontrar los mejores
          recursos para tu <span className="font-bold">bootcamp</span> y potenciar tu aprendizaje en{" "}
          <span className="text-[#6A0DAD] font-bold">Frontend</span>,{" "}
          <span className="text-[#FF6600] font-bold">Backend</span> y{" "}
          <span className="text-[#E63946] font-bold">Testing</span>.
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-[#FF6600] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#e65c00] transition"
          >
            Regístrate Gratis
          </Link>
          <Link
            to="/login"
            className="bg-white text-[#FF6600] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#e65c00] transition border-2 border-[#FF6600]"  
          >
            Inicia Sesión
          </Link>
        </div>
      </div>


      <div className="mt-12 text-center">

        <p className="text-gray-600 mb-6">
          Explora nuestra biblioteca de contenido organizada en tres grandes categorías:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/explore/Frontend"
            className="p-6 bg-white rounded-lg shadow-lg border border-[#6A0DAD] hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <FaCode className="text-4xl text-[#6A0DAD] mb-3" />
            <h3 className="text-xl font-bold text-[#6A0DAD]">Frontend</h3>
            <p className="text-gray-600">HTML, CSS, JavaScript, React</p>
          </Link>

          <Link
            to="/explore/Backend"
            className="p-6 bg-white rounded-lg shadow-lg border border-[#FF6600] hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <FaServer className="text-4xl text-[#FF6600] mb-3" />
            <h3 className="text-xl font-bold text-[#FF6600]">Backend</h3>
            <p className="text-gray-600">Spring Boot, Node.js, APIs REST</p>
          </Link>

          <Link
            to="/explore/Testing"
            className="p-6 bg-white rounded-lg shadow-lg border border-[#E63946] hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <FaBug className="text-4xl text-[#E63946] mb-3" />
            <h3 className="text-xl font-bold text-[#E63946]">Testing</h3>
            <p className="text-gray-600">JUnit, Jest, Cypress, Hamcrest</p>
          </Link>

          <Link
            to="/explore/Testing"
            className="p-6 bg-white rounded-lg shadow-lg border border-[#E63946] hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <FaBug className="text-4xl text-[#E63946] mb-3" />
            <h3 className="text-xl font-bold text-[#E63946]">Ciberseguridad</h3>
            <p className="text-gray-600">Redes, Inyecion SQL, CCNA, Troyano</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 max-w-3xl text-center">
        <h3 className="text-2xl font-bold text-[#6A0DAD] mb-4">🚀 ¿Por qué usar StackMentor?</h3>
        <ul className="text-gray-700 space-y-2">
          <li>✅ Accede a recursos curados por expertos.</li>
          <li>✅ Organiza tu aprendizaje de manera eficiente.</li>
          <li>✅ Comparte y descubre contenido con la comunidad.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;