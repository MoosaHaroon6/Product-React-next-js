'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { useProductContext } from "./productContext";

const CartContext = createContext<CartContextType | null>(null);

type CartContextType = {
    cart: CartObjectType[];
    setCart: (cartProduct: CartObjectType[]) => void;
}

type CartObjectType = {
    id: string;
    title: string;
    category: string;
    price: number;
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {

    // const { products, fetchProducts } = useProductContext()!;

    const [cart, setCart] = useState<CartObjectType[]>([]);

    return (
        <>
            <CartContext.Provider value={{ cart, setCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}
export default CartContextProvider;
export const useCartContext = () => useContext(CartContext);