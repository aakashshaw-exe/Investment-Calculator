import React, { useState, useEffect } from 'react';
import FixedAssetCalculator from './Components/FixedAssetCalculator';
import LiquidAssetCalculator from './Components/LiquidAssetCalculator';
import SimpleInterestCalculator from './Components/SimpleInterestCalculator';
import HIPCalculator from './Components/HIPCalculator';

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAmountRange, setSelectedAmountRange] = useState(null);
  const [selectedPeriodRange, setSelectedPeriodRange] = useState(null);
  const [selectedInterestRate, setSelectedInterestRate] = useState(null);

  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [assetUnderManagement, setAssetUnderManagement] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedAmountRange(null);
    setSelectedPeriodRange(null);
    setSelectedInterestRate(null);
    setEstimatedReturns(0);
    setAssetUnderManagement(0);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmountRange(amount);
  };

  const handlePeriodRangeSelect = (range) => {
    setSelectedPeriodRange(range);
  };

  const handleInterestRateSelect = (rate) => {
    setSelectedInterestRate(rate);
  };

  const handleCalculate = () => {
    if (selectedOption === 'FixedAsset') {
      // Code for FixedAsset calculation
    } else if (selectedOption === 'LiquidAsset') {
      const principal = selectedAmountRange && typeof selectedAmountRange === 'string'
        ? parseFloat(selectedAmountRange.split('-')[0]) || 0
        : 0;
  
      const rate = 0.1; // Constant interest rate for LiquidAsset
  
      const time = selectedPeriodRange && typeof selectedPeriodRange === 'string'
        ? parseFloat(selectedPeriodRange.split(' ')[0]) || 0
        : 0;
  
      if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
        const simpleInterest = (principal * rate * time) / 100;
        setEstimatedReturns(simpleInterest);
  
        const assetManagement = principal + simpleInterest;
        setAssetUnderManagement(assetManagement);
      }
    } else if (selectedOption === 'HIPCalculator') {
      // Code for HIPCalculator calculation
      // You can pass any necessary props or callbacks specific to HIPCalculator component
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Investment Calculator</h1>

      <div className="mb-4 flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOptionSelect('FixedAsset')}
        >
          Fixed Asset
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOptionSelect('LiquidAsset')}
        >
          Liquid Asset
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOptionSelect('HIPCalculator')}
        >
          HIP Calculator
        </button>
      </div>

      {selectedOption === 'FixedAsset' && (
        <FixedAssetCalculator
          onAmountSelect={(amount) => handleAmountSelect(amount)}
          onPeriodRangeSelect={(range) => handlePeriodRangeSelect(range)}
          onInterestRateSelect={(rate) => handleInterestRateSelect(rate)}
          onCalculate={() => handleCalculate()}
        />
      )}

      {selectedOption === 'LiquidAsset' && (
        <LiquidAssetCalculator
          onAmountSelect={(amount) => handleAmountSelect(amount)}
          onPeriodRangeSelect={(range) => handlePeriodRangeSelect(range)}
          onInterestRateSelect={(rate) => handleInterestRateSelect(rate)}
          onCalculate={() => handleCalculate()}
        />
      )}

      {selectedOption === 'HIPCalculator' && (
        <HIPCalculator
          onAmountSelect={(amount) => handleAmountSelect(amount)}
          onPeriodRangeSelect={(range) => handlePeriodRangeSelect(range)}
          onInterestRateSelect={(rate) => handleInterestRateSelect(rate)}
          onCalculate={(amount, returns, assetManagement) =>
            handleCalculate(amount, returns, assetManagement)
          }
          onUpdateSimpleInterest={handleUpdateSimpleInterest}
        />
      )}

      <SimpleInterestCalculator
        investedAmount={selectedAmountRange}
        durationMonths={selectedPeriodRange}
        interestRate={selectedInterestRate}
        estimatedReturns={estimatedReturns}
        assetUnderManagement={assetUnderManagement}
      />

      {/* Add more components based on your project structure */}
    </div>
  );
};

export default App;


