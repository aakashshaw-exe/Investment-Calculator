import React, { useState } from 'react';

const RangeSlider = () => {
  const [selectedValue, setSelectedValue] = useState(2000);

  const handleSliderChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
  };

  return (
    <div className="relative w-full mt-4">
      <input
        type="range"
        min={2000}
        max={100000}
        value={selectedValue}
        onChange={handleSliderChange}
        step={10000}
        list="tickmarks"
        className="w-full h-8 appearance-none bg-gray-300 rounded-md"
      />
      <datalist id="tickmarks">
        <option value="2000" label="2000" />
        <option value="10000" label="10000" />
        <option value="30000" label="30000" />
        <option value="50000" label="50000" />
        <option value="100000" label="100000" />
      </datalist>
    </div>
  );
};

export default RangeSlider;











