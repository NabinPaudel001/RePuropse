import { notFound } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";

async function getSellerData(id) {
  const sellers = [
    { id: "1", name: "John Doe", email: "john@example.com", contact: "9876543210", profilePic: "/images/OIP.jpeg", rewards: 500, soldItems: 10, pendingItems: 2 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", contact: "9876543211", profilePic: "/images/R.jpeg", rewards: 300, soldItems: 5, pendingItems: 1 },
  ];

  return sellers.find((s) => s.id === id) || null;
}

export default async function SellerDetails({ params }) {
  const seller = await getSellerData(params.id);

  if (!seller) return notFound();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 shadow-lg w-full max-w-lg bg-white rounded-lg">
        <div className="flex flex-col items-center">
          <Image src={seller.profilePic} width={128} height={128} className="rounded-full" alt="Profile" />
          <h2 className="text-xl font-semibold mt-4">{seller.name}</h2>
          <p className="text-gray-600">{seller.email}</p>
          <p>{seller.contact}</p>
        </div>
        <div className="mt-6 text-center">
          <p><strong>Rewards:</strong> {seller.rewards} points</p>
          <p><strong>Sold Items:</strong> {seller.soldItems}</p>
          <p><strong>Pending Items:</strong> {seller.pendingItems}</p>
        </div>
      </Card>
    </div>
  );
}
