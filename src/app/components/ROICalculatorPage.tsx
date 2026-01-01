import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function ROICalculatorPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    pricePerPizza: 12,
    costOfGoods: 2.50,
    pizzasPerDay: 20,
    operatingDays: 30,
    machineCost: 50000,
    rent: 0,
    revenueShare: 0
  });

  const calculateROI = () => {
    const monthlyRevenue = inputs.pricePerPizza * inputs.pizzasPerDay * inputs.operatingDays;
    const costOfGoodsTotal = inputs.costOfGoods * inputs.pizzasPerDay * inputs.operatingDays;
    const revenueShareCost = inputs.revenueShare > 0 ? (monthlyRevenue * inputs.revenueShare / 100) : 0;
    const monthlyCosts = costOfGoodsTotal + inputs.rent + revenueShareCost;
    const monthlyProfit = monthlyRevenue - monthlyCosts;
    const annualProfit = monthlyProfit * 12;
    const roiPercentage = ((annualProfit - inputs.machineCost) / inputs.machineCost) * 100;
    const paybackMonths = monthlyProfit > 0 ? inputs.machineCost / monthlyProfit : 0;

    return {
      monthlyRevenue,
      monthlyCosts,
      monthlyProfit,
      annualProfit,
      roiPercentage,
      paybackMonths
    };
  };

  const results = calculateROI();

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-blue-50 rounded-b-[3rem]">
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">ROI Calculator</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Calculate Your <span className="text-blue-600">ROI</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Estimate your return on investment with our interactive calculator
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl mb-8 text-slate-900 font-bold">Enter Your Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Price per Pizza ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.pricePerPizza}
                    onChange={(e) => handleInputChange('pricePerPizza', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Cost of Goods per Pizza ($)
                  </label>
                  <input
                    type="number"
                    min="2.50"
                    step="0.01"
                    value={inputs.costOfGoods}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 2.50;
                      handleInputChange('costOfGoods', value < 2.50 ? 2.50 : value);
                    }}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">Minimum: $2.50</p>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Pizzas per Day
                  </label>
                  <input
                    type="number"
                    value={inputs.pizzasPerDay}
                    onChange={(e) => handleInputChange('pizzasPerDay', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Operating Days per Month
                  </label>
                  <input
                    type="number"
                    value={inputs.operatingDays}
                    onChange={(e) => handleInputChange('operatingDays', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Machine Cost ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.machineCost}
                    onChange={(e) => handleInputChange('machineCost', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.rent}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      handleInputChange('rent', value);
                      if (value > 0) {
                        handleInputChange('revenueShare', 0);
                      }
                    }}
                    disabled={inputs.revenueShare > 0}
                    className={`w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 ${
                      inputs.revenueShare > 0 ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''
                    }`}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {inputs.revenueShare > 0 ? 'Disabled when Revenue Share is set' : 'Fixed monthly rent amount'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Revenue Share (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={inputs.revenueShare}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      handleInputChange('revenueShare', value);
                      if (value > 0) {
                        handleInputChange('rent', 0);
                      }
                    }}
                    disabled={inputs.rent > 0}
                    className={`w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 ${
                      inputs.rent > 0 ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''
                    }`}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {inputs.rent > 0 ? 'Disabled when Rent is set' : 'Percentage of revenue paid to location'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl mb-8 text-slate-900 font-bold">Your Results</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg text-slate-700 font-medium">Monthly Revenue</h3>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    ${results.monthlyRevenue.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-slate-600" />
                    <h3 className="text-lg text-slate-700 font-medium">Monthly Costs</h3>
                  </div>
                  <div className="text-4xl font-bold text-slate-700">
                    ${results.monthlyCosts.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg text-slate-700 font-medium">Monthly Profit</h3>
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    ${results.monthlyProfit.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg text-slate-700 font-medium">Annual Profit</h3>
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    ${results.annualProfit.toLocaleString()}
                  </div>
                </div>

                <div className={`p-6 border-2 rounded-xl ${
                  results.roiPercentage > 0 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className={`w-6 h-6 ${results.roiPercentage > 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <h3 className="text-lg text-slate-700 font-medium">ROI Percentage</h3>
                  </div>
                  <div className={`text-4xl font-bold ${results.roiPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.roiPercentage.toFixed(1)}%
                  </div>
                </div>

                <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg text-slate-700 font-medium">Payback Period</h3>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    {results.paybackMonths > 0 ? results.paybackMonths.toFixed(1) : 'N/A'} months
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/request-access')}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-blue-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Ready to Maximize Your ROI?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join businesses already seeing impressive returns with Pizza Anytime
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/request-access')}
              className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Request Access
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

