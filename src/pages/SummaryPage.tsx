
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Heart, Users } from "lucide-react";

const SummaryPage = () => {
  const [budgetData, setBudgetData] = useState<any>(null);
  const [totalCostRange, setTotalCostRange] = useState({ min: 0, max: 0 });
  const [miscellaneousCost, setMiscellaneousCost] = useState({ min: 0, max: 0 });
  const [grandTotal, setGrandTotal] = useState({ min: 0, max: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('weddingBudget');
    if (data) {
      const parsed = JSON.parse(data);
      setBudgetData(parsed);
      
      let minTotal = 0;
      let maxTotal = 0;
      
      Object.values(parsed.services || {}).forEach((service: any) => {
        if (service.priceRange) {
          // For per-person services
          if (service.pricePerPerson) {
            minTotal += service.priceRange[0] * parsed.guestCount;
            maxTotal += service.priceRange[1] * parsed.guestCount;
          } else {
            // For fixed cost services
            minTotal += service.priceRange[0];
            maxTotal += service.priceRange[1];
          }
        }
      });
      
      setTotalCostRange({ min: minTotal, max: maxTotal });
      
      // Calculate 10% miscellaneous
      const miscMin = minTotal * 0.1;
      const miscMax = maxTotal * 0.1;
      setMiscellaneousCost({ min: miscMin, max: miscMax });
      
      // Calculate grand total with miscellaneous
      setGrandTotal({ 
        min: minTotal + miscMin, 
        max: maxTotal + miscMax 
      });
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

  const formatRange = (min: number, max: number) => {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
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

  const getServiceCostRange = (service: any, guestCount: number) => {
    if (service.priceRange) {
      if (service.pricePerPerson) {
        return {
          min: service.priceRange[0] * guestCount,
          max: service.priceRange[1] * guestCount
        };
      } else {
        return {
          min: service.priceRange[0],
          max: service.priceRange[1]
        };
      }
    }
    return { min: 0, max: 0 };
  };

  if (!budgetData) return null;

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
            {Object.entries(budgetData.services || {}).map(([serviceKey, service]: [string, any]) => {
              const costRange = getServiceCostRange(service, budgetData.guestCount);
              return (
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
                            {formatRange(service.priceRange[0], service.priceRange[1])} per person × {budgetData.guestCount} guests
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-rose-700">
                          {formatRange(costRange.min, costRange.max)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Subtotal */}
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif text-rose-800">Subtotal</h3>
                <div className="text-2xl font-bold text-rose-700">
                  {formatRange(totalCostRange.min, totalCostRange.max)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Miscellaneous (10%) */}
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif text-rose-800">Miscellaneous</h3>
                  <p className="text-sm text-rose-600">10% of total costs</p>
                </div>
                <div className="text-2xl font-bold text-rose-700">
                  {formatRange(miscellaneousCost.min, miscellaneousCost.max)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grand Total */}
          <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-serif mb-4">Total Estimated Cost</h2>
                <div className="text-5xl font-bold mb-2">{formatRange(grandTotal.min, grandTotal.max)}</div>
                <p className="text-rose-100">
                  This is an estimate based on your selections. Actual costs may vary.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              onClick={() => navigate('/bridesmaids-bestman')}
              variant="outline"
              className="border-rose-300 text-rose-700 hover:bg-rose-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bridesmaids/Bestman
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
