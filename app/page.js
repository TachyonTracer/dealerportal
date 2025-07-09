import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center"> Welcome to the Dealer Portal</h2>
        
        <p className="text-center text-gray-600">
          Where you can manage your dealership's operations efficiently.
        </p>
        <div className="mt-6 flex justify-center">
      <Link href="/auth/login" className="text-blue-500 hover:underline">
        Login
      </Link>
      </div>
      </div>
    </div>
  );
}

export default Home;