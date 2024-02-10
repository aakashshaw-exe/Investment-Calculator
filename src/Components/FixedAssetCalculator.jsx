import React, { useState } from 'react';

const FixedAssetCalculator = ({
  onAmountSelect,
  onPeriodRangeSelect,
  onInterestRateSelect,
  onCalculate,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [durationMonths, setDurationMonths] = useState("3 month");
  const [interestRate, setInterestRate] = useState(5);
  const [invalidAmountMessage, setInvalidAmountMessage] = useState('');

  const updateInterestRate = (amount) => {
    if (amount >= 2000 && amount <= 4999) setInterestRate(5);
    else if (amount >= 5000 && amount <= 9999) setInterestRate(5.25);
    else if (amount > 10000) setInterestRate(6);
  };

  const handleAmountChange = (value) => {
    const parsedValue = parseInt(value);
    setInvestmentAmount(parsedValue);

    if (parsedValue >= 2000 || value === '') {
      setInvalidAmountMessage('');
      updateInterestRate(parsedValue);
    } else {
      setInvalidAmountMessage('*Enter amount above 2000');
    }
  };
  
  const handleCalculate = (event) => {
    if (investmentAmount < 2000) {
      console.error('*Enter amount above 2000');
      return;
    }
    event.stopPropagation();
    onAmountSelect(parseInt(investmentAmount));
    onPeriodRangeSelect(durationMonths);
    onInterestRateSelect(interestRate);
    onCalculate(event);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-zinc-950">Fixed Asset Calculator</h2>
      <form className="space-y-4">
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
            <div className="mb-2">
              {invalidAmountMessage && (
                <div className="text-red-500">{invalidAmountMessage}</div>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-4">
            <label htmlFor="rangeInput" className="block text-zinc-950 text-sm font-bold">Select Range:</label>
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

