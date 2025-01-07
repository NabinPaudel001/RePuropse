import React from 'react';
import Image from 'next/image';

interface ItemProps {
  imageUrl?: string; 
  name: string;
  originalPrice?: number;
  discount?: number;
}

const Items: React.FC<ItemProps> = ({ imageUrl, name, originalPrice, discount }) => {
  // Validate `originalPrice`
  const validOriginalPrice = typeof originalPrice === 'number' && originalPrice >= 0 ? originalPrice : 0;

  // Validate and calculate discounted price
  const isDiscountValid = typeof discount === 'number' && discount >= 0 && discount <= 100;
  const discountedPrice = isDiscountValid
    ? validOriginalPrice * (1 - discount / 100)
    : validOriginalPrice;

  return (
    <div className="w-[285px] h-[370px] border border-gray-300 rounded-lg overflow-hidden relative shadow-lg m-4">
      <div className="w-[285px] h-[301px] relative">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={name} 
            fill
            style={{ objectFit: 'cover' }} // Updated for Next.js 13
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
      </div>
      <div className="p-2.5">
        <h2 className="text-2xl font-bold my-2">{name}</h2>
        
      </div>
    </div>
  );
};

export default Items;