import React from 'react';
import lock from '../../public/lock-image.png';

const SIPCalculator = () => {
  return (
    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-md shadow-md mx-auto max-w-md text-white">
  {/* Glassmorphism Effect */}
  <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur border border-white border-opacity-10 rounded-md shadow-md"></div>

  {/* Message above the image */}
  

  {/* Centered lock image */}
  <div className="absolute inset-0 flex items-center justify-center flex-col">
    <img src={lock} alt="Lock" className="w-64 h-64 mb-4" />
    <p className="text-lg text-center text-rose-950 font-bold glow-text transition-all duration-300 ease-in-out hover:text-zinc-950">
    Exciting News!
    <br />
    We'll be unlocking this feature soon. Until then, feel free to explore our other features.
  </p>
  </div>

  <div>
    <p className="mb-4">Enter the investment amount for each month:</p>
    {[...Array(7).keys()].map((monthIndex) => (
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

    <button className="bg-cardin-green hover:bg-red-700 text-black font-bold py-2 px-4 mr-2">
      Terminate Plan
    </button>
    <button className="bg-cardin-green hover:bg-green-700 text-black font-bold py-2 px-4">
      Continue
    </button>
  </div>

  <hr className="my-4 border-white" />
</div>

  );
};

export default SIPCalculator;
