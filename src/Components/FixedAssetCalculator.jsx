import React, { useState, useEffect } from 'react';

const FixedAssetCalculator = ({
  onAmountSelect,
  onPeriodRangeSelect,
  onInterestRateSelect,
  onCalculate,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [durationMonths, setDurationMonths] = useState("3 month");
  const [interestRate, setInterestRate] = useState(5); // Default interest rate for the specified range
  const [exactAmountSelected, setExactAmountSelected] = useState(true);
  const [invalidAmountMessage, setInvalidAmountMessage] = useState('');

  const updateInterestRate = (amount) => {
    if (amount >= 2000 && amount <= 4999) {
      setInterestRate(5);
    } else if (amount >= 5000 && amount <= 9999 ) {
      setInterestRate(5.25);
    } else if (amount > 10000) {
      setInterestRate(6);
    }
  };

  const handleAmountChange = (value) => {
    const parsedValue = parseFloat(value);
    setInvestmentAmount(parsedValue);

    if (parsedValue >= 2000) {
      setInvalidAmountMessage('');
      updateInterestRate(parsedValue);
    } else {
      setInvalidAmountMessage('*Enter amount above 2000');
    }
  };

  const handleCalculate = (event) => {
    if (investmentAmount >= 2000) {
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
  }
  };

  return (
    <div className="bg-white  p-6 rounded-3xl shadow-md mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-zinc-950">Fixed Asset Calculator</h2>
      <form className="space-y-4">

        {exactAmountSelected ? (
          <div>
            <label htmlFor="investmentAmount" className="block text-zinc-950 text-sm font-bold mt-2">
              Enter Exact Amount:
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="investmentAmount"
                name="investmentAmount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-950 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={investmentAmount}
                
                onChange={(e) => {
                  const inputValue =e.target.value;
                if(/^\d*\.?\d+$/.test(inputValue)  && inputValue <= 1000000 || inputValue=== ''){
                  handleAmountChange(inputValue);
                }
              }}
              />
              {invalidAmountMessage && (
              <span className="text-red-500">{invalidAmountMessage}</span>
            )}
            </div>

            <div className="mt-2 flex items-center space-x-4">
              <label htmlFor="rangeInput" className="block text-zinc-950 text-sm font-bold">
                Select Range:
              </label>
              <input
                id="rangeInput"
                type="range"
                min="2000"
                max="100000"
                step="9000"
                value={investmentAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="flex-1"
                list="investmentAmountList"
              />
              
              <span className="text-sm font-semibold">{investmentAmount}</span>
            </div>
          </div>
        ) : null}

        <div>
          <label htmlFor="durationRange" className="block text-zinc-950 text-sm font-bold mt-2">
            Select Duration Range (Months):
          </label>
          <select
            id="durationRange"
            name="durationRange"
            className="block appearance-none w-1/2 border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDurationMonths(e.target.value)}
            value={durationMonths}
          >
            {/* Adjusted option values for duration dropdown */}
            {Array.from({ length: 22 }, (_, i) => i + 3).map((month) => (
              <option key={month} value={`${month} month`}>{month}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <p className="text-zinc-950 text-sm font-bold mb-2">Current Interest Rate:</p>
          <p className="text-zinc-950 text-lg">{interestRate}%</p>
        </div>

        <button
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={(event) => handleCalculate(event)}
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default FixedAssetCalculator;


