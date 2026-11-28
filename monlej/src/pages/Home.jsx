import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';
import Mapa from '../components/user/Mapa';
import Carrusel from '../components/user/Carrusel';

export default function Home() {
  return (
    // Contenedor principal de la página
    <div className="min-h-screen bg-rosa-pastel flex flex-col justify-between font-sans">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow space-y-16 py-10 px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* Sección del Carrusel */}
        <section className="bg-rosa-pastel p-2 rounded-2xl">
          <Carrusel />
        </section>

        {/* Sección "Mi historia" */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-rosa-acento/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Columna de Texto */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-rosa-vino">Mi Historia</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit incidunt quis provident ducimus numquam, adipisci beatae blanditiis esse eum consectetur praesentium qui dolore hic, laborum cumque dolorem id? Itaque, voluptatibus?
                Iusto harum accusamus repellendus quidem, ducimus commodi quaerat culpa mollitia saepe non dolores. Ullam, corporis. Molestias incidunt quam repellat dolorum sed autem aut laudantium quod fuga velit. Voluptatum, laboriosam beatae?
              </p>
            </div>

            {/* Columna de la Imagen del Taller */}
            <div className="w-full h-72 md:h-80 rounded-xl overflow-hidden shadow-md bg-rosa-pastel border border-rosa-acento/30 flex items-center justify-center">
              <span className="text-rosa-vino/60 font-medium">[ Imagen del Taller ]</span>
            </div>
          </div>
        </section>

        {/* Sección del Mapa */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-rosa-acento/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-2xl font-bold text-rosa-vino">¿Dónde Encontrarme?</h2>
            <span className="text-xl text-rosa-vino/75">
              Sitio 17, Santa Emma, Curacautín
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-rosa-acento/30">
            <Mapa />
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <Footer />
      
    </div>
  );
}