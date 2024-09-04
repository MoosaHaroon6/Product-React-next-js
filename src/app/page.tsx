"use client";
import { useProductContext } from "@/context/productContext";
import { useState } from "react";

type ProductType = {
  id: string;
  title: string;
  category: string;
  price: number;
};

export default function Home() {
  const context = useProductContext();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!context) {
    return <p>Loading....</p>;
  }

  const { products, fetchProducts } = context;

  const btnHandler = (product: ProductType) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const dltBtnHandler = (index: number) => {
    const productsArrClone = [...products];
    productsArrClone.splice(index, 1);
    fetchProducts(productsArrClone);
    const cartClone = [...cartItems];
    cartClone.splice(index, 1);
    setCartItems(cartClone);
  }

  return (
    <div>
      <header style={{ width: '100%', borderBottom: '1px solid black', height: '70px', position: 'relative' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              width: '60px', height: '60px', border: '1px solid teal',
              borderRadius: '50%', marginLeft: '10px'
            }}
          ></div>
          <ul style={{ listStyleType: 'none', display: 'flex', width: '400px', justifyContent: 'space-evenly' }}>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between' }}>
        <div>
          {products.map(({ id, title, category, price }) => (
            <div
              key={id}
              style={{
                margin: "10px",
                backgroundColor: "lightgrey",
                padding: "10px",
                border: "1px solid #ccc",
                width: "300px",
              }}
            >
              <h3>{title}</h3>
              <p>{category}</p>
              <p>Price: ${price}</p>
              <button onClick={() => btnHandler({ id, title, price, category })}>Add to Cart</button>
            </div>
          ))}
        </div>
        {isCartOpen && (
          <div
            style={{
              position: "fixed",
              right: "0",
              top: "70px", // Adjusted to appear below the header
              width: "250px", // Adjusted size
              height: "calc(100% - 70px)", // Adjusted to fit below the header
              backgroundColor: "white",
              borderLeft: "1px solid #ccc",
              padding: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              overflowY: "auto", // Added scroll for overflowing content
            }}
          >
            {cartItems.length > 0 ? (
              cartItems.map(({ title, price }, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>{title}</p>
                  <p>${price}</p>
                  <button onClick={() => dltBtnHandler(index)}>Remove</button>
                </div>
              ))
            ) : (
              <p>Nothing in Cart</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
