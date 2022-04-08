import React, { useState } from 'react';
import { GoodsList } from './GoodsList';
import './App.css';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const MainContent: React.FC = () => {
  const [visualGoods, setGoods] = useState(goodsFromServer);
  const [isReversed, setReverse] = useState(false);
  const [typeOfSort, setTypeOfSort] = useState('');
  const [lengthMin, setLengthMin] = useState(1);

  return (
    <>
      <h1>Goods</h1>
      <button type="button" onClick={() => setTypeOfSort('alpha')}>Sort by alphabet</button>
      <button type="button" onClick={() => setTypeOfSort('length')}>Sort by length</button>
      <button type="button" onClick={() => setReverse(!isReversed)}>Reverse</button>
      <button
        type="button"
        onClick={() => {
          setGoods(goodsFromServer);
          setReverse(false);
          setTypeOfSort('');
          setLengthMin(1);
        }}
      >
        Reset
      </button>
      <select value={lengthMin} onChange={(event) => setLengthMin(+event.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <GoodsList
        goods={visualGoods}
        isReversed={isReversed}
        typeOfSort={typeOfSort}
        lengthMin={lengthMin}
      />
    </>
  );
};

export default MainContent;
