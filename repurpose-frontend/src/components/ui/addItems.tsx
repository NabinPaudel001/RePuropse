"use client";
import { useState } from "react";

/**
 * A React functional component that allows users to add a product with details such as name, description, proposed price, and multiple images with view names.
 * 
 * @returns {JSX.Element} A JSX element containing the product addition form.
 */
export default function AddItems() {
  // State variables to manage product details
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const viewNames = ["Front View", "Side View", "Back View", "Top View", "Bottom View"];

  /**
   * Handles the image upload and sets the images and their previews.
   * 
   * @param {Event} event - The event triggered by the file input change.
   */
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

  /**
   * Handles the form submission to add a product.
   * 
   * @param {Event} event - The event triggered by the form submission.
   */
  const handleAddProduct = (event) => {
    event.preventDefault();
    if (images.length < 2) {
      alert("Please upload at least 2 images.");
      return;
    }
    // Implement logic to add product
    console.log("Product added:", { productName, description, proposedPrice, images });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleAddProduct} className="flex space-x-6">
          <div className="flex-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="proposedPrice" className="block text-gray-700 font-medium mb-2">
                Proposed Price
              </label>
              <input
                type="number"
                id="proposedPrice"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
            >
              Add Item
            </button>
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium mb-2">Product Images</label>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-wrap justify-center items-center">
              {imagePreviews.length > 0 ? (
                imagePreviews.map((preview, index) => (
                  <div key={index} className="m-2 text-center">
                    <img src={preview} alt={`Product Preview ${index + 1}`} className="max-h-40" />
                    <p className="text-sm text-gray-600">{viewNames[index] || `View ${index + 1}`}</p>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">No images uploaded</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('imageUpload').click()}
              className="mt-4 py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all"
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
        </form>
      </div>
    </div>
  );
}
