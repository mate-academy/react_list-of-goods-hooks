import React from 'react';
import './SelectElement.scss';

type ValuesArray = {
  values: number[],
};

const SelectElement: React.FC<ValuesArray> = ({ values }) => (
  <>
    {values.map(currentValue => (
      <option
        className="GoodNameLength"
        key={currentValue}
        value={currentValue}
      >
        Max length is
        {` ${currentValue}`}
      </option>
    ))}
  </>
);

export default SelectElement;
