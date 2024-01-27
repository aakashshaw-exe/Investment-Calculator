import React, { useState } from 'react';

const HIPCalculator = ({
  onAmountSelect,
  onPeriodRangeSelect,
  onInterestRateSelect,
  onCalculate,
  onUpdateSimpleInterest,
}) => {
  const [investments, setInvestments] = useState(Array(12).fill(''));
  const [isTerminated, setIsTerminated] = useState(false);

  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [assetUnderManagement, setAssetUnderManagement] = useState(0);

  const handleInvestmentChange = (monthIndex, amount) => {
    const updatedInvestments = [...investments];
    updatedInvestments[monthIndex] = amount;
    setInvestments(updatedInvestments);

    // Recalculate the Investment Summary
    calculateInvestmentSummary(updatedInvestments);
  };

  const handleTerminate = () => {
    setIsTerminated(true);
  };

  const handleContinue = () => {
    setIsTerminated(false);
  };

  const calculateInvestmentSummary = (updatedInvestments) => {
    const monthlyInterestRate = 5; // Monthly interest rate (5%)
    const time = 1; // 1 year

    let totalInvestedAmount = 0;
    let totalEstimatedReturns = 0;

    for (let month = 0; month < 12; month++) {
      const principal = parseFloat(updatedInvestments[month]) || 0;
      const remainingMonths = 12 - month;
      const simpleInterest = (principal * monthlyInterestRate * time * remainingMonths) / 100;

      totalInvestedAmount += principal;
      totalEstimatedReturns += simpleInterest;
    }

    const totalAssetUnderManagement = totalInvestedAmount + totalEstimatedReturns;

    setInvestedAmount(totalInvestedAmount);
    setEstimatedReturns(totalEstimatedReturns);
    setAssetUnderManagement(totalAssetUnderManagement);

    // Pass the calculated values to the parent component
    onAmountSelect(totalInvestedAmount.toFixed(2));
    onPeriodRangeSelect('Invalid value'); // You may adjust this based on your logic
    onInterestRateSelect(totalEstimatedReturns.toFixed(2));
    onCalculate(totalInvestedAmount, totalEstimatedReturns, totalAssetUnderManagement);

    // Pass the calculated values to SimpleInterestCalculator
    onUpdateSimpleInterest({
      investedAmount: totalInvestedAmount,
      estimatedReturns: totalEstimatedReturns,
      assetUnderManagement: totalAssetUnderManagement,
    });
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-md shadow-md mx-auto max-w-md text-white">
      <h1 className="text-2xl font-bold mb-4">HIP Calculator</h1>
      
      {isTerminated ? (
        <p className="text-red-600 font-bold">Plan Terminated</p>
      ) : (
        <div>
          <p className="mb-4">Enter the investment amount for each month:</p>
          {investments.map((investment, monthIndex) => (
            <div key={monthIndex} className="mb-4 flex items-center">
              <label className="mr-2">{`Month ${monthIndex + 1}: ₹`}</label>
              <input
                className="border rounded px-2 py-1 text-black" // Set text color to black
                type="number"
                value={investment}
                onChange={(e) => handleInvestmentChange(monthIndex, e.target.value)}
              />
            </div>
          ))}

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
  );
};

export default HIPCalculator;


