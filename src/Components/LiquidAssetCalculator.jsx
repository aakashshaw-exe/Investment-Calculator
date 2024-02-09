import React, { useState } from 'react';

const LiquidAssetCalculator = ({
  onAmountSelect,
  onPeriodRangeSelect,
  onInterestRateSelect,
  onCalculate,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [durationValue, setDurationValue] = useState(30); // Default duration value
  const interestRate = 0.1; // Constant interest rate per day

  const handleAmountChange = (value) => {
    setInvestmentAmount(value);
  };

  const handleDurationChange = (value) => {
    setDurationValue(value);
  };

  const handleCalculate = () => {
    const calculatedAmount = parseFloat(investmentAmount) || 0;

    onAmountSelect(calculatedAmount);

    if (durationValue > 0) {
      onPeriodRangeSelect(`${durationValue} days`);
    } else {
      // Handle invalid input for duration or other scenarios
      console.error('Invalid input for duration. Please enter a valid duration.');
      return;
    }

    onInterestRateSelect(interestRate);

    // Trigger the parent component's calculate function with the calculated values
    onCalculate(calculatedAmount, durationValue, interestRate);
  };

  return (
    <div className="bg-white  p-6 rounded-3xl shadow-md mx-auto max-w-md  text-center">
      <h2 className="text-2xl font-bold mb-4 text-zinc-950">Liquid Asset Calculator</h2>
      <form className="space-y-4">
        <div className="mx-auto">
          <label htmlFor="investmentAmount" className="block text-sm font-bold mt-2 text-zinc-950">
            Enter Exact Amount:
          </label>
          <div className=" items-center space-x-2">
            <input
              id="investmentAmount"
              name="investmentAmount"
              className=" shadow appearance-none border rounded w-1/2 py-2 px-3 text-zinc-950 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              value={investmentAmount}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*\.?\d+$/.test(inputValue) && inputValue <= 100000) {
                  handleAmountChange(inputValue);
                } else if (inputValue === '') {
                  handleAmountChange('');
                }
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="durationValue" className="block text-zinc-950 text-sm font-bold mt-2">
            Enter Number of Days:
          </label>
          <input
            id="durationValue"
            name="durationValue"
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-zinc-950 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={durationValue}
            onChange={(e) => {
              const inputDays = e.target.value;
              if (/^\d*\.?\d+$/.test(inputDays) && inputDays <= 731) {
                handleDurationChange(inputDays);
              } else if (inputDays === '') {
                handleDurationChange('');
              }
            }}
          />
        </div>

        <div className="mb-4">
          <p className="text-zinc-950 text-sm font-bold mb-2">Daily Interest Rate:</p>
          <p className="text-zinc-950 text-lg ">{interestRate}%</p>
        </div>

        <button
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
          type="button"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default LiquidAssetCalculator;
