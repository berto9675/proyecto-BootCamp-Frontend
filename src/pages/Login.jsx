
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import imgRegister from "../assets/register.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/dashboard"); 
    } catch (err) {
      setError("Usuario no registrado. Por favor, regístrate");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F0FF] p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="hidden md:flex items-center justify-center md:w-1/2 bg-[#FF6600] p-6">
          <img 
            src={imgRegister} alt="Illustration"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-[#6A0DAD] text-center mb-6"> Iniciar Sesión </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
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
              Iniciar Sesión
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            ¿Aún no tienes una cuenta? {" "}
            <Link to="/register" className="text-[#FF6600] hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
