import React from 'react';
const Footer = () => {
    return (
      <footer className="bg-[#FF6600] text-white text-center p-4 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} StackMentor. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  };
  export default Footer;