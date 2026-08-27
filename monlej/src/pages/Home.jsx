import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-blanco-puro flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-grow p-8">
        <h1 className="text-rosa-vino text-3xl font-bold">Bienvenido a Monlej</h1>
      </main>

      <Footer />
    </div>
  );
}