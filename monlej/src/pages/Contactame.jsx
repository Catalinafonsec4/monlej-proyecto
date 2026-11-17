import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok, FaTimes } from 'react-icons/fa';
import QrWhatsapp from '../assets/QR_Whatsapp.png';

export default function Contáctame({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
      
      {/* Tarjeta flotante */}
      <div className="relative w-full max-w-lg bg-rosa-pastel border-2 border-rosa-vino rounded-3xl p-8 shadow-2xl flex flex-col items-center text-rosa-vino">
        
        {/* Botón de cierre (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-rosa-vino hover:text-rosa-acento transition-colors cursor-pointer p-1.5"
          aria-label="Cerrar"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Título*/}
        <h2 className="font-serif text-3xl font-bold tracking-wide mb-6 mt-1">
          CONTÁCTAME
        </h2>

        {/* Contenedor */}
        <div className="bg-rosa-pastel p-4 rounded-2xl border border-rosa-vino/20 shadow-inner mb-6 flex items-center justify-center">
          <img 
            src={QrWhatsapp} 
            alt="QR Whatsapp Monlej" 
            className="w-70 h-70 object-contain"
          />
        </div>

        {/* Redes sociales con botones*/}
        <div className="flex items-center gap-5">
          <a 
            href="https://wa.me/56950962046" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-rosa-vino text-rosa-pastel p-3.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center shadow-md text-lg"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>

          <a 
            href="https://www.instagram.com/monlej_confecciones/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-rosa-vino text-rosa-pastel p-3.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center shadow-md text-lg"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" />
          </a>

          <a 
            href="https://www.facebook.com/cecilia.vielma.967" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-rosa-vino text-rosa-pastel p-3.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center shadow-md text-lg"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-6 h-6" />
          </a>

          <a 
            href="https://www.tiktok.com/@ceciliavielma2" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-rosa-vino text-rosa-pastel p-3.5 rounded-full hover:bg-rosa-acento transition-colors duration-200 flex items-center justify-center shadow-md text-lg"
            aria-label="TikTok"
          >
            <FaTiktok className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}