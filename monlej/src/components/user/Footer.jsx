import Logo from '../../assets/Logo_Monlej.png';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    // Contenedor principal del pie de página
    <footer className="bg-rosa-pastel text-rosa-vino w-full px-8 py-6 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Columna izquierda: Información de ubicación */}
        <div className="flex flex-col text-left space-y-1 md:w-1/3">
          <p className="font-bold text-base">Ubicación:</p>
          <p className="text-sm leading-tight text-rosa-vino/80">
            Sitio 17, Santa Emma,<br />
            Curacautín.
          </p>
        </div>

        {/* Columna central: Eslogan y enlaces de redes sociales */}
        <div className="flex flex-col items-center justify-center space-y-3 text-center md:w-2/3">
          <h2 className="font-serif text-xl md:text-2xl font-normal italic tracking-wide">
            "El don de crear arte con las manos."
          </h2>

          {/* Redes sociales */}
          <div className="flex items-center gap-4 pt-1">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/56950962046" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-rosa-vino text-rosa-pastel p-2.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/monlej_confecciones/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-rosa-vino text-rosa-pastel p-2.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/cecilia.vielma.967" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-rosa-vino text-rosa-pastel p-2.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@ceciliavielma2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-rosa-vino text-rosa-pastel p-2.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Columna derecha: Logotipo */}
        <div className="flex items-center justify-end md:w-1/3">
          <img 
            src={Logo} 
            alt="Monlej Logo" 
            className="h-16 w-auto object-contain opacity-90"
          />
        </div>

      </div>
    </footer>
  );
}