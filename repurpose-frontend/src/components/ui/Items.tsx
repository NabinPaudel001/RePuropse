import React, { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { apiRequest } from '@/middleware/errorInterceptor';
import { Product } from '@/types/types';


interface ItemProps {
  _id: string;
  imageUrl: string[];
  name: string;
  description: string;
  originalPrice: number;
  discount?: number;
  partName: string;
  materialName: string;
  ecoFriendly: string;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; 
  onClick?: () => void; // Add onClick prop to handle item click
}

const Items: React.FC<ItemProps> = ({
  _id,
  imageUrl,
  name,
  description,
  originalPrice,
  discount,
  partName,
  materialName,
  ecoFriendly,
  setProducts,
  onClick // Destructure onClick
}) => {

    const { user, setUser } = useUser();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountedPrice = discount ? originalPrice * (1 - discount / 100) : originalPrice;
  // const rewardPoints = (discountedPrice * 0.10).toFixed(2);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click event from reaching the <Link>
    try {
      const response = await apiRequest(`/api/product/${_id}`, {
        method: 'DELETE'
      });
      if (response.code === 200) {
        alert("Product deleted successfully!");
        setProducts((prev) => prev.filter((product) => product._id !== _id)); // Remove deleted product
      }
    } catch (err) {
      console.error(err);
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
            <p className="text-base font-bold">NRP {originalPrice.toFixed(2)}</p>
          )}
        </div>
        {/* <p className="text-base font-bold my-2">RP: {rewardPoints}</p> */}
        <p className="text-sm text-gray-600">{`Part: ${partName}`}</p>
        <p className="text-sm text-gray-600">{`Material: ${materialName}`}</p>
        <p className="text-sm text-gray-600">{`Eco-Friendly: ${ecoFriendly}`}</p>
        {/* {user?.role === "seller" && (
          <div className="flex justify-between mt-4">
          <button className="text-blue-500 hover:underline">Edit</button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
        </div>
        )} */}
      </div>
    </div>
  );
};

export default Items;
