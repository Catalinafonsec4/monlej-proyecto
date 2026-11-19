import { useState, useMemo } from 'react';
import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';
import QRWhatsapp from '../assets/QR_Whatsapp.png';
import {
    useReserva,
    formatearPrecioCLP,
} from '../context/Reserva';

const COLEGIOS = [
    'Liceo las araucarias',
    'Patricio Chavez',
    'Luiz Cruz Martinez',
    'Liceo Politécnico',
    'Santa Elena',
];

const TALLAS = ['6', '8', '10', '12', '14', '16', 'S', 'M', 'L', 'XL'];

const PRENDAS = [
    'Polera manga corta',
    'Polera manga larga',
    'Polera deportiva',
    'Poleron',
    'Pantalón',
    'Buzo',
    'Casaca',
];

// Datos de prueba con precios en número (luego se reemplazan por los de la BD)
const UNIFORMES_MOCK = [
    {
        id: 1,
        nombre: 'Buzo',
        talla: '6',
        colegio: 'Liceo las araucarias',
        prenda: 'Buzo',
        precio: 38000,
        stock: 8,
        imagen: '/images/uniformes/buzo.jpg',
    },
    {
        id: 2,
        nombre: 'Polera manga corta',
        talla: '10',
        colegio: 'Patricio Chavez',
        prenda: 'Polera manga corta',
        precio: 14000,
        stock: 12,
        imagen: '/images/uniformes/polera-corta.jpg',
    },
    {
        id: 3,
        nombre: 'Pantalón',
        talla: 'M',
        colegio: 'Liceo Politécnico',
        prenda: 'Pantalón',
        precio: 18000,
        stock: 5,
        imagen: '/images/uniformes/pantalon.jpg',
    },
    {
        id: 4,
        nombre: 'Poleron',
        talla: 'L',
        colegio: 'Santa Elena',
        prenda: 'Poleron',
        precio: 25000,
        stock: 0,
        imagen: '/images/uniformes/poleron.jpg',
    },
];

