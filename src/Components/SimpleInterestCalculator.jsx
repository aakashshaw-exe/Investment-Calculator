import React, { useState, useEffect } from 'react';

const SimpleInterestCalculator = ({ investedAmount, durationMonths, interestRate }) => {
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [assetUnderManagement, setAssetUnderManagement] = useState(0);

  useEffect(() => {
    // Convert durationMonths and interestRate to numbers
    const duration = parseFloat(durationMonths);
    const rate = parseFloat(interestRate);

    // Check if duration and interestRate are valid numbers
    if (!isNaN(duration) && !isNaN(rate) && !isNaN(investedAmount)) {
      // Calculate simple interest
      const interest = (investedAmount * rate * duration) / 100;

      // Calculate estimated returns and asset under management
      setEstimatedReturns(interest);
      setAssetUnderManagement(investedAmount + interest);
    } else {
      console.log('Invalid values:', { durationMonths, interestRate, investedAmount });
    }
  }, [investedAmount, durationMonths, interestRate]);

  return (
    <div className="bg-gray-200 p-6 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Investment Summary</h2>
      <div className="mb-4">
        <p className="block text-gray-700 text-sm font-bold mb-2">Invested Amount:</p>
        <p className="text-blue-500 text-lg">
          {typeof investedAmount === 'number'
            ? `₹${investedAmount.toFixed(2)}`
            : 'Invalid value'}
        </p>
      </div>

      <div className="mb-4">
        <p className="block text-gray-700 text-sm font-bold mb-2">Estimated Returns:</p>
        <p className="text-blue-500 text-lg">
          {typeof estimatedReturns === 'number'
            ? `₹${estimatedReturns.toFixed(2)}`
            : 'Invalid value'}
        </p>
      </div>

      <div className="mb-4">
        <p className="block text-gray-700 text-sm font-bold mb-2">Asset Under Management:</p>
        <p className="text-blue-500 text-lg">
          {typeof assetUnderManagement === 'number'
            ? `₹${assetUnderManagement.toFixed(2)}`
            : 'Invalid value'}
        </p>
      </div>
    </div>
  );
};

export default SimpleInterestCalculator;
