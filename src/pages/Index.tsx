
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Users, Heart } from "lucide-react";

const Index = () => {
  const [guestCount, setGuestCount] = useState([100]);
  const navigate = useNavigate();

  const handleStartCalculation = () => {
    localStorage.setItem('weddingBudget', JSON.stringify({
      guestCount: guestCount[0],
      services: {},
      totalCost: 0
    }));
    navigate('/venue');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="h-8 w-8 text-rose-400 fill-current" />
          <h1 className="text-4xl md:text-5xl font-serif text-rose-800">
            Wedding Budget Calculator
          </h1>
          <Heart className="h-8 w-8 text-rose-400 fill-current" />
        </div>
        <p className="text-lg text-rose-600 font-light max-w-2xl mx-auto">
          Plan your perfect Sri Lankan wedding with our elegant budget calculator
        </p>
      </div>

      {/* Guest Count Selector */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-2xl font-serif text-rose-800">
                How many guests will attend?
              </CardTitle>
            </div>
            <p className="text-rose-600">
              This will help us calculate costs for food, drinks, and invitations
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-rose-700 mb-2">
                {guestCount[0]}
              </div>
              <div className="text-rose-500 font-medium">guests</div>
            </div>
            
            <div className="px-4">
              <Slider
                value={guestCount}
                onValueChange={setGuestCount}
                max={500}
                min={20}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-rose-400 mt-2">
                <span>20</span>
                <span>500</span>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={handleStartCalculation}
                className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                Start Planning Your Wedding
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-rose-300 to-pink-300"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-300 to-yellow-300"></div>
      </div>
    </div>
  );
};

export default Index;
