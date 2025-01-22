import Image from "next/image";

interface ImageCardProps {
  src: string;
  alt: string;
  label: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, label }) => {
  return (
    <div className="flex  flex-col items-center">
      {/* Card container with responsive fixed width and height */}
      <div className="w-[80vw] h-[40vw] sm:w-[45vw] sm:h-[25vw] lg:w-[30vw] lg:h-[20vw] rounded-lg overflow-hidden shadow-md">
        <Image
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          width={300}
          height={300}
        />
      </div>
      {/* Label */}
      <p className="mt-4 text-lg font-medium">{label}</p>
    </div>
  );
};

export default ImageCard;
