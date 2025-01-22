"use client";
import { useState } from "react";
import { apiRequest } from '../../middleware/errorInterceptor';
import Items from "./Items"; // Import the Items component

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  // discount: number;
  partName: string;
  materialName: string;
  ecoFriendly: string;
  images: string[];
}

const MATERIALS = [
  "Elastane",
  "Viscose",
  "Acrylic",
  "Cotton",
  "Lyocell",
  "Polyamide",
  "Nylon",
  "Fiber",
  "Modal",
  "Camel",
  "Linen",
  "Wool",
  "Cupro",
];

const VIEWS = ["Front View", "Side View", "Back View", "Top View", "Bottom View"];

export default function AddItems() {
  const [formState, setFormState] = useState({
    productName: "",
    description: "",
    proposedPrice: "",
    // discount: "",
    partName: "Interior",
    materialName: "Cotton",
    ecoFriendly: "Yes",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length + images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (images.length < 2) {
      alert("Please upload at least 2 images.");
      return;
    }
  
    const formData = new FormData();
    formData.append('name', formState.productName);
    formData.append('description', formState.description);
    formData.append('price', formState.proposedPrice);
    formData.append('partName', formState.partName);
    formData.append('materialName', formState.materialName);
    formData.append('ecoFriendly', formState.ecoFriendly);
  
    images.forEach((image) => formData.append('images', image));
  
    try {
      const response = await apiRequest('/api/product/', {
        method: 'POST',
        body: formData,
      });
  
      if (response.code === 200) {
        alert("Product added successfully!");
        resetForm();
      } else {
        alert(response.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };
  
  


  const resetForm = () => {
    setFormState({
      productName: "",
      description: "",
      proposedPrice: "",
      // discount: "",
      partName: "Interior",
      materialName: "Cotton",
      ecoFriendly: "Yes",
    });
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[hsl(var(--background))]">
      <div className="bg-[hsl(var(--card))] p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
        <h1 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))]">Add Product</h1>
        <form onSubmit={handleAddProduct} className="flex flex-col space-y-6">
          <div className="flex-1">
            <label htmlFor="productName" className="block font-medium mb-2">Product Name</label>
            <input
              type="text"
              id="productName"
              value={formState.productName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <label htmlFor="description" className="block font-medium mb-2 mt-4">Description</label>
            <textarea
              id="description"
              value={formState.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              required
            ></textarea>

            <div className="flex space-x-4 mt-4">
              <div className="flex-1">
                <label htmlFor="proposedPrice" className="block font-medium mb-2">Proposed Price</label>
                <input
                  type="number"
                  id="proposedPrice"
                  value={formState.proposedPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              {/* <div className="flex-1">
                <label htmlFor="discount" className="block font-medium mb-2">Discount (%)</label>
                <input
                  type="number"
                  id="discount"
                  value={formState.discount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div> */}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="partName" className="block font-medium mb-2">Part Name</label>
              <select
                id="partName"
                value={formState.partName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="materialName" className="block font-medium mb-2">Material Name</label>
              <select
                id="materialName"
                value={formState.materialName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {MATERIALS.map((material) => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="ecoFriendly" className="block font-medium mb-2">Eco-Friendly</label>
              <select
                id="ecoFriendly"
                value={formState.ecoFriendly}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex space-x-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="text-center">
                  <img src={preview} alt={`Preview ${index}`} className="h-32 w-32 object-cover" />
                  <p className="text-sm">{VIEWS[index] || `View ${index + 1}`}</p>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">
            Add Product
          </button>
        </form>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {products.map((product) => (
          <Items
            key={product.id}
            imageUrl={product.images}
            name={product.name}
            description={product.description}
            originalPrice={product.price}
            discount={product.discount}
            partName={product.partName}
            materialName={product.materialName}
            ecoFriendly={product.ecoFriendly}
            // onEdit={() => console.log(`Edit ${product.name}`)}
            // onDelete={() => console.log(`Delete ${product.name}`)}
          />
        ))}
      </div> */}
    </div>
  );
}
