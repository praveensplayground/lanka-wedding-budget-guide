
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassWater, ArrowLeft, ArrowRight } from "lucide-react";
import { FloatingTotal } from "@/components/FloatingTotal";

const LiquorPage = () => {
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

  const liquorOptions = [
    {
      tier: "budget",
      title: "Budget Drinks",
      price: "LKR 1,500 - 2,500",
      priceRange: [1500, 2500],
      features: ["Local spirits & beer", "Standard selection", "Self-serve"],
      color: "from-green-400 to-emerald-500"
    },
    {
      tier: "mid",
      title: "Mid-Range Drinks",
      price: "LKR 3,000 - 5,000",
      priceRange: [3000, 5000],
      features: ["Mix of local & imported", "Basic cocktails", "Professional bartender"],
      color: "from-blue-400 to-indigo-500"
    },
    {
      tier: "premium",
      title: "Premium Bar",
      price: "LKR 6,000 - 9,000",
      priceRange: [6000, 9000],
      features: ["Imported liquors", "Full cocktails", "Luxe bar experience"],
      color: "from-purple-400 to-pink-500"
    }
  ];

  const handleNext = () => {
    if (!selectedTier || !budgetData) return;
    
    const selectedOption = liquorOptions.find(opt => opt.tier === selectedTier);
    const avgPrice = (selectedOption!.priceRange[0] + selectedOption!.priceRange[1]) / 2;
    
    const updatedBudget = {
      ...budgetData,
      services: {
        ...budgetData.services,
        liquor: {
          tier: selectedTier,
          pricePerPerson: avgPrice,
          totalCost: avgPrice * budgetData.guestCount
        }
      }
    };

    localStorage.setItem('weddingBudget', JSON.stringify(updatedBudget));
    navigate('/wedding-cakes');
  };

  if (!budgetData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GlassWater className="h-6 w-6 text-rose-500" />
            <h1 className="text-3xl font-serif text-rose-800">Drinks & Liquor</h1>
          </div>
          <p className="text-rose-600">Choose your wedding bar experience</p>
          <p className="text-sm text-rose-500 mt-2">For {budgetData.guestCount} guests</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {liquorOptions.map((option) => (
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
                <div className="text-sm text-rose-500">per person</div>
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
            onClick={() => navigate('/invitations')}
            variant="outline"
            className="border-rose-300 text-rose-700 hover:bg-rose-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invitations
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedTier}
            className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white disabled:opacity-50"
          >
            Next: Cake & Boxes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <FloatingTotal />
    </div>
  );
};

export default LiquorPage;
