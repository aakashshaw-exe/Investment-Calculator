import React, { useState, useEffect } from 'react';

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
  };

  const handleTerminate = () => {
    setIsTerminated(true);
  };

  const handleContinue = (event) => {
    setIsTerminated(false);
  };

  useEffect(() => {
    // Recalculate the Investment Summary
    calculateInvestmentSummary(investments);
  }, [investments]);

  useEffect(() => {
    // Update state and potentially parent component based on active month
    onAmountSelect(investedAmount.toFixed(2));
    onPeriodRangeSelect('12'); // Assuming a fixed period of 12 months
    onInterestRateSelect('5.00'); // Assuming a fixed interest rate of 5%

    // Pass calculated values to SimpleInterestCalculator (if applicable)
    onUpdateSimpleInterest({
      investedAmount,
      estimatedReturns,
      assetUnderManagement,
    });

    // Trigger calculation in parent component
    // onCalculate(investedAmount, estimatedReturns, assetUnderManagement,);
  }, [investedAmount, estimatedReturns, assetUnderManagement]);

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
                className="border rounded px-2 py-1 text-black"
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
            onClick={(event)=>handleContinue(event)}
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
