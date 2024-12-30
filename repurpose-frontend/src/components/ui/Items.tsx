import React from 'react';
import Image from 'next/image';

interface ItemProps {
  imageUrl?: string; 
  name: string;
  description: string;
  originalPrice?: number;
  discount?: number;
}

const Items: React.FC<ItemProps> = ({ imageUrl, name, description, originalPrice, discount }) => {
  // Validate `originalPrice`
  const validOriginalPrice = typeof originalPrice === 'number' && originalPrice >= 0 ? originalPrice : 0;

  // Validate and calculate discounted price
  const isDiscountValid = typeof discount === 'number' && discount >= 0 && discount <= 100;
  const discountedPrice = isDiscountValid
    ? validOriginalPrice * (1 - discount / 100)
    : validOriginalPrice;

  // Calculate reward points
  const rewardPoints = (discountedPrice * 0.1).toFixed(2);

  return (
    <div className="w-[285px] h-[466px] border border-gray-300 rounded-lg overflow-hidden relative shadow-lg m-4">
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
        <div className={`absolute top-2 right-2 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center ${isDiscountValid ? 'bg-red-500' : 'bg-green-500'}`}>
          {isDiscountValid ? `-${discount}%` : 'NEW'}
        </div>
      </div>
      <div className="p-2.5">
        <h2 className="text-2xl font-bold my-2">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center my-2">
          {isDiscountValid ? (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 line-through mr-2">${validOriginalPrice.toFixed(2)}</span>
              <span className="text-base font-bold text-red-500">${discountedPrice.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-base font-bold">${validOriginalPrice.toFixed(2)}</span>
          )}
        </div>
        <p className="text-base font-bold my-2">RP: {rewardPoints}</p>
      </div>
    </div>
  );
};

export default Items;