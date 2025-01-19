"use client";
import { useState } from "react";
import Items from './Items'; // Import the Items component

export default function AddItems() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [partName, setPartName] = useState("Interior");
  const [materialName, setMaterialName] = useState("Cotton");
  const [ecoFriendly, setEcoFriendly] = useState("Yes");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [products, setProducts] = useState([]);
  const viewNames = ["Front View", "Side View", "Back View", "Top View", "Bottom View"];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newImagePreviews = newImages.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(newImagePreviews).then((previews) => setImagePreviews(previews));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (images.length < 2) {
      alert("Please upload at least 2 images.");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: productName,
      description,
      price: parseFloat(proposedPrice),
      discount: parseFloat(discount),
      partName,
      materialName,
      ecoFriendly,
      images: imagePreviews,
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setDescription("");
    setProposedPrice("");
    setDiscount("");
    setPartName("Interior");
    setMaterialName("Cotton");
    setEcoFriendly("Yes");
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[hsl(var(--background))]">
      <div className="bg-[hsl(var(--card))] p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
        <h1 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))]">Add Product</h1>
        <form onSubmit={handleAddProduct} className="flex flex-col space-y-6">
          <div className="flex-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="proposedPrice" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                  Proposed Price
                </label>
                <input
                  type="number"
                  id="proposedPrice"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="discount" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="partName" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                  Part Name
                </label>
                <select
                  id="partName"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                >
                  <option value="Interior">Interior</option>
                  <option value="Exterior">Exterior</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="materialName" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                  Material Name
                </label>
                <select
                  id="materialName"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                >
                  {["Elastane", "Viscose", "Acrylic", "Cotton", "Lyocell", "Polyamide", "Nylon", "Fiber", "Modal", "Camel", "Linen", "Wool", "Cupro"].map((material) => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="ecoFriendly" className="block text-[hsl(var(--foreground))] font-medium mb-2">
                  Eco-Friendly
                </label>
                <select
                  id="ecoFriendly"
                  value={ecoFriendly}
                  onChange={(e) => setEcoFriendly(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-[hsl(var(--foreground))] font-medium mb-2">Product Images</label>
            <div className="border-dashed border-2 border-[hsl(var(--border))] rounded-lg p-4 flex flex-wrap justify-center items-center">
              {imagePreviews.length > 0 ? (
                imagePreviews.map((preview, index) => (
                  <div key={index} className="m-2 text-center">
                    <img src={preview} alt={`Product Preview ${index + 1}`} className="max-h-40" />
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{viewNames[index] || `View ${index + 1}`}</p>
                  </div>
                ))
              ) : (
                <span className="text-[hsl(var(--muted-foreground))]">No images uploaded</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('imageUpload').click()}
              className="mt-4 py-2 px-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-medium rounded-lg hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] transition-all"
            >
              + Add Image
            </button>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-medium rounded-lg hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] transition-all"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Display Added Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
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
            onEdit={() => console.log(`Edit ${product.name}`)}
            onDelete={() => console.log(`Delete ${product.name}`)}
          />
        ))}
      </div>
    </div>
  );
}