export default function Uniformes() {
    // Estados de los filtros seleccionados
    const [colegioSeleccionado, setColegioSeleccionado] = useState('');
    const [tallaSeleccionada, setTallaSeleccionada] = useState('');
    const [prendaSeleccionada, setPrendaSeleccionada] = useState('');

    // Modal de consulta cuando una prenda específica está sin stock
    const [prendaConsulta, setPrendaConsulta] = useState(null);

    // Función del contexto para agregar prendas a la lista lateral
    const { agregarItem } = useReserva();

    // Filtra los uniformes según colegio, talla y prenda
    const productosFiltrados = useMemo(() => {
        return UNIFORMES_MOCK.filter((item) => {
            const coincideColegio =
                !colegioSeleccionado || item.colegio === colegioSeleccionado;
            const coincideTalla =
                !tallaSeleccionada || item.talla === tallaSeleccionada;
            const coincidePrenda =
                !prendaSeleccionada || item.prenda === prendaSeleccionada;

            return coincideColegio && coincideTalla && coincidePrenda;
        });
    }, [colegioSeleccionado, tallaSeleccionada, prendaSeleccionada]);

    // Restablece todos los filtros a su estado inicial
    const limpiarFiltros = () => {
        setColegioSeleccionado('');
        setTallaSeleccionada('');
        setPrendaSeleccionada('');
    };

    const hayFiltrosActivos =
        colegioSeleccionado || tallaSeleccionada || prendaSeleccionada;

    // Si no hay stock abre la consulta; si hay stock agrega a la lista de reserva
    const handleAccionBoton = (item) => {
        if (item.stock <= 0) {
            setPrendaConsulta(item);
        } else {
            agregarItem(item);
        }
    };

    return (
        <div className="min-h-screen bg-rosa-pastel flex flex-col justify-between font-sans">
            <Navbar />

            <main className="flex-grow py-10 px-4 md:px-12 max-w-7xl mx-auto w-full space-y-8">
                {/* Título de la sección */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-rosa-vino">
                        Uniformes Escolares
                    </h1>
                </div>

                {/* Barra de filtros por colegio, talla y prenda */}
                <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-rosa-acento/25 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Filtro de colegio */}
                        <div>
                            <label
                                htmlFor="filtro-colegio"
                                className="block text-xs font-semibold uppercase tracking-wider text-rosa-vino mb-1.5"
                            >
                                Colegio
                            </label>
                            <select
                                id="filtro-colegio"
                                value={colegioSeleccionado}
                                onChange={(e) => setColegioSeleccionado(e.target.value)}
                                className="w-full rounded-xl border border-rosa-acento/40 bg-rosa-pastel/40 px-3.5 py-2.5 text-sm text-rosa-vino focus:outline-none focus:ring-2 focus:ring-rosa-acento"
                            >
                                <option value="">Todos los colegios</option>
                                {COLEGIOS.map((colegio) => (
                                    <option key={colegio} value={colegio}>
                                        {colegio}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro de talla */}
                        <div>
                            <label
                                htmlFor="filtro-talla"
                                className="block text-xs font-semibold uppercase tracking-wider text-rosa-vino mb-1.5"
                            >
                                Talla
                            </label>
                            <select
                                id="filtro-talla"
                                value={tallaSeleccionada}
                                onChange={(e) => setTallaSeleccionada(e.target.value)}
                                className="w-full rounded-xl border border-rosa-acento/40 bg-rosa-pastel/40 px-3.5 py-2.5 text-sm text-rosa-vino focus:outline-none focus:ring-2 focus:ring-rosa-acento"
                            >
                                <option value="">Todas las tallas</option>
                                {TALLAS.map((talla) => (
                                    <option key={talla} value={talla}>
                                        {talla}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro de prenda */}
                        <div>
                            <label
                                htmlFor="filtro-prenda"
                                className="block text-xs font-semibold uppercase tracking-wider text-rosa-vino mb-1.5"
                            >
                                Prenda
                            </label>
                            <select
                                id="filtro-prenda"
                                value={prendaSeleccionada}
                                onChange={(e) => setPrendaSeleccionada(e.target.value)}
                                className="w-full rounded-xl border border-rosa-acento/40 bg-rosa-pastel/40 px-3.5 py-2.5 text-sm text-rosa-vino focus:outline-none focus:ring-2 focus:ring-rosa-acento"
                            >
                                <option value="">Todas las prendas</option>
                                {PRENDAS.map((prenda) => (
                                    <option key={prenda} value={prenda}>
                                        {prenda}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Contador de resultados y botón limpiar filtros */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-rosa-pastel">
                        <span className="text-sm text-rosa-vino/80">
                            Mostrando{' '}
                            <strong className="text-rosa-vino">
                                {productosFiltrados.length}
                            </strong>{' '}
                            {productosFiltrados.length === 1 ? 'prenda' : 'prendas'}
                        </span>

                        {hayFiltrosActivos && (
                            <button
                                type="button"
                                onClick={limpiarFiltros}
                                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-rosa-pastel text-rosa-vino border border-rosa-acento/40 hover:bg-rosa-acento hover:text-white transition-colors cursor-pointer"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </section>

                {/* Mensaje directo con QR si no hay resultados, o grilla de uniformes */}
                {productosFiltrados.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-rosa-acento/25 shadow-sm max-w-2xl mx-auto space-y-5">
                        <h2 className="text-2xl md:text-3xl font-bold text-rosa-vino">
                            No se encontraron uniformes disponibles
                        </h2>
                        <p className="text-base md:text-lg text-rosa-vino/85 leading-relaxed">
                            ¿No ves el uniforme o la talla que buscas?{' '}
                            <span className="font-semibold text-rosa-acento">
                                Solicítalo directamente por WhatsApp
                            </span>{' '}
                            escaneando el siguiente QR para consultar si se puede
                            confeccionar.
                        </p>

                        {/* Imagen del QR directamente en pantalla */}
                        <div className="flex justify-center pt-2">
                            <div className="p-3 bg-rosa-pastel rounded-2xl border-2 border-rosa-acento/40 shadow-sm">
                                <img
                                    src={QRWhatsapp}
                                    alt="Código QR WhatsApp Monlej"
                                    className="w-44 h-44 md:w-52 md:h-52 object-contain rounded-xl bg-white p-2"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {productosFiltrados.map((item) => {
                            const sinStock = item.stock <= 0;

                            return (
                                <article
                                    key={item.id}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-rosa-acento/25 hover:border-rosa-acento hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-5"
                                >
                                    {/* Contenedor de imagen a la izquierda */}
                                    <div className="w-full sm:w-44 h-48 shrink-0 rounded-xl bg-rosa-pastel border border-rosa-acento/25 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={item.imagen}
                                            alt={`${item.nombre} T${item.talla}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <span className="hidden w-full h-full items-center justify-center text-sm font-medium text-rosa-vino/60">
                                            img
                                        </span>
                                    </div>

                                    {/* Detalles y botón a la derecha */}
                                    <div className="flex-1 w-full flex flex-col justify-between sm:h-48 text-center sm:text-left space-y-3 sm:space-y-0">
                                        <div>
                                            <span className="text-xs font-medium text-rosa-vino/65">
                                                {item.colegio}
                                            </span>
                                            <h2 className="text-xl font-bold text-rosa-vino mt-0.5">
                                                {item.nombre} T{item.talla}
                                            </h2>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-2xl font-extrabold text-rosa-acento">
                                                {formatearPrecioCLP(item.precio)}
                                            </p>
                                            <p
                                                className={`text-sm font-medium ${
                                                    sinStock
                                                        ? 'text-rosa-acento font-semibold'
                                                        : 'text-rosa-vino/80'
                                                }`}
                                            >
                                                {sinStock
                                                    ? 'Sin stock disponible'
                                                    : `Stock: ${item.stock}`}
                                            </p>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => handleAccionBoton(item)}
                                                className={`w-full sm:w-auto px-6 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                                                    sinStock
                                                        ? 'bg-rosa-pastel text-rosa-vino border border-rosa-acento hover:bg-rosa-acento hover:text-white'
                                                        : 'bg-rosa-vino text-white hover:bg-rosa-acento'
                                                }`}
                                            >
                                                {sinStock ? 'Consultar' : 'Reservar'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </main>

            <Footer />

            {/* Modal informativo al presionar "Consultar" en una prenda sin stock */}
            {prendaConsulta && (
                <div className="fixed inset-0 z-50 bg-rosa-vino/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-xl border border-rosa-acento/40 space-y-4 text-center">
                        <div className="space-y-1">
                            <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-rosa-pastel text-rosa-vino">
                                {prendaConsulta.colegio}
                            </span>
                            <h3 className="text-xl font-bold text-rosa-vino pt-1">
                                {prendaConsulta.nombre} T{prendaConsulta.talla}
                            </h3>
                        </div>

                        <p className="text-base text-rosa-vino/85 leading-relaxed">
                            Este uniforme{' '}
                            <strong className="text-rosa-vino">
                                no se encuentra disponible
                            </strong>{' '}
                            en stock. Solicítalo directamente por WhatsApp escaneando el
                            siguiente QR para consultar si se puede confeccionar.
                        </p>

                        {/* QR directo en el modal de consulta */}
                        <div className="flex justify-center">
                            <div className="p-2.5 bg-rosa-pastel rounded-2xl border border-rosa-acento/40">
                                <img
                                    src={QRWhatsapp}
                                    alt="Código QR WhatsApp Monlej"
                                    className="w-40 h-40 object-contain rounded-xl bg-white p-1.5"
                                />
                            </div>
                        </div>

                        <div className="pt-1">
                            <button
                                type="button"
                                onClick={() => setPrendaConsulta(null)}
                                className="px-6 py-2 rounded-xl text-sm font-semibold bg-rosa-vino text-white hover:bg-rosa-acento transition-colors cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}