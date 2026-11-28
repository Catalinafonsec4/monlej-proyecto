import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import IconoMaCostura from '../../assets/Marcador.png'; 
import Sombra from 'leaflet/dist/images/marker-shadow.png';

// Configuración del icono personalizado para el marcador
const IconoCosturaMonlej = L.icon({
    iconUrl: IconoMaCostura,
    shadowUrl: Sombra,
    iconSize: [65, 45],
    iconAnchor: [20.5, 41],
    popupAnchor: [0, -38],
});

export default function Mapa() {
    // Coordenadas geográficas de la tienda
    const Ubicacion = [-38.471370591108084, -72.03642833292889];

    return (
        // Contenedor principal del mapa con estilos personalizados
        <div className="h-80 w-full rounded-2xl overflow-hidden border-2 border-rosa-vino shadow-sm z-0 
        [&_.leaflet-control-zoom]:!border-rosa-acento/40 
        [&_.leaflet-control-zoom_a]:!bg-rosa-ultraclaro 
        [&_.leaflet-control-zoom_a]:!text-rosa-vino 
        [&_.leaflet-control-zoom_a]:!border-rosa-acento/40 
        [&_.leaflet-control-zoom_a:hover]:!bg-rosa-acento/40">
            
            {/* Componente principal del mapa */}
            <MapContainer 
                center={Ubicacion} zoom={14} scrollWheelZoom={false} className="w-full h-full">
                
                {/* Capa de diseño del mapa (OpenStreetMap) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Marcador con la ubicación y etiqueta emergente */}
                <Marker position={Ubicacion} icon={IconoCosturaMonlej}>
                    <Popup>
                        <strong className="text-rosa-vino">Monlej (Sitio 17)</strong><br />
                        <span className="text-gray-700">Taller de Confecciones</span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}