import { useState } from 'react';
import {
    useReserva,
    parsearPrecio,
    formatearPrecioCLP,
} from '../../context/Reserva';
import QRWhatsapp from '../../assets/QR_Whatsapp.png';

export default function ListaReserva() {
    const {
        items,
        panelAbierto,
        setPanelAbierto,
        cambiarCantidad,
        eliminarItem,
        totalUnidades,
        totalPrecio,
    } = useReserva();

    // Controla la apertura de la ventana flotante de confirmación con resumen + QR
    const [modalConfirmar, setModalConfirmar] = useState(false);
    // Estado visual para avisar que se copió el detalle al portapapeles
    const [copiado, setCopiado] = useState(false);

    // Arma el detalle de las prendas seleccionadas con su subtotal calculado
    const textoResumen = items
        .map((item) => {
            const subtotal = parsearPrecio(item.precio) * item.cantidad;
            return `• ${item.nombre}${item.talla ? ` T${item.talla}` : ''}${
                item.colegio ? ` (${item.colegio})` : ''
            } x${item.cantidad} - ${formatearPrecioCLP(subtotal)}`;
        })
        .join('\n');

    // Mensaje completo con el total estimado
    const mensajeCompleto = `Hola Monlej, me gustaría reservar:\n${textoResumen}\nTotal estimado: ${formatearPrecioCLP(
        totalPrecio
    )}`;

    // Copia el resumen al portapapeles
    const copiarResumen = () => {
        navigator.clipboard?.writeText(mensajeCompleto);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2500);
    };

    // Cierra el panel lateral
    const cerrarPanel = () => {
        setPanelAbierto(false);
    };

    return (
        <>
            {/* Botón flotante para abrir la lista si hay prendas y el panel está cerrado */}
            {items.length > 0 && !panelAbierto && (
                <button
                    type="button"
                    onClick={() => setPanelAbierto(true)}
                    className="fixed bottom-6 right-6 z-40 bg-rosa-vino text-white px-5 py-3 rounded-full shadow-lg border-2 border-rosa-acento hover:bg-rosa-acento transition-all flex items-center gap-2.5 font-semibold text-sm cursor-pointer"
                >
                    <span>Mi Reserva</span>
                    <span className="bg-rosa-pastel text-rosa-vino text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                        {totalUnidades}
                    </span>
                </button>
            )}

            {/* Panel lateral deslizable a la derecha */}
            {panelAbierto && (
                <div className="fixed inset-0 z-40 flex justify-end">
                    {/* Fondo semi-transparente al hacer clic fuera cierra el panel */}
                    <div
                        onClick={cerrarPanel}
                        className="fixed inset-0 bg-rosa-vino/35 backdrop-blur-[1px]"
                    />

                    {/* Contenedor principal de la barra lateral */}
                    <aside className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl border-l-2 border-rosa-acento flex flex-col justify-between">
                        {/* Encabezado del panel */}
                        <div className="bg-rosa-pastel px-6 py-4 border-b border-rosa-acento/40 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-rosa-vino">
                                    Lista de Reserva
                                </h2>
                                <p className="text-xs text-rosa-vino/75">
                                    {totalUnidades}{' '}
                                    {totalUnidades === 1
                                        ? 'prenda seleccionada'
                                        : 'prendas seleccionadas'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={cerrarPanel}
                                aria-label="Cerrar lista"
                                className="w-9 h-9 rounded-full bg-white text-rosa-vino border border-rosa-acento/40 hover:bg-rosa-acento hover:text-white font-bold transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Listado de prendas reservadas */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-3">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-2">
                                    <p className="text-rosa-vino font-semibold">
                                        Tu lista de reserva está vacía
                                    </p>
                                    <p className="text-xs text-rosa-vino/70">
                                        Presiona "Reservar" en cualquier prenda para ir
                                        agregándola aquí.
                                    </p>
                                </div>
                            ) : (
                                items.map((item) => {
                                    // Subtotal de este ítem según su cantidad actual
                                    const subtotal =
                                        parsearPrecio(item.precio) * item.cantidad;

                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-rosa-pastel/45 border border-rosa-acento/30 rounded-xl p-3.5 flex items-center justify-between gap-3"
                                        >
                                            {/* Datos de la prenda y subtotal */}
                                            <div className="min-w-0 flex-1">
                                                {item.colegio && (
                                                    <p className="text-[11px] font-medium text-rosa-vino/65 truncate">
                                                        {item.colegio}
                                                    </p>
                                                )}
                                                <h3 className="text-sm font-bold text-rosa-vino truncate">
                                                    {item.nombre}{' '}
                                                    {item.talla ? `T${item.talla}` : ''}
                                                </h3>
                                                <p className="text-sm font-extrabold text-rosa-acento mt-0.5">
                                                    {formatearPrecioCLP(subtotal)}
                                                </p>
                                            </div>

                                            {/* Botones para restar, sumar o eliminar */}
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        cambiarCantidad(item.id, -1)
                                                    }
                                                    className="w-7 h-7 rounded-lg bg-white text-rosa-vino border border-rosa-acento/40 hover:bg-rosa-acento hover:text-white text-xs font-bold cursor-pointer"
                                                >
                                                    -
                                                </button>
                                                <span className="w-6 text-center text-xs font-bold text-rosa-vino">
                                                    {item.cantidad}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        cambiarCantidad(item.id, 1)
                                                    }
                                                    className="w-7 h-7 rounded-lg bg-white text-rosa-vino border border-rosa-acento/40 hover:bg-rosa-acento hover:text-white text-xs font-bold cursor-pointer"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarItem(item.id)}
                                                    title="Eliminar"
                                                    className="ml-1 w-7 h-7 rounded-lg bg-white text-rosa-vino/70 border border-rosa-acento/30 hover:bg-rosa-vino hover:text-white text-xs font-bold transition-colors cursor-pointer"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Pie del panel con el total y el botón de confirmación */}
                        {items.length > 0 && (
                            <div className="bg-rosa-pastel px-6 py-4 border-t border-rosa-acento/40 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-rosa-vino">
                                        Total estimado
                                    </span>
                                    <span className="text-xl font-extrabold text-rosa-acento">
                                        {formatearPrecioCLP(totalPrecio)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setModalConfirmar(true)}
                                    className="w-full py-3 rounded-xl text-sm font-bold bg-rosa-vino text-white hover:bg-rosa-acento transition-colors shadow-sm cursor-pointer"
                                >
                                    Confirmar por WhatsApp
                                </button>
                            </div>
                        )}
                    </aside>
                </div>
            )}

            {/* Ventana flotante (Modal) con el resumen a un lado y el QR al otro */}
            {modalConfirmar && items.length > 0 && (
                <div className="fixed inset-0 z-50 bg-rosa-vino/45 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border-2 border-rosa-acento overflow-hidden">
                        {/* Encabezado de la ventana flotante */}
                        <div className="bg-rosa-pastel px-6 py-4 border-b border-rosa-acento/40 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-rosa-vino">
                                Confirmar Reserva por WhatsApp
                            </h3>
                            <button
                                type="button"
                                onClick={() => setModalConfirmar(false)}
                                aria-label="Cerrar ventana"
                                className="w-9 h-9 rounded-full bg-white text-rosa-vino border border-rosa-acento/40 hover:bg-rosa-acento hover:text-white font-bold transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Contenido en 2 columnas: Resumen a la izquierda y QR a la derecha */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            {/* Columna izquierda: Resumen de prendas */}
                            <div className="md:col-span-7 space-y-3">
                                <p className="text-sm font-semibold text-rosa-vino">
                                    Detalle de tu pedido:
                                </p>
                                <div className="bg-rosa-pastel/50 border border-rosa-acento/30 rounded-xl p-4 max-h-56 overflow-y-auto space-y-2">
                                    {items.map((item) => {
                                        const subtotal =
                                            parsearPrecio(item.precio) * item.cantidad;

                                        return (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-start text-sm text-rosa-vino border-b border-rosa-acento/15 pb-1.5 last:border-none last:pb-0"
                                            >
                                                <span className="pr-2">
                                                    <strong>{item.cantidad}x</strong>{' '}
                                                    {item.nombre}
                                                    {item.talla ? ` T${item.talla}` : ''}
                                                    {item.colegio
                                                        ? ` (${item.colegio})`
                                                        : ''}
                                                </span>
                                                <span className="font-bold text-rosa-acento shrink-0">
                                                    {formatearPrecioCLP(subtotal)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-base font-bold text-rosa-vino">
                                        Total estimado:
                                    </span>
                                    <span className="text-xl font-extrabold text-rosa-acento">
                                        {formatearPrecioCLP(totalPrecio)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={copiarResumen}
                                    className="w-full py-2 rounded-xl text-xs font-semibold bg-rosa-pastel text-rosa-vino border border-rosa-acento/50 hover:bg-rosa-acento hover:text-white transition-colors cursor-pointer"
                                >
                                    {copiado
                                        ? '¡Resumen copiado!'
                                        : 'Copiar detalle del pedido'}
                                </button>
                            </div>

                            {/* Columna derecha: Código QR */}
                            <div className="md:col-span-5 flex flex-col items-center text-center space-y-3 bg-rosa-pastel/40 p-4 rounded-2xl border border-rosa-acento/25">
                                <div className="p-2 bg-white rounded-xl border border-rosa-acento/30 shadow-sm">
                                    <img
                                        src={QRWhatsapp}
                                        alt="Código QR WhatsApp Monlej"
                                        className="w-40 h-40 object-contain"
                                    />
                                </div>
                                <p className="text-xs text-rosa-vino/85 leading-relaxed">
                                    Escanea el código QR y envía este resumen por
                                    WhatsApp para coordinar tu reserva.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}