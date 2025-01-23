"use client";
import React, { useState, useEffect } from "react";

const ModifyItems: React.FC = (id:any) => {
  const [products, setProducts] = useState<{ id: number; name: string; description: string; price: string; discount: string; partName: string; materialName: string; ecoFriendly: string; images: string[] }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; description: string; price: string; discount: string; partName: string; materialName: string; ecoFriendly: string; images: string[] } | null>(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [partName, setPartName] = useState("Interior");
  const [materialName, setMaterialName] = useState("Cotton");
  const [ecoFriendly, setEcoFriendly] = useState("Yes");
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const viewNames = ["Front View", "Side View", "Back View", "Top View", "Bottom View"];

  useEffect(() => {
    const fetchData = async () => {
      const mockData = [
        { id: 1, name: "Product 1", description: "Description 1", price: "10", discount: "5", partName: "Interior", materialName: "Cotton", ecoFriendly: "Yes", images: ["/path/to/image1.jpg", "/path/to/image2.jpg"] },
        { id: 2, name: "Product 2", description: "Description 2", price: "20", discount: "10", partName: "Exterior", materialName: "Wool", ecoFriendly: "No", images: ["/path/to/image3.jpg"] },
      ];
      setProducts(mockData);
    };

    fetchData();
  }, []);

  const handleEditProduct = (product: { id: number; name: string; description: string; price: string; discount: string; partName: string; materialName: string; ecoFriendly: string; images: string[] }) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setDescription(product.description);
    setProposedPrice(product.price);
    setDiscount(product.discount);
    setPartName(product.partName);
    setMaterialName(product.materialName);
    setEcoFriendly(product.ecoFriendly);
    setImages(product.images);
    setImagePreviews(product.images);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length + images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages as string[]);

    const newImagePreviews = newImages.map((file) => {
      if (typeof file === 'string') {
        return file;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(newImagePreviews).then((previews) => setImagePreviews(previews as string[]));
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newImagePreviews);
  };

  const handleModifyProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (images.length < 1) {
      alert("Please upload at least 1 image.");
      return;
    }
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct?.id
        ? { ...product, name: productName, description, price: proposedPrice, discount, partName, materialName, ecoFriendly, images }
        : product
    );
    setProducts(updatedProducts);
    setSelectedProduct(null);
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
    <div className="p-6 bg-[hsl(var(--background))] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-[hsl(var(--primary))]">Modify Items</h1>
      <table className="min-w-full bg-white mb-6 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">S.N</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Part Name</th>
            <th className="py-2 px-4 border-b">Material Name</th>
            <th className="py-2 px-4 border-b">Eco-Friendly</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.discount}</td>
              <td className="py-2 px-4 border-b">{product.partName}</td>
              <td className="py-2 px-4 border-b">{product.materialName}</td>
              <td className="py-2 px-4 border-b">{product.ecoFriendly}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button type="button"
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleModifyProduct} className="space-y-6">
              <div className="flex space-x-6">
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
                      rows={4}
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
                  <div className="mb-4">
                    <label htmlFor="discount" className="block text-gray-700 font-medium mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      id="discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">Product Images</label>
                  <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-wrap justify-center items-center">
                    {imagePreviews.length > 0 ? (
                      imagePreviews.map((preview, index) => (
                        <div key={index} className="m-2 text-center">
                          <img src={preview} alt={`Product Preview ${index + 1}`} className="max-h-40" />
                          <p className="text-sm text-gray-600">{viewNames[index] || `View ${index + 1}`}</p>
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="mt-2 text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No images uploaded</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => document.getElementById('imageUpload')?.click()}
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
                    title="Upload images"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="partName" className="block text-gray-700 font-medium mb-2">
                    Part Name
                  </label>
                  <select
                    id="partName"
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="materialName" className="block text-gray-700 font-medium mb-2">
                    Material Name
                  </label>
                  <select
                    id="materialName"
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {["Elastane", "Viscose", "Acrylic", "Cotton", "Lyocell", "Polyamide", "Nylon", "Fiber", "Modal", "Camel", "Linen", "Wool", "Cupro"].map((material) => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="ecoFriendly" className="block text-gray-700 font-medium mb-2">
                    Eco-Friendly
                  </label>
                  <select
                    id="ecoFriendly"
                    value={ecoFriendly}
                    onChange={(e) => setEcoFriendly(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyItems;
