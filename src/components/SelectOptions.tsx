import React from 'react';

export const SelectOptions: React.FC = () => {
  const selectOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {selectOptions.map(selectOption => (
        <option
          key={`${selectOption}`}
          value={selectOption}
        >
          {selectOption}
        </option>
      ))}
    </>
  );
};
