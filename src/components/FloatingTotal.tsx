
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export const FloatingTotal = () => {
  const [totalCostRange, setTotalCostRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const calculateTotal = () => {
      const data = localStorage.getItem('weddingBudget');
      if (data) {
        const budgetData = JSON.parse(data);
        let minTotal = 0;
        let maxTotal = 0;
        
        Object.values(budgetData.services || {}).forEach((service: any) => {
          if (service.priceRange) {
            if (service.pricePerPerson) {
              // For per-person services
              minTotal += service.priceRange[0] * budgetData.guestCount;
              maxTotal += service.priceRange[1] * budgetData.guestCount;
            } else {
              // For fixed cost services
              minTotal += service.priceRange[0];
              maxTotal += service.priceRange[1];
            }
          }
        });
        
        // Add 10% miscellaneous
        const miscMin = minTotal * 0.1;
        const miscMax = maxTotal * 0.1;
        
        setTotalCostRange({ 
          min: minTotal + miscMin, 
          max: maxTotal + miscMax 
        });
      }
    };

    // Calculate initial total
    calculateTotal();
    
    // Listen for storage changes instead of polling
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'weddingBudget') {
        calculateTotal();
      }
    };

    // Listen for custom events when localStorage is updated from the same tab
    const handleBudgetUpdate = () => {
      calculateTotal();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('budgetUpdated', handleBudgetUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('budgetUpdated', handleBudgetUpdate);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRange = (min: number, max: number) => {
    if (min === max) return formatCurrency(min);
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };

  return (
    <Card className="fixed bottom-6 right-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl border-0 z-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          <div>
            <div className="text-sm font-medium">Current Total</div>
            <div className="text-lg font-bold">{formatRange(totalCostRange.min, totalCostRange.max)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
