'use client';
import { createContext, ReactNode, useContext, useState } from "react";

type ProductContextType = {
    products: ProductType[];
    fetchProducts: (products: ProductType[]) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

type ProductType = {
    id: string,
    title: string,
    category: string,
    price: number,
}

const productData = [
    {
        id: '1',
        title: 'PC',
        category: 'Electronic',
        price: 3500
    },
    {
        id: '2',
        title: 'Laptop',
        category: 'Electronic',
        price: 3300
    },
    {
        id: '3',
        title: 'Football',
        category: 'Sports',
        price: 1200
    }
]

export default function ProductContextProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<ProductType[]>(productData);

    const fetchProducts = (newProducts: ProductType[]) => {
        setProducts([...products, ...newProducts])
    }

    return (
        <>
            <ProductContext.Provider value={{ products, fetchProducts }}>
                {children}
            </ProductContext.Provider>
        </>
    )
}

export const useProductContext = () => useContext(ProductContext)