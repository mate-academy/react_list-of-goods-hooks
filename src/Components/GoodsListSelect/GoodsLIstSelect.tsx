import React from 'react';

type Props = {
  selectSize: number,
  filterLength: number,
  filterBy: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const GoodsListSelect: React.FC<Props> = ({ selectSize, filterBy, filterLength }) => {
  const values = Array(selectSize)
    .fill('')
    .map((_item, i) => {
      const index = i + 1;

      return (
        <option
          key={index}
          value={index}
        >
          {index}
        </option>
      );
    });

  return (
    <select
      name="select"
      value={filterLength}
      onChange={filterBy}
    >
      <option
        key={0}
        value={0}
      >
        Select length
      </option>
      {values}
    </select>
  );
};
