// Import necessary components and React
import React, { useState, useEffect } from 'react';
import FixedAssetCalculator from './Components/FixedAssetCalculator';
import LiquidAssetCalculator from './Components/LiquidAssetCalculator';
import SimpleInterestCalculator from './Components/SimpleInterestCalculator';
import HIPCalculator from './Components/HIPCalculator';
import SIPCalculator from './Components/SIPCalculator.jsx';

// Define the App component
const App = () => {
  // State to manage selected options and calculated values
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAmountRange, setSelectedAmountRange] = useState(null);
  const [selectedPeriodRange, setSelectedPeriodRange] = useState(null);
  const [selectedInterestRate, setSelectedInterestRate] = useState(null);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [assetUnderManagement, setAssetUnderManagement] = useState(0);

  // State to control the display of Investment Summary
  const [showInvestmentSummary, setShowInvestmentSummary] = useState(true);

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    clearState();
    setShowInvestmentSummary(option !== 'SIPCalculator');
  };

  // Function to clear state
  const clearState = () => {
    setSelectedAmountRange(null);
    setSelectedPeriodRange(null);
    setSelectedInterestRate(null);
    setEstimatedReturns(0);
    setAssetUnderManagement(0);
  };

  // Functions to handle user input
  const handleAmountSelect = (amount) => {
    setSelectedAmountRange(amount);
  };

  const handlePeriodRangeSelect = (range) => {
    setSelectedPeriodRange(range);
  };

  const handleInterestRateSelect = (rate) => {
    setSelectedInterestRate(rate);
  };

  // Function to handle calculation
  const handleCalculate = (event) => {
    event.preventDefault();

    if (!selectedOption) {
      console.error('Invalid option selected.');
      return;
    }
    console.log('Calculating with selectedOption:', selectedOption);

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
    console.log('Calculation completed. Estimated Returns:', simpleInterest);
  };

  // Function to handle the update of Simple Interest values
  const handleUpdateSimpleInterest = (values) => {
    // Handle the update of Simple Interest values
    console.log('Simple Interest values updated:', values);
  };

  // JSX for rendering the component
  return (
    <div className="bg-white p-4">
  <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-white p-4">
    <h1 className="text-3xl font-bold mb-4">Investment Calculator</h1>

    <div className="flex flex-col-4 space-x-4 ">
      {/* Text options for selecting different functionalities */}
      <span
        className={`text-lg hover:text-zinc-950 cursor-pointer ${selectedOption === 'FixedAsset' ? 'underline' : ''}`}
        onClick={() => handleOptionSelect('FixedAsset')}
      >
        Fixed Asset
      </span>
      <span
        className={`text-lg hover:text-zinc-950  cursor-pointer ${selectedOption === 'LiquidAsset' ? 'underline' : ''}`}
        onClick={() => handleOptionSelect('LiquidAsset')}
      >
        Liquid Asset
      </span>
      <span
        className={`text-lg hover:text-zinc-950 cursor-pointer ${selectedOption === 'HIPCalculator' ? 'underline' : ''}`}
        onClick={() => handleOptionSelect('HIPCalculator')}
      >
        HIP Calculator
      </span>
      <span
        className={`text-lg hover:text-zinc-950 cursor-pointer ${selectedOption === 'SIPCalculator' ? 'underline' : ''}`}
        onClick={() => handleOptionSelect('SIPCalculator')}
      >
        SIP Calculator
      </span>
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
            onCalculate={(e) => handleCalculate(e)}
          />
        )}
  
        {selectedOption === 'LiquidAsset' && (
          <LiquidAssetCalculator
            onAmountSelect={(amount) => handleAmountSelect(amount)}
            onPeriodRangeSelect={(range) => handlePeriodRangeSelect(range)}
            onInterestRateSelect={(rate) => handleInterestRateSelect(rate)}
            onCalculate={(e) => handleCalculate(e)}
          />
        )}
  
        {selectedOption === 'HIPCalculator' && (
          <HIPCalculator
            onAmountSelect={(amount) => handleAmountSelect(amount)}
            onPeriodRangeSelect={(range) => handlePeriodRangeSelect(range)}
            onInterestRateSelect={(rate) => handleInterestRateSelect(rate)}
            onCalculate={(e)=>handleCalculate(e)}
            onUpdateSimpleInterest={handleUpdateSimpleInterest}
          />
        )}
  
        {selectedOption === 'SIPCalculator' && (
          <SIPCalculator />
        )}
  
        {showInvestmentSummary && selectedOption !== 'HIPCalculator' &&(
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



