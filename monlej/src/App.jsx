import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReservaProvider } from './context/Reserva';
import ListaReserva from './components/user/Lista_Reserva';
import Home from './pages/Home';
import Uniformes from './pages/Uniformes';

export default function App() {
    return (
        // ReservaProvider envuelve la app para compartir la lista entre rutas
        <ReservaProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/uniformes" element={<Uniformes />} />
                    <Route
                        path="/folclore"
                        element={<div className="p-10 text-rosa-vino">Página Folclore</div>}
                    />
                    <Route
                        path="/infantil"
                        element={<div className="p-10 text-rosa-vino">Página Infantil</div>}
                    />
                    <Route
                        path="/accesorios"
                        element={<div className="p-10 text-rosa-vino">Página Accesorios</div>}
                    />
                    <Route
                        path="/otros"
                        element={<div className="p-10 text-rosa-vino">Página Otros</div>}
                    />
                </Routes>

                {/* Panel lateral disponible en toda la navegación */}
                <ListaReserva />
            </BrowserRouter>
        </ReservaProvider>
    );
}