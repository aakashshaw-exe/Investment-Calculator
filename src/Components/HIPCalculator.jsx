// import React, { useState, useEffect } from 'react';

// const HIPCalculator = () => {
//   const [investments, setInvestments] = useState(Array(12).fill(''));
//   const [isTerminated, setIsTerminated] = useState(false);

//   const [investedAmount, setInvestedAmount] = useState(0);
//   const [estimatedReturns, setEstimatedReturns] = useState(0);
//   const [assetUnderManagement, setAssetUnderManagement] = useState(0);

//   const handleInvestmentChange = (monthIndex, amount) => {
//     const updatedInvestments = [...investments];
//     updatedInvestments[monthIndex] = amount;
//     setInvestments(updatedInvestments);
//   };

//   const handleTerminate = () => {
//     setIsTerminated(true);
//     calculateInvestmentSummary(investments);
//   };

//   const handleContinue = () => {
//     setIsTerminated(false);
//     calculateInvestmentSummary(investments);
//   };

//   const calculateInvestmentSummary = (updatedInvestments) => {
//     const monthlyInterestRate = 0.05; // Monthly interest rate (5%)
//     const totalMonths = 12; // Total duration in months

//     let totalInvestedAmount = 0;
//     let totalEstimatedReturns = 0;
//     let totalAssetUnderManagement = 0;

//     for (let month = 0; month < totalMonths; month++) {
//       const principal = parseFloat(updatedInvestments[month]) || 0;

//       // Skip months with no investment
//       if (principal === 0) continue;

//       // Calculate interest for each month
//       const monthlyInterest = principal * monthlyInterestRate;

//       // Accumulate the interest over the remaining months
//       for (let remainingMonths = totalMonths - month; remainingMonths > 0; remainingMonths--) {
//         totalEstimatedReturns += monthlyInterest;
//       }

//       totalInvestedAmount += principal;
//     }

//     // Calculate totalAssetUnderManagement using the correct formula
//     totalAssetUnderManagement = totalInvestedAmount + totalEstimatedReturns;

//     // Update component state
//     setInvestedAmount(totalInvestedAmount);
//     setEstimatedReturns(totalEstimatedReturns);
//     setAssetUnderManagement(totalAssetUnderManagement);
//   };


//   return (
//     <div>
//     <div className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 p-4 rounded-md shadow-md mx-auto max-w-md text-center text-white">
//       <h1 className="text-xl lg:text-2xl font-bold mb-2">HIP Calculator</h1>

//       {isTerminated ? (
//         <p className="text-red-600 font-bold">Plan Terminated</p>
//       ) : (
//         <div className="mb-2">
//           <p className="mb-2">Enter the investment amount for each month:</p>
//           <div className="grid grid-cols-2 gap-2">
//             {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((monthName, monthIndex) => (
//               <React.Fragment key={monthIndex}>
//                 <div className="flex items-center mb-2">
//                   <label className="mr-2">{`${monthName}:`}</label>
//                 </div>
//                 <div className="flex items-center mb-2">
//                   <input
//                     className="border rounded px-2 py-1 text-black text-center w-full"
//                     type="number"
//                     value={investments[monthIndex]}
//                     onChange={(e) => {
//                       const inputValue = e.target.value;
//                       if (/^\d*\.?\d+$/.test(inputValue) || inputValue === '') {
//                         handleInvestmentChange(monthIndex, inputValue);
//                       }
//                     }}
//                   />
//                 </div>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center space-x-2">
//         <button
//           className="bg-cardin-green hover:bg-red-700 text-black font-bold py-1 px-2"
//           onClick={handleTerminate}
//         >
//           Terminate Plan
//         </button>
//         <button
//           className="bg-cardin-green hover:bg-green-700 text-black font-bold py-1 px-2"
//           onClick={handleContinue}
//         >
//           Continue
//         </button>
//       </div>

//       <hr className="my-4 border-white" />
//       </div>

//        {/* Space between main layout and investment summary */}
//        <div className="my-8" />

//       <div className="bg-gray-200 p-6 rounded-md shadow-md">
//         <h2 className="text-xl font-bold mb-4">Investment Summary</h2>
//         <div className="mb-4">
//           <p className="block text-gray-700 text-sm font-bold mb-2">Invested Amount:</p>
//           <p className="text-blue-500 text-lg">₹{investedAmount.toFixed(2)}</p>
//         </div>

//         <div className="mb-4">
//           <p className="block text-gray-700 text-sm font-bold mb-2">Estimated Returns:</p>
//           <p className="text-blue-500 text-lg">₹{estimatedReturns.toFixed(2)}</p>
//         </div>

//         <div className="mb-4">
//           <p className="block text-gray-700 text-sm font-bold mb-2">Net Amount</p>
//           <p className="text-blue-500 text-lg">₹{assetUnderManagement.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HIPCalculator;

import React from 'react';
import lock from '../Components/lock-image.png';

const HIPCalculator = () => {
  return (
    <div className="relative bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 p-4 mb-8 rounded-mdshadow-md mx-auto max-w-md text-white">
      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur border border-white border-opacity-10 rounded-md shadow-md"></div>

      {/* Centered lock image */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <img src={lock} alt="Lock" className="w-64 h-64 mb-4" />
        <p className="text-lg text-center text-lime-200 font-bold glow-text transition-all duration-300 ease-in-out hover:text-zinc-950">
          Exciting News!
          <br />
          We'll be unlocking this feature soon. Until then, feel free to explore our other features.
        </p>
      </div>

      <div className="mt-4">
        <p className="mb-4">Enter the investment amount for each month:</p>
        {[...Array(6).keys()].map((monthIndex) => (
          <div key={monthIndex} className="mb-4 flex items-center">
            <label className="mr-2">{`Month ${monthIndex + 1}: ₹`}</label>
            <input
              className="border rounded px-2 py-1 text-black"
              type="number"
              value=""
              onChange={() => {}}
            />
          </div>
        ))}

        <div className="flex flex-col md:flex-row">
          <button className="mb-2 md:mb-0 text-black font-bold py-2 px-4 mr-2">
            Terminate Plan
          </button>
          <button className="text-black font-bold py-2 px-4">
            Continue
          </button>
        </div>
      </div>

      <hr className="my-4 border-white" />
    </div>
  );
};

export default HIPCalculator;