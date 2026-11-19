import { createContext, useContext, useState, useMemo } from 'react';

// Convierte cualquier precio (número o texto con puntos/signos) en un número entero seguro
export function parsearPrecio(precio) {
    if (typeof precio === 'number') {
        return Number.isFinite(precio) ? precio : 0;
    }
    if (typeof precio === 'string') {
        // Deja solo dígitos y signo negativo si lo hubiera
        const limpio = precio.replace(/[^\d-]/g, '');
        const numero = Number(limpio);
        return Number.isFinite(numero) ? numero : 0;
    }
    return 0;
}

// Formatea un monto numérico a formato peso chileno (54000 -> "$54.000")
export function formatearPrecioCLP(valor) {
    const numero = parsearPrecio(valor);
    return '$' + numero.toLocaleString('es-CL');
}

// Creamos el contexto que compartirá la lista de reserva entre las páginas
const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
    // Almacena las prendas agregadas a la lista de reserva
    const [items, setItems] = useState([]);
    // Controla si el panel lateral derecho está abierto o cerrado
    const [panelAbierto, setPanelAbierto] = useState(false);

    // Agrega una prenda a la lista o suma 1 a su cantidad si ya estaba
    const agregarItem = (producto) => {
        // Normalizamos el precio al agregar para evitar errores de suma
        const precioNumerico = parsearPrecio(producto.precio ?? producto.valor ?? 0);

        setItems((prev) => {
            const existente = prev.find((item) => item.id === producto.id);
            if (existente) {
                const limiteStock = producto.stock ?? existente.stock ?? Infinity;
                // Evita superar el stock disponible
                if (existente.cantidad >= limiteStock) {
                    return prev;
                }
                return prev.map((item) =>
                    item.id === producto.id
                        ? {
                              ...item,
                              precio: parsearPrecio(item.precio) || precioNumerico,
                              cantidad: item.cantidad + 1,
                          }
                        : item
                );
            }
            // Guardamos el producto con su precio ya convertido a número
            return [
                ...prev,
                {
                    ...producto,
                    precio: precioNumerico,
                    cantidad: 1,
                },
            ];
        });
        // Abre automáticamente el panel lateral al reservar
        setPanelAbierto(true);
    };

    // Aumenta o disminuye la cantidad de una prenda; si llega a 0, la quita
    const cambiarCantidad = (id, delta) => {
        setItems((prev) =>
            prev
                .map((item) => {
                    if (item.id !== id) return item;
                    const nuevaCantidad = item.cantidad + delta;
                    if (nuevaCantidad <= 0) return null;
                    if (item.stock && nuevaCantidad > item.stock) return item;
                    return { ...item, cantidad: nuevaCantidad };
                })
                .filter(Boolean)
        );
    };

    // Elimina una prenda específica de la lista
    const eliminarItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Vacía por completo la lista de reserva
    const limpiarLista = () => {
        setItems([]);
    };

    // Calcula el total de unidades reservadas
    const totalUnidades = useMemo(
        () => items.reduce((acc, item) => acc + item.cantidad, 0),
        [items]
    );

    // Calcula el monto total acumulado sumando (precio real * cantidad) de cada ítem
    const totalPrecio = useMemo(
        () =>
            items.reduce(
                (acc, item) => acc + parsearPrecio(item.precio) * item.cantidad,
                0
            ),
        [items]
    );

    return (
        <ReservaContext.Provider
            value={{
                items,
                panelAbierto,
                setPanelAbierto,
                agregarItem,
                cambiarCantidad,
                eliminarItem,
                limpiarLista,
                totalUnidades,
                totalPrecio,
            }}
        >
            {children}
        </ReservaContext.Provider>
    );
}

// Hook personalizado para consumir el contexto fácilmente en cualquier componente
export function useReserva() {
    const ctx = useContext(ReservaContext);
    if (!ctx) {
        throw new Error('useReserva debe usarse dentro de un ReservaProvider');
    }
    return ctx;
}