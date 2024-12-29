import Image from "next/image";
import Items from "./components/items";
export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
    <Items
        imageUrl="/assets/bg.png" // Ensure this path is correct and the image is in the public directory
        name="Sample Product"
        description="This is a sample product description."
        originalPrice={129.99}
        discount={20} // 20% discount
      />
      <Items
        imageUrl="/assets/bg.png" // Ensure this path is correct and the image is in the public directory
        name="Sample Product"
        description="This is a sample product description."
        originalPrice={500}
        discount={40} // 20% discount
      />
         <Items
        imageUrl="/assets/bg.png" // Ensure this path is correct and the image is in the public directory
        name="Sample Product"
        description="This is a sample product description."
        originalPrice={500}
        />
    </main>
    </div>
  );
}
