import React, { useState } from 'react';
import Image from 'next/image';

interface ItemProps {
  imageUrl: string[];
  name: string;
  description: string;
  originalPrice: number;
  discount?: number;
  partName: string;
  materialName: string;
  ecoFriendly: string;
  onDelete?: () => void;
  onClick?: () => void; // Add onClick prop to handle item click
}

const Items: React.FC<ItemProps> = ({
  imageUrl,
  name,
  description,
  originalPrice,
  discount,
  partName,
  materialName,
  ecoFriendly,
  onDelete,
  onClick // Destructure onClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountedPrice = discount ? originalPrice * (1 - discount / 100) : originalPrice;
  const rewardPoints = (discountedPrice * 0.10).toFixed(2);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
  };

  const handleEdit = () => {
    window.location.href = '/seller/dashboard/modify-items'; // Navigate to the modify item page
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete && onDelete();
    }
  };

  return (
    <div className="w-[285px] h-auto border border-gray-300 rounded-lg overflow-hidden relative shadow-lg m-4">
      <div className="w-[285px] h-[301px] relative cursor-pointer" onClick={onClick}>
        <Image 
          src={imageUrl[currentImageIndex]} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
        />
        {/* <div className={`absolute top-2 right-2 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center ${discount ? 'bg-red-500' : 'bg-green-500'}`}>
          {discount ? `-${discount}%` : 'NEW'}
        </div> */}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold my-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex justify-between items-center my-2">
          {discount ? (
            <div className="flex items-center">
              <p className="text-sm text-gray-500 line-through mr-2">${originalPrice.toFixed(2)}</p>
              <p className="text-base font-bold text-red-500">${discountedPrice.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-base font-bold">${originalPrice.toFixed(2)}</p>
          )}
        </div>
        <p className="text-base font-bold my-2">RP: {rewardPoints}</p>
        <p className="text-sm text-gray-600">{`Part: ${partName}`}</p>
        <p className="text-sm text-gray-600">{`Material: ${materialName}`}</p>
        <p className="text-sm text-gray-600">{`Eco-Friendly: ${ecoFriendly}`}</p>
        <div className="flex justify-between mt-4">
          <button onClick={handleEdit} className="text-blue-500 hover:underline">Edit</button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Items;
