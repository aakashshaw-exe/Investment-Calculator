import React, { useState, useEffect } from 'react';

const FixedAssetCalculator = ({
  onAmountSelect,
  onPeriodRangeSelect,
  onInterestRateSelect,
  onCalculate,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [durationMonths, setDurationMonths] = useState("1 month");
  const [interestRate, setInterestRate] = useState(5); // Default interest rate for the specified range
  const [exactAmountSelected, setExactAmountSelected] = useState(true);

  const updateInterestRate = (amount) => {
    if (amount >= 2000 && amount <= 5000) {
      setInterestRate(5);
    } else if (amount >= 5001 && amount <= 10000) {
      setInterestRate(5.25);
    } else if (amount > 10000) {
      setInterestRate(6);
    }
  };

  const handleAmountChange = (value) => {
    setInvestmentAmount(value);
    updateInterestRate(value);
  };

  const handleCalculate = (event) => {
    event.stopPropagation();
    const calculatedAmount = exactAmountSelected
      ? parseFloat(investmentAmount)
      : parseFloat(investmentAmount) || 0;

    try {
      // Wrap the split operation in a try-catch block
      const selectedAmountRange = investmentAmount.toString();
      const splitValues = selectedAmountRange.split('-');
      const firstValue = parseFloat(splitValues[0]) || 0;
      onAmountSelect(firstValue);
    } catch (error) {
      console.error("Error splitting selectedAmountRange:", error);
      // Handle the error gracefully, or you can choose to ignore it
      onAmountSelect(0); // Set a default value or handle accordingly
    }

    onPeriodRangeSelect(durationMonths);
    onInterestRateSelect(interestRate);

    // Trigger the parent component's calculate function
    onCalculate(event);
  };

  return (
    <div className="bg-blue-100 p-6 rounded-md shadow-md mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Fixed Asset Calculator</h2>
      <form className="space-y-4">

        {exactAmountSelected ? (
          <div>
            <label htmlFor="investmentAmount" className="block text-gray-700 text-sm font-bold mt-2">
              Enter Exact Amount:
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="investmentAmount"
                name="investmentAmount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={investmentAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
              />
              <input
                type="range"
                min="2000"
                max="100000"
                step="1"
                value={investmentAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="mt-2 flex-1"
              />
            </div>
          </div>
        ) : null}

        <div>
          <label htmlFor="durationRange" className="block text-gray-700 text-sm font-bold mt-2">
            Select Duration Range:
          </label>
          <select
            id="durationRange"
            name="durationRange"
            className="block appearance-none w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDurationMonths(e.target.value)}
            value={durationMonths}
          >
            {/* Adjusted option values for duration dropdown */}
            {Array.from({ length: 24 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={`${month} month`}>{month}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-2">Current Interest Rate:</p>
          <p className="text-blue-500 text-lg">{interestRate}%</p>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={(event)=>handleCalculate (event)}
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default FixedAssetCalculator;


