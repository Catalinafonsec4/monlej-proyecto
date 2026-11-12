import { useState } from 'react';
import Logo from '../../assets/Logo_Monlej.png';
import Contáctame from '../../pages/Contactame';

export default function Navbar() {
    // Estado para controlar cuál elemento del menú está activo
    const [ActivaItem, setActivaItem] = useState('');
    // Estado para mostrar u ocultar la ventana flotante de contacto
    const [Contacto, setContacto] = useState(false);
    
    // Lista de opciones de navegación
    const NavItems = [
        'Uniformes',
        'Folclore',
        'Infantil',
        'Accesorios',
        'Otros',
        'Contáctame'
    ];

    // Maneja el clic en los elementos del menú
    const handleNavClick = (item) => {
        setActivaItem(item);
        if (item === 'Contáctame') {
            setContacto(true);
        }
    };

    // Cierra el modal y limpia el estado activo de "Contáctame"
    const handleCloseModal = () => {
        setContacto(false);
        if (ActivaItem === 'Contáctame') {
            setActivaItem('');
        }
    };

    return (
        <> {/* 1. Agregado el fragmento de apertura aquí */}
            <nav className="bg-rosa-pastel w-full px-8 py-4 flex items-center justify-between shadow-sm">
            
            {/* Logo Monlej */}
            <div onClick={() => setActivaItem('')} className="flex items-center cursor-pointer">
                <img src={Logo} alt="Monlej Logo" className="h-16 w-auto object-contain"/>
            </div>

            {/* Menú de navegación */}
            <ul className="flex items-center gap-3 text-rosa-vino text-base font-serif">
                {NavItems.map((item, index) => {
                const isActive = ActivaItem === item;

                return (
                    <li key={item} className="flex items-center gap-3">
                    
                    {/* Botón de cada sección */}
                    <button
                        onClick={() => handleNavClick(item)} /* 2. Corregido para llamar a handleNavClick y abrir el modal */
                        className={`px-6 py-1.5 rounded transition-all duration-200 cursor-pointer ${
                        isActive
                            ? 'bg-[#EAD8DC] text-rosa-acento font-semibold shadow-inner'
                            : 'hover:text-rosa-acento text-rosa-vino'
                        }`}
                    >
                        {item}
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