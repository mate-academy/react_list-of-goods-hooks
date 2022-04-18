import React from 'react';

const SelectList: React.FC = () => {
  const select = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {select.map(num => (
        <option key={num} value={num}>{num}</option>
      ))}
    </>
  );
};

export default SelectList;
