import React from 'react';
import Image from 'next/image';

interface ItemProps {
  imageUrl: string;
  name: string;
  description: string;
  originalPrice: number; // Changed to number for calculation
  discount?: number; // Changed to number for calculation
}

const Items: React.FC<ItemProps> = ({ imageUrl, name, description, originalPrice, discount }) => {
  // Calculate discounted price if discount is provided
  const discountedPrice = discount ? originalPrice * (1 - discount / 100) : originalPrice;

  // Calculate reward points as 10% of the discounted price or original price
  const rewardPoints = (discountedPrice * 0.10).toFixed(2);

  return (
    <div className="w-[285px] h-[466px] border border-gray-300 rounded-lg overflow-hidden relative">
      <div className="w-[285px] h-[301px] relative">
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
        />
        <div className={`absolute top-2 right-2 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center ${discount ? 'bg-red-500' : 'bg-green-500'}`}>
          {discount ? `-${discount}%` : 'NEW'}
        </div>
      </div>
      <div className="p-2.5">
        <h2 className="text-2xl font-bold my-2">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center my-2">
          {discount ? (
            <div className="flex items-center">Price :  
              <p className="text-sm text-gray-500 line-through mr-2">${originalPrice.toFixed(2)}</p>
              <p className="text-base font-bold text-red-500">${discountedPrice.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-base font-bold">${originalPrice.toFixed(2)}</p>
          )}
        </div>
        <p className="text-base font-bold my-2">RP : {rewardPoints}</p>
      </div>
    </div>
  );
};

export default Items;
