
"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { SectionRenderer } from "@/components/SectionRenderer";
import { ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  unit: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [signedContracts, setSignedContracts] = useState<ContractGenerationOutput[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleContractSigned = (contract: ContractGenerationOutput) => {
    setSignedContracts((prev) => [contract, ...prev]);
  };

  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        quantity: 1,
        unit: product.unit
      }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <Shell 
      activeSection={activeSection} 
      onNavigate={setActiveSection}
      cart={cart}
      onRemoveFromCart={handleRemoveFromCart}
      onUpdateQuantity={handleUpdateQuantity}
    >
      <SectionRenderer 
        sectionId={activeSection} 
        onNavigate={setActiveSection} 
        signedContracts={signedContracts}
        onContractSigned={handleContractSigned}
        cart={cart}
        onAddToCart={handleAddToCart}
      />
    </Shell>
  );
}
