import React, { useState } from 'react';

const LiquidAssetCalculator = ({
  onAmountSelect,
  onPeriodRangeSelect,
  onInterestRateSelect,
  onCalculate,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [durationValue, setDurationValue] = useState(30); // Default duration value
  const [durationType, setDurationType] = useState('days');
  const [durationMonths, setDurationMonths] = useState(1); // Add durationMonths state
  const interestRate = 0.1; // Constant interest rate per day

  const handleAmountChange = (value) => {
    setInvestmentAmount(value);
  };

  const handleDurationChange = (value) => {
    setDurationValue(value);
  };

  const handleDurationTypeChange = (value) => {
    setDurationType(value);
  };

  const handleCalculate = () => {
    const calculatedAmount = parseFloat(investmentAmount) || 0;

    onAmountSelect(calculatedAmount);

    if (durationType === 'days' && durationValue > 0) {
      onPeriodRangeSelect(`${durationValue} ${durationType}`);
    } else if (durationType === 'months' && durationMonths >= 1 && durationMonths <= 24) {
      const daysInMonth = 30; // Assuming 30 days in a month
      const totalDays = durationMonths * daysInMonth;
      onPeriodRangeSelect(`${totalDays} days`);
    } else {
      // Handle invalid input for months or other scenarios
      console.error('Invalid input for duration. Please enter a valid duration.');
      return;
    }

    onInterestRateSelect(interestRate);

    // Trigger the parent component's calculate function with the calculated values
    onCalculate(calculatedAmount, durationValue, interestRate);
  };

  return (
    <div className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 p-6 rounded-md shadow-md mx-auto max-w-md text-center">
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
          <label htmlFor="durationType" className="block text-zinc-950 text-sm font-bold mt-2">
            Select Duration Type:
          </label>
          <select
            id="durationType"
            name="durationType"
            className="block appearance-none w-1/2 border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mx-auto"
            onChange={(e) => handleDurationTypeChange(e.target.value)}
            value={durationType}
          >
            <option value="days">Days</option>
            <option value="months">Months</option>
          </select>
        </div>

        {durationType === 'days' && (
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
        )}

        {durationType === 'months' && (
          <div>
            <label htmlFor="durationMonths" className="block text-zinc-950 text-sm font-bold mt-2">
              Select Duration Range (Months):
            </label>
            <select
              id="durationMonths"
              name="durationMonths"
              className="appearance-none w-1/2 border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setDurationMonths(e.target.value)}
              value={durationMonths}
            >
              {/* Adjusted option values for duration dropdown */}
              {Array.from({ length: 24 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <p className="text-zinc-950 text-sm font-bold mb-2">Daily Interest Rate:</p>
          <p className="text-zinc-950 text-lg ">{interestRate}%</p>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
          type="button"
          onClick={(e) => handleCalculate(e)}
        >
          Calculate
        </button>
      </form>
    </div>
  );

};

export default LiquidAssetCalculator;




