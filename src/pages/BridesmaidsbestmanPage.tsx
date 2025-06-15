
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, ArrowRight } from "lucide-react";
import { FloatingTotal } from "@/components/FloatingTotal";

const bridesmaidsbestmanOptions = [
  {
    tier: "budget",
    title: "Budget Bridesmaids/Bestman",
    price: "LKR 20,000 - 50,000",
    priceRange: [20000, 50000],
    features: [
      "Basic attire & accessories",
      "Simple coordination",
      "Standard arrangements"
    ],
    color: "from-green-400 to-emerald-500"
  },
  {
    tier: "mid",
    title: "Mid-Range Bridesmaids/Bestman",
    price: "LKR 100,000 - 150,000",
    priceRange: [100000, 150000],
    features: [
      "Designer attire collection",
      "Professional coordination",
      "Enhanced arrangements"
    ],
    color: "from-blue-400 to-indigo-500"
  },
  {
    tier: "premium",
    title: "Premium Bridesmaids/Bestman",
    price: "LKR 250,000 - 400,000",
    priceRange: [250000, 400000],
    features: [
      "Luxury attire & styling",
      "Complete coordination package",
      "Premium arrangements"
    ],
    color: "from-purple-400 to-pink-500"
  }
];

const BridesmaidsbestmanPage = () => {
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [budgetData, setBudgetData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('weddingBudget');
    if (data) {
      setBudgetData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleNext = () => {
    if (!selectedTier || !budgetData) return;

    const selectedOption = bridesmaidsbestmanOptions.find(opt => opt.tier === selectedTier);
    const avgPrice = (selectedOption!.priceRange[0] + selectedOption!.priceRange[1]) / 2;

    const updatedBudget = {
      ...budgetData,
      services: {
        ...budgetData.services,
        bridesmaidsbestman: {
          tier: selectedTier,
          fixedCost: avgPrice,
          totalCost: avgPrice
        }
      }
    };

    localStorage.setItem('weddingBudget', JSON.stringify(updatedBudget));
    navigate('/summary');
  };

  if (!budgetData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-rose-500" />
            <h1 className="text-3xl font-serif text-rose-800">Bridesmaids/Bestman</h1>
          </div>
          <p className="text-rose-600">Choose arrangements for your wedding party</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {bridesmaidsbestmanOptions.map((option) => (
            <Card 
              key={option.tier}
              className={`cursor-pointer transition-all duration-300 ${
                selectedTier === option.tier 
                  ? 'ring-2 ring-rose-400 shadow-xl scale-105' 
                  : 'hover:shadow-lg hover:scale-102'
              } bg-white/80 backdrop-blur-sm border-rose-200`}
              onClick={() => setSelectedTier(option.tier)}
            >
              <CardHeader>
                <div className={`w-full h-24 rounded-lg bg-gradient-to-r ${option.color} mb-4`}></div>
                <CardTitle className="text-xl font-serif text-rose-800">{option.title}</CardTitle>
                <div className="text-lg font-bold text-rose-600">{option.price}</div>
                <div className="text-sm text-rose-500">fixed cost</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-rose-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Button
            onClick={() => navigate('/jewelry')}
            variant="outline"
            className="border-rose-300 text-rose-700 hover:bg-rose-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jewelry
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedTier}
            className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white disabled:opacity-50"
          >
            View Summary
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <FloatingTotal />
    </div>
  );
};

export default BridesmaidsbestmanPage;
