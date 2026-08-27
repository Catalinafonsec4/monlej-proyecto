import Navbar from '../components/user/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-blanco-puro">
      <Navbar />
      
      <main className="p-8">
        <h1 className="text-rosa-vino text-3xl font-bold">Bienvenido a Monlej</h1>
      </main>
    </div>
  );
}