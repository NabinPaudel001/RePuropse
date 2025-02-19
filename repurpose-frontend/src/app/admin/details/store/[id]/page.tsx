import { notFound } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";

async function getStoreData(id) {
  const stores = [
    { id: "1", storeName: "SuperMart", owner: "John Doe", address: "Kathmandu", contact: "9800000001", email: "supermart@example.com", followers: 1200, about: "A one-stop shop for all your daily needs.", profilePic: "/images/OIP.jpeg" },
    { id: "2", storeName: "TechShop", owner: "Jane Smith", address: "Lalitpur", contact: "9800000002", email: "techshop@example.com", followers: 800, about: "Latest gadgets and accessories available here.", profilePic: "/images/R.jpeg" },
  ];

  return stores.find((s) => s.id === id) || null;
}

export default async function StoreDetails({ params }) {
  const store = await getStoreData(params.id);

  if (!store) return notFound();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 shadow-lg w-full max-w-lg bg-white rounded-lg">
        <div className="flex flex-col items-center">
          {/* ✅ FIXED: Removed "/public" from the image path */}
          <Image src={store.profilePic} width={128} height={128} className="rounded-lg" alt="Store Image" />
          <h2 className="text-xl font-semibold mt-4">{store.storeName}</h2>
          <p className="text-gray-600">{store.owner} (Owner)</p>
        </div>
        <div className="mt-6 text-center">
          <p><strong>Address:</strong> {store.address}</p>
          <p><strong>Contact:</strong> {store.contact}</p>
          <p><strong>Email:</strong> {store.email}</p>
          <p><strong>Followers:</strong> {store.followers}</p>
          <p><strong>About Store:</strong> {store.about}</p>
        </div>
      </Card>
    </div>
  );
}
