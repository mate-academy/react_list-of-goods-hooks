import React from 'react';

type Props = {
  selectSize: number,
  filterBy: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const GoodsListSelect: React.FC<Props> = ({ selectSize, filterBy }) => {
  const values = Array(selectSize)
    .fill('')
    .map((_item, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <option key={i} value={i}>
        {i}
      </option>
    ));

  return (
    <select
      name="select"
      onChange={filterBy}
    >
      {values}
    </select>
  );
};
