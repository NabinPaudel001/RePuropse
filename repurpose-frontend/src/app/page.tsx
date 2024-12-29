import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import Items from "../components/ui/Items";
import { Button } from "../components/ui/Button";
import ImageCard from "../components/ui/ImageCard";
import TitleSection from "../components/ui/TitleSection";
import Gallary from "../components/ui/Gallary";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="relative flex items-center justify-center bg-gray-50 py-6 md:py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://th.bing.com/th/id/OIP.2vGFSP1gZf02rEitVtgsGwHaEK?rs=1&pid=ImgDetMain" // Replace with your image path
              alt="Interior Design"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 bg-secondary py-6 md:py-8 px-6 md:px-8 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-secondary-foreground uppercase">
              New Arrival
            </h3>
            <h1 className="text-3xl md:text-5xl font-bold text-primary mt-2">
              Discover Our New Collection
            </h1>
            <p className="text-secondary-foreground mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <div className="mt-8">
              <Button>Explore us</Button>
            </div>
          </div>
        </div>
      </section>

      <div className=" px-6 md:px-8 py-6 md:py-6">
        <div className="text-center">
          <TitleSection
            title="Browse The Range"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <ImageCard src="/images/OIP.jpeg" alt="Dining" label="Dining" />
          <ImageCard src="/images/R.jpeg" alt="Living" label="Living" />
          <ImageCard src="/images/OIP.jpeg" alt="Bedroom" label="Bedroom" />
        </div>
      </div>
      
      <div className="font-[family-name:var(--font-geist-sans)]">
        <TitleSection
                          title="Our Products"
                          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        />
        <main className="grid grid-cols- sm:grid-cols-4 lg:grid-cols-4 gap-2 items-center justify-items-center">
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
        </main>
      </div>

      <Gallary />
    </div>
  );
}
