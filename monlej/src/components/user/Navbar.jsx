import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo_Monlej.png';
import Contáctame from '../../pages/Contactame';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Estado para mostrar u ocultar la ventana flotante de contacto
    const [Contacto, setContacto] = useState(false);
    
    // Lista de opciones de navegación con sus respectivas rutas
    const NavItems = [
        { label: 'Uniformes', path: '/uniformes' },
        { label: 'Folclore', path: '/folclore' },
        { label: 'Infantil', path: '/infantil' },
        { label: 'Accesorios', path: '/accesorios' },
        { label: 'Otros', path: '/otros' },
        { label: 'Contáctame', path: null }
    ];

    // Maneja el clic en los elementos del menú
    const handleNavClick = (item) => {
        if (item.label === 'Contáctame') {
            setContacto(true);
        } else if (item.path) {
            navigate(item.path);
        }
    };

    // Cierra el modal de contacto
    const handleCloseModal = () => {
        setContacto(false);
    };

    return (
        <>
            <nav className="bg-rosa-pastel w-full px-8 py-4 flex items-center justify-between shadow-sm border-b-2 border-rosa-acento">
                {/* Logo Monlej: lleva al Home ("/") */}
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                    <img src={Logo} alt="Monlej Logo" className="h-16 w-auto object-contain" />
                </div>

                {/* Menú de navegación */}
                <ul className="flex items-center gap-3 text-rosa-vino text-base font-serif">
                    {NavItems.map((item, index) => {
                        // Activo si la ruta coincide o si el modal de Contáctame está abierto
                        const isActive = item.label === 'Contáctame'
                            ? Contacto
                            : location.pathname === item.path;

                        return (
                            <li key={item.label} className="flex items-center gap-3">
                                {/* Botón de cada sección */}
                                <button
                                    onClick={() => handleNavClick(item)}
                                    className={`px-6 py-1.5 rounded transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#EAD8DC] text-rosa-acento font-semibold shadow-inner'
                                            : 'hover:text-rosa-acento text-rosa-vino'
                                    }`}
                                >
                                    {item.label}
                                </button>

                                {/* Separador vertical entre elementos */}
                                {index < NavItems.length - 1 && (
                                    <span className="text-rosa-vino/70 font-light select-none">|</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Pestaña flotante de contacto */}
            <Contáctame
                isOpen={Contacto}
                onClose={handleCloseModal}
            />
        </>
    );
}