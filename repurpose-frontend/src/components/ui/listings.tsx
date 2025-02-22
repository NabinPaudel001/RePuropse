"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { getUserId } from "@/utils/tokens";
import { apiRequest } from "@/middleware/errorInterceptor";

import Items from "./Items";
import { Product } from "@/types/types";

// sadcn UI components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const MyListings: React.FC = () => {
  const { user } = useUser();
  const sellerId = getUserId();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sellerId) {
      setError("Seller ID is missing. Please log in again.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        if (user?.role === "store") {
          response = await apiRequest("/api/product/", "GET");
        } else if (user?.role === "seller") {
          response = await apiRequest(`/api/product/seller/${sellerId}`, "GET");
        }

        if (response?.data) {
          // Force or "hardcode" the status for testing.
          // You can switch the below line to "pending", "booked", or "sold"
          // or even assign statuses dynamically if you like.
          const forcedStatus = "pending";

          // Map through your fetched products and override the status.
          const updatedProducts = response.data.map((product: Product) => ({
            ...product,
            status: forcedStatus,
          }));

          setProducts(updatedProducts);
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId, user?.role]);

  // Separate products by status
  const availableProducts = products.filter(
    (product) => product.status === "pending" || product.status === "booked"
  );
  const soldProducts = products.filter((product) => product.status === "sold");

  return (
    <Card className="p-5 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>

      <Tabs defaultValue="available">
        <TabsList className="mb-5">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
        </TabsList>

        {/* Available (pending or booked) */}
        <TabsContent value="available">
          {loading && <div>Loading products...</div>}
          {!loading && error && <div className="text-red-500 mb-4">{error}</div>}
          {!loading && !error && (
            <>
              {availableProducts.length === 0 ? (
                <div className="text-center py-4">No records found</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                  {availableProducts.map((product) => (
                    <Link
                      href={`/${user?.role}/dashboard/product/${product._id}`}
                      key={product._id}
                    >
                      <Items
                        _id={product._id}
                        imageUrl={product.images}
                        name={product.name}
                        description={product.description}
                        originalPrice={product.price}
                        discount={product.discount}
                        partName={product.partName}
                        materialName="Example Material"
                        ecoFriendly="Yes"
                        setProducts={setProducts}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Sold */}
        <TabsContent value="sold">
          {loading && <div>Loading products...</div>}
          {!loading && error && <div className="text-red-500 mb-4">{error}</div>}
          {!loading && !error && (
            <>
              {soldProducts.length === 0 ? (
                <div className="text-center py-4">No records found</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                  {soldProducts.map((product) => (
                    <Link
                      href={`/${user?.role}/dashboard/product/${product._id}`}
                      key={product._id}
                    >
                      <Items
                        _id={product._id}
                        imageUrl={product.images}
                        name={product.name}
                        description={product.description}
                        originalPrice={product.price}
                        discount={product.discount}
                        partName={product.partName}
                        materialName="Example Material"
                        ecoFriendly="Yes"
                        setProducts={setProducts}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MyListings;
