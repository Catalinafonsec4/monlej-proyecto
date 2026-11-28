import { useState, useEffect } from 'react';

// Datos de prueba para el carrusel (luego se reemplazan por los de la BD)
// Agregar 'Novedades', o 'Destacados'
const slides = [
    {
        id: 1,
        titulo: "Uniformes Escolares",
        descripcion: "Distintos modelos de uniformes escolares para todas las edades, buzos, poleras, pantalones.",
        imagen: "/images/uniformes.jpg" 
    },
    {
        id: 2,
        titulo: "Vestidos y Folklore",
        descripcion: "Vestidos únicos y trajes de folklore para cada ocasión especial.",
        imagen: "/images/folklore.jpg" 
    },
    {
        id: 3,
        titulo: "Accesorios y Más",
        descripcion: "Detalles únicos para complementar cada prenda, desde accesorios hasta complementos de moda.",
        imagen: "/images/accesorios.jpg" 
    }
];

export default function Carrusel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-md group bg-[#FDF2F4] border border-[#D65A8C]/20">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    >
                    {/* Fondo con los tonos de la marca */}
                    <div className="w-full h-full bg-gradient-to-tr from-[#FDF2F4] via-[#f7d6e0] to-[#D65A8C]/30 flex items-center justify-center relative">
                        {/* Contenido / Texto superpuesto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1E28]/80 via-[#4A1E28]/30 to-transparent flex flex-col justify-end p-8 text-white">
                            <span className="text-xs uppercase tracking-widest text-[#FDF2F4]/80 font-semibold mb-1">Monlej Confecciones</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#FDF2F4]">{slide.titulo}</h3>
                            <p className="text-sm md:text-base text-gray-200 mt-1">{slide.descripcion}</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Botones de navegación (Anterior / Siguiente) con colores institucionales */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#FDF2F4]/90 hover:bg-[#4A1E28] text-[#4A1E28] hover:text-[#FDF2F4] p-3 rounded-full shadow transition-all opacity-0 group-hover:opacity-100 font-bold"
                aria-label="Anterior"
            >
                ❮
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#FDF2F4]/90 hover:bg-[#4A1E28] text-[#4A1E28] hover:text-[#FDF2F4] p-3 rounded-full shadow transition-all opacity-0 group-hover:opacity-100 font-bold"
                aria-label="Siguiente"
            >
                ❯  
            </button>

            {/* Indicadores de puntos */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#D65A8C] scale-110 ring-2 ring-white' : 'bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Ir a diapositiva ${index + 1}`}
                />
                ))}
            </div>
        </div>
    );
}