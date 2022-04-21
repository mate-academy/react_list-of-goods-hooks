import React, { useState } from 'react';
import './GoodsList.css';

type Props = {
  goods: string[];
};

const Goods: React.FC<Props> = ({ goods }) => {
  const [selectValue, setSelectValue] = useState(1);
  const select = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const visibleList = [...goods].filter(
    good => good.length >= selectValue,
  );

  const [sortBy, setSortBy] = useState('');
  const [reverseList, setReverseList] = useState(false);

  visibleList.sort((g1, g2) => {
    switch (sortBy) {
      case 'alphabet':
        return g1.localeCompare(g2);
      case 'length':
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (reverseList) {
    visibleList.reverse();
  }

  return (
    <>
      <button
        type="button"
        className="button"
        onClick={() => setReverseList(!reverseList)}
      >
        Revers
      </button>

      <button
        type="button"
        className="button"
        onClick={() => setSortBy('alphabet')}
      >
        Sort alphabet
      </button>

      <button
        type="button"
        className="button"
        onClick={() => setSortBy('length')}
      >
        Sort length
      </button>

      <button
        type="button"
        className="button"
        onClick={() => {
          setReverseList(false);
          setSortBy('');
          setSelectValue(1);
        }}
      >
        Reset
      </button>

      <button
        type="button"
        className="button"
      >
        <label>
          {'Select '}
          <select
            value={selectValue}
            onChange={(event) => setSelectValue(+event.target.value)}
          >
            {select.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
      </button>

      <ul className="goods">
        {visibleList.map(good => (
          <li key={good} className="good">
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Goods;
