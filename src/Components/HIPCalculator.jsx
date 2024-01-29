import React, { useState, useEffect } from 'react';

const HIPCalculator = () => {
  const [investments, setInvestments] = useState(Array(12).fill(''));
  const [isTerminated, setIsTerminated] = useState(false);

  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [assetUnderManagement, setAssetUnderManagement] = useState(0);

  const handleInvestmentChange = (monthIndex, amount) => {
    const updatedInvestments = [...investments];
    updatedInvestments[monthIndex] = amount;
    setInvestments(updatedInvestments);
  };

  const handleTerminate = () => {
    setIsTerminated(true);
  };

  const handleContinue = () => {
    setIsTerminated(false);
  };

  useEffect(() => {
    calculateInvestmentSummary(investments);
  }, [investments]);

  const calculateInvestmentSummary = (updatedInvestments) => {
    const monthlyInterestRate = 0.05; // Monthly interest rate (5%)
    const totalMonths = 12; // Total duration in months

    let totalInvestedAmount = 0;
    let totalEstimatedReturns = 0;
    let totalAssetUnderManagement = 0;

    for (let month = 0; month < totalMonths; month++) {
      const principal = parseFloat(updatedInvestments[month]) || 0;

      // Skip months with no investment
      if (principal === 0) continue;

      // Calculate interest for each month
      const monthlyInterest = principal * monthlyInterestRate;

      // Accumulate the interest over the remaining months
      for (let remainingMonths = totalMonths - month; remainingMonths > 0; remainingMonths--) {
        totalEstimatedReturns += monthlyInterest;
      }

      totalInvestedAmount += principal;
    }

    // Calculate totalAssetUnderManagement using the correct formula
    totalAssetUnderManagement = totalInvestedAmount + totalEstimatedReturns;

    // Update component state
    setInvestedAmount(totalInvestedAmount);
    setEstimatedReturns(totalEstimatedReturns);
    setAssetUnderManagement(totalAssetUnderManagement);
  };


  return (
    <div>
      {/* Main Layout */}
      <div className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 p-6 rounded-md shadow-md mx-auto max-w-md text-white">
        <h1 className="text-2xl font-bold mb-4">HIP Calculator</h1>

        {isTerminated ? (
          <p className="text-red-600 font-bold">Plan Terminated</p>
        ) : (
          <div>
            <div className="mb-4">
              <p className="mb-4">Enter the investment amount for each month:</p>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((monthName, monthIndex) => (
                <div key={monthIndex} className="mb-4 flex items-center">
                  <label className="mr-2">{`${monthName}: ₹`}</label>
                  <input
                    className="border rounded px-2 py-1 text-black"
                    type="number"
                    value={investments[monthIndex]}
                    onChange={(e) => handleInvestmentChange(monthIndex, e.target.value)}
                  />
                </div>
              ))}
             
            </div>


            <button
              className="bg-cardin-green hover:bg-red-700 text-black font-bold py-2 px-4 mr-2"
              onClick={handleTerminate}
            >
              Terminate Plan
            </button>
            <button
              className="bg-cardin-green hover:bg-green-700 text-black font-bold py-2 px-4"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        )}
        <hr className="my-4 border-white" />
      </div>

      {/* Space between main layout and investment summary */}
      <div className="my-8" />

      {/* Investment Summary */}
      <div className="bg-gray-200 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Investment Summary</h2>
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Invested Amount:</p>
          <p className="text-blue-500 text-lg">₹{investedAmount.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Estimated Returns:</p>
          <p className="text-blue-500 text-lg">₹{estimatedReturns.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Asset Under Management:</p>
          <p className="text-blue-500 text-lg">₹{assetUnderManagement.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default HIPCalculator;
