import React, { useState } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const goods = [...goodsFromServer]

  const [isVisible, setVisio] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [isSortByAlphabet, sortAlphabetically] = useState(false);
  const [isSortByLength, sortByLength] = useState(false);
  const [isReset, setResetedGoods] = useState(false);
  const [goodsLength, setGoodsLength] = useState('1');
  const visibleGoods = goods.filter(good => good.length >= Number(goodsLength));

  if (isSortByLength) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isSortByAlphabet) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

  if (isReversed) {
    visibleGoods.reverse();
  }

  if (isReset) {
    setReversed(false);
    sortAlphabetically(false);
    sortByLength(false);
    setResetedGoods(false);
    setGoodsLength('1');
  }

return (
  <div className="App message">
    {!isVisible && <div>
      <p
        className='title message-header'>
          Control of goods starts from pushing this
      </p>
      <button
        type="button"
        className='button is-large is-fullwidth'
        onClick={() =>setVisio(true)}
      >
        Start
    </button>
    </div>
    }

{isVisible && <div>
    <button
      type="button"
      className='button is-dark'
      onClick={() => {
        sortAlphabetically(true);
        sortByLength(false);
        setReversed(false);
      }}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className='button is-dark'
      onClick={() => {
        sortByLength(true);
        sortAlphabetically(false);
        setReversed(false);
      }}
    >
      Sort by length
    </button>

    <button
      type="button"
      className='button is-dark'
      onClick={() => setReversed(!isReversed)}
    >
      Reverse
    </button>

    <button
      type="button"
      className='button is-dark'
      onClick={() => setResetedGoods(true)}
    >
      Reset
    </button>

    <ul className="Goods ">
      {visibleGoods.map(good =>(
        <li
          className="Goods__item"
          key={good}>{good}
        </li>
      ))}
    </ul>

    <div>
      <p className='message-body'>You can choose items to start length from value:</p>
      <select name="select" value={goodsLength} onChange={({ target }) => setGoodsLength(target.value)}>
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
    </div>

    </div>}
  </div>
  );
};
