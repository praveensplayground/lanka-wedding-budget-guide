
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Heart, Users } from "lucide-react";

const SummaryPage = () => {
  const [budgetData, setBudgetData] = useState<any>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [miscellaneousCost, setMiscellaneousCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('weddingBudget');
    if (data) {
      const parsed = JSON.parse(data);
      setBudgetData(parsed);
      
      let total = 0;
      Object.values(parsed.services || {}).forEach((service: any) => {
        total += service.totalCost || 0;
      });
      
      const misc = total * 0.1; // 10% miscellaneous
      setTotalCost(total);
      setMiscellaneousCost(misc);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadPDF = () => {
    // For now, we'll show an alert. In a real app, you'd integrate with a PDF library
    alert('PDF download feature would be implemented here using libraries like jsPDF or react-pdf');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'budget': return 'text-green-600 bg-green-100';
      case 'mid': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!budgetData) return null;

  const finalTotal = totalCost + miscellaneousCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-rose-400 fill-current" />
            <h1 className="text-4xl font-serif text-rose-800">Your Wedding Budget</h1>
            <Heart className="h-8 w-8 text-rose-400 fill-current" />
          </div>
          <p className="text-rose-600">Here's your personalized wedding cost estimate</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Guest Count Summary */}
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 text-rose-800">
                <Users className="h-5 w-5" />
                <span className="text-lg font-semibold">{budgetData.guestCount} Guests</span>
              </div>
            </CardContent>
          </Card>

          {/* Services Summary */}
          <div className="grid gap-4">
            {Object.entries(budgetData.services || {}).map(([serviceKey, service]: [string, any]) => (
              <Card key={serviceKey} className="bg-white/80 backdrop-blur-sm border-rose-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-serif text-rose-800 capitalize mb-2">
                        {serviceKey.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTierColor(service.tier)}`}>
                        {service.tier} Tier
                      </span>
                      {service.pricePerPerson && (
                        <p className="text-sm text-rose-600 mt-2">
                          {formatCurrency(service.pricePerPerson)} per person × {budgetData.guestCount} guests
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-rose-700">
                        {formatCurrency(service.totalCost)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subtotal */}
          <Card className="bg-white/90 backdrop-blur-sm border-rose-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif text-rose-800">Subtotal</h3>
                <div className="text-2xl font-bold text-rose-700">
                  {formatCurrency(totalCost)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Miscellaneous Cost */}
          <Card className="bg-white/90 backdrop-blur-sm border-rose-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif text-rose-800">Miscellaneous</h3>
                  <p className="text-sm text-rose-600">10% additional costs</p>
                </div>
                <div className="text-2xl font-bold text-rose-700">
                  {formatCurrency(miscellaneousCost)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Cost */}
          <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-serif mb-4">Total Estimated Cost</h2>
                <div className="text-5xl font-bold mb-2">{formatCurrency(finalTotal)}</div>
                <p className="text-rose-100">
                  This is an estimate based on your selections. Actual costs may vary.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              onClick={() => navigate('/photography')}
              variant="outline"
              className="border-rose-300 text-rose-700 hover:bg-rose-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Photography
            </Button>
            
            <Button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF Estimate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
