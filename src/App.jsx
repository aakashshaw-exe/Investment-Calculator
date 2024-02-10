// Import necessary components and React
import React, { useState } from 'react';
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
  const [showInvestmentSummary, setShowInvestmentSummary] = useState(true); // Define showInvestmentSummary state

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    clearState();
    setShowInvestmentSummary(option !== 'SIPCalculator');
    if (option === 'FixedAsset' || option === 'LiquidAsset') {
      resetInvestmentSummary();
    }
  };

  // Function to clear state and reset investment summary
  const clearState = () => {
    setSelectedAmountRange(null);
    setSelectedPeriodRange(null);
    setSelectedInterestRate(null);
    setEstimatedReturns(0);
    setAssetUnderManagement(0);
  };

  const resetInvestmentSummary = () => {
    setEstimatedReturns(null);
    setAssetUnderManagement(null);
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
    resetInvestmentSummary();

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
      resetInvestmentSummary();
      const rate = 0.1; // Constant interest rate for LiquidAsset
      simpleInterest = (principal * rate * time) / 100;
    } else if (selectedOption === 'HIPCalculator') {
      // Code for HIPCalculator calculation
    }

    setEstimatedReturns(simpleInterest);
    setAssetUnderManagement(principal + simpleInterest);
    setShowInvestmentSummary(true);
    console.log('Calculation completed. Estimated Returns:', simpleInterest);
  };

  // JSX for rendering the component
  return (
<div className="bg-indigo-200 p-4">
  <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center bg-indigo-300 text-white p-4">
    <h1 className="text-3xl font-bold mb-4">Investment Calculator</h1>

    <div className="flex flex-wrap justify-center ">
  {/* Buttons for selecting different functionalities */}
  <button
    type="button"
    className={`py-2 px-4 me-2 mb-2 text-lg font-medium focus:outline-none bg-indigo-200 text-white rounded-full border border-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-200`}
    onClick={() => handleOptionSelect('FixedAsset')}
  >
    Fixed
  </button>
  <button
    type="button"
    className={`py-2 px-4 me-2 mb-2 text-lg font-medium focus:outline-none bg-indigo-200 text-white rounded-full border border-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-200`}
    onClick={() => handleOptionSelect('LiquidAsset')}
  >
    Liquid
  </button>
  
  <button
    type="button"
    className={`py-2 px-4 me-2 mb-2 text-lg font-medium focus:outline-none bg-indigo-200 text-white rounded-full border border-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-200`}
    onClick={() => handleOptionSelect('SIPCalculator')}
  >
    SIP
  </button>
  <button
    type="button"
    className={`py-2 px-4 me-2 mb-2 text-lg font-medium focus:outline-none bg-indigo-200 text-white rounded-full border border-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-200`}
    onClick={() => handleOptionSelect('HIPCalculator')}
  >
    HIP
  </button>
</div>

  </div>
      {/* Space for fixed header */}
      <div className="mt-36">
        {/* Your existing component rendering code */}
        {selectedOption === 'FixedAsset' && (
          <FixedAssetCalculator
            onAmountSelect={handleAmountSelect}
            onPeriodRangeSelect={handlePeriodRangeSelect}
            onInterestRateSelect={handleInterestRateSelect}
            onCalculate={handleCalculate}
          />
        )}

        {selectedOption === 'LiquidAsset' && (
          <LiquidAssetCalculator
            onAmountSelect={handleAmountSelect}
            onPeriodRangeSelect={handlePeriodRangeSelect}
            onInterestRateSelect={handleInterestRateSelect}
            onCalculate={handleCalculate}
          />
        )}

        {selectedOption === 'HIPCalculator' && (
          <HIPCalculator
            onAmountSelect={handleAmountSelect}
            onPeriodRangeSelect={handlePeriodRangeSelect}
            onInterestRateSelect={handleInterestRateSelect}
            onCalculate={handleCalculate}
          />
        )}

        {selectedOption === 'SIPCalculator' && (
          <SIPCalculator
            
          />
        )}

        {showInvestmentSummary && selectedOption !== 'HIPCalculator' && (
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
