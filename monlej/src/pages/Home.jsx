import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';
import Mapa from '../components/user/Mapa';

export default function Home() {
  return (
    <div className="min-h-screen bg-blanco-puro flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-grow space-y-16 py-10 px-4 md:px-12 max-w-7xl mx-auto w-full">
        <section className="bg-rosa-ultraclaro/50 p-8 rounded-2xl">
          <Mapa />
        </section>

      </main>

      <Footer />
    </div>
  );
}