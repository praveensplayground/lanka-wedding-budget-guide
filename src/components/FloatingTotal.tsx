
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export const FloatingTotal = () => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const data = localStorage.getItem('weddingBudget');
      if (data) {
        const budgetData = JSON.parse(data);
        let total = 0;
        
        Object.values(budgetData.services || {}).forEach((service: any) => {
          total += service.totalCost || 0;
        });
        
        setTotalCost(total);
      }
    };

    calculateTotal();
    const interval = setInterval(calculateTotal, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="fixed bottom-6 right-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl border-0 z-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          <div>
            <div className="text-sm font-medium">Current Total</div>
            <div className="text-xl font-bold">{formatCurrency(totalCost)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
