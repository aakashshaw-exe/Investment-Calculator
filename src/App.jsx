import React, { useState, useEffect } from 'react';
import FixedAssetCalculator from './Components/FixedAssetCalculator';
import LiquidAssetCalculator from './Components/LiquidAssetCalculator';
import SimpleInterestCalculator from './Components/SimpleInterestCalculator';
import HIPCalculator from './Components/HIPCalculator';
import SIPCalculator from './Components/SIPCalculator.jsx';

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAmountRange, setSelectedAmountRange] = useState(null);
  const [selectedPeriodRange, setSelectedPeriodRange] = useState(null);
  const [selectedInterestRate, setSelectedInterestRate] = useState(null);

  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [assetUnderManagement, setAssetUnderManagement] = useState(0);

  const [showInvestmentSummary, setShowInvestmentSummary] = useState(true);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    clearState();
    setShowInvestmentSummary(option !== 'SIPCalculator');
  };


  const clearState = () => {
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

  const handleCalculate = (event) => {
    event.preventDefault();
  
    if (!selectedOption) {
      console.error('Invalid option selected.');
      return;
    }
  
    const principal = parseFloat(selectedAmountRange) || 0;
    const time = parseFloat(selectedPeriodRange) || 0;
  
    if (isNaN(principal) || isNaN(time)) {
      console.error('Invalid principal or time input.');
      return;
    }
  
    let simpleInterest = 0;
  
    if (selectedOption === 'LiquidAsset') {
      const rate = 0.1; // Constant interest rate for LiquidAsset
      simpleInterest = (principal * rate * time) / 100;
    } else if (selectedOption === 'HIPCalculator') {
      // Code for HIPCalculator calculation
    }
  
    setEstimatedReturns(simpleInterest);
    setAssetUnderManagement(principal + simpleInterest);
  
    setShowInvestmentSummary(false);
  };
  
  // Define the missing function
  const handleUpdateSimpleInterest = (values) => {
    // Handle the update of Simple Interest values
    console.log('Simple Interest values updated:', values);
  };

  return (
    <div className="bg-white p-4">
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Investment Calculator</h1>
  
        <div className="flex space-x-4">
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleOptionSelect('SIPCalculator')}
          >
            SIP Calculator
          </button>
        </div>
      </div>
  
      {/* Space for fixed header */}
      <div className="mt-32">
        {/* Your existing component rendering code */}
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
            onCalculate={handleCalculate}
            onUpdateSimpleInterest={handleUpdateSimpleInterest}
          />
        )}
  
        {selectedOption === 'SIPCalculator' && (
          <SIPCalculator />
        )}
  
        {showInvestmentSummary && (
          <SimpleInterestCalculator
            investedAmount={parseFloat(selectedAmountRange)} // Ensure it's a number
            durationMonths={selectedPeriodRange}
            interestRate={selectedInterestRate}
            estimatedReturns={estimatedReturns}
            assetUnderManagement={assetUnderManagement}
          />
        )}
      </div>
    </div>
  );
  
};
export default App;



