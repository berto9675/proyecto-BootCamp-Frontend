import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import imgRegister from "../assets/register.png";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await register(username, email, password);
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error en el registro.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F0FF] p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="hidden md:flex items-center justify-center md:w-1/2 bg-[#FF6600] p-6">
          <img 
            src={imgRegister}
            alt="Illustration"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-[#6A0DAD] text-center mb-6">
            Regístrate
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Nombre</label>
              <input
                type="text"
                placeholder="Ingrese su Nombre"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="Ingrese su Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingrese su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6600] text-white py-2 rounded-lg hover:bg-[#e65c00] transition"
            >
              Registrarse
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-[#FF6600] hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
