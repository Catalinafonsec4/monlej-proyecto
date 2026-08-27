import { useState } from 'react';
import Logo from '../../assets/Logo_Monlej.png';

export default function Navbar() {
    const [ActivaItem, setActivaItem] = useState('');
    const NavItems = [
        'Uniformes',
        'Folclore',
        'Infantil',
        'Accesorios',
        'Otros',
        'Contáctanos'
    ];

    return (
        <nav className="bg-rosa-pastel w-full px-8 py-4 flex items-center justify-between shadow-sm">
        {/* Logo Monlej */}
        <div onClick={() => setActivaItem('')} className="flex items-center cursor-pointer">
            <img src={Logo} alt="Monlej Logo" className="h-16 w-auto object-contain"/>
        </div>

        {/* Menu de navegacion */}
        <ul className="flex items-center gap-3 text-rosa-vino text-base font-serif">
            {NavItems.map((item, index) => {
            const isActive = ActivaItem === item;

            return (
                <li key={item} className="flex items-center gap-3">
                <button
                    onClick={() => setActivaItem(item)}
                    className={`px-6 py-1.5 rounded transition-all duration-200 cursor-pointer ${
                    isActive
                        ? 'bg-[#EAD8DC] text-rosa-acento font-semibold shadow-inner'
                        : 'hover:text-rosa-acento text-rosa-vino'
                    }`}
                >
                    {item}
                </button>

                {/* Separador vertical */}
                {index < NavItems.length - 1 && (
                    <span className="text-rosa-vino/70 font-light select-none">|</span>
                )}
                </li>
            );
            })}
        </ul>
        </nav>
    );
}