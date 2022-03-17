import classNames from 'classnames';
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const show = () => {
    setIsVisible(true);
  };

  const sortAlphabet = () => {
    setSortBy('alphabet');
  };

  const sortLength = () => {
    setSortBy('length');
  };

  const reversed = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
  };

  const visibleGoods = () => {
    const showGoods = [...goodsFromServer];

    switch (sortBy) {
      case 'length':
        showGoods.sort((a, b) => a.length - b.length);
        break;

      case 'alphabet':
        showGoods.sort((el1, el2) => el1.localeCompare(el2));
        break;

      default:
        break;
    }

    if (isReversed) {
      showGoods.reverse();
    }

    return showGoods;
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <ul className={
        classNames(
          'List',
          { 'List--visible': !isVisible },
        )
      }
      >
        {visibleGoods().map((good) => <li key={good}>{good}</li>)}
      </ul>
      <div className="List__buttons">
        <button
          type="submit"
          onClick={show}
          className={isVisible ? 'button-hidden' : ''}
        >
          Start
        </button>
        <button
          type="submit"
          onClick={reversed}
        >
          Reverse
        </button>
        <button
          type="submit"
          onClick={sortAlphabet}
        >
          Sort by Alpabet
        </button>
        <button
          type="submit"
          onClick={sortLength}
        >
          Sort by Length
        </button>
        <button
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
