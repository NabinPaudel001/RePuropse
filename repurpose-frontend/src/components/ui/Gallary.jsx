// components/Gallery.js

import Image from 'next/image';
import TitleSection from './TitleSection';

const Gallery = () => {
  return (
    <section className="py-6 md:py-6 px-4 sm:px-6 md:px-8">
      <TitleSection
                  title="Gallery"
                  subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="relative w-full h-40 sm:h-48 md:h-60">
          <Image
            src="/images/OIP.jpeg"
            alt="Gallery Image 1"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="relative w-full h-40 sm:h-48 md:h-60">
          <Image
            src="/images/OIP.jpeg"
            alt="Gallery Image 2"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="relative w-full h-40 sm:h-48 md:h-60">
          <Image
            src="/images/OIP.jpeg"
            alt="Gallery Image 3"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="relative w-full h-40 sm:h-48 md:h-60">
          <Image
            src="/images/R.jpeg"
            alt="Gallery Image 4"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Add more images as needed */}
      </div>
    </section>
  );
};

export default Gallery;