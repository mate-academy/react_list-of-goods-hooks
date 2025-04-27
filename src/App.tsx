import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
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

export const App = () => {
  const [good, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<'none' | 'alphabet' | 'length'>('none');



  const sortAlphabet = () => {
    if (sortType !== 'alphabet') {
      const sorting = [...goodsFromServer].sort();
      setGoods(sorting);
      setSortType('alphabet');
    } else {
      setGoods(goodsFromServer);
      setSortType('none');
    }
  };

  const sortByLength = () => {
    if (sortType !== 'length') {
      const byLength = [...goodsFromServer].sort((a, b) => a.length - b.length);
      setGoods(byLength);
      setSortType('length');
    } else {
      setGoods(goodsFromServer);
      setSortType('none');
    }
  };

  const setReverse = () => {
    const reversing = [...goodsFromServer].reverse();
    setGoods(reversing);
    setIsReversed(!isReversed);
  };

  const setReset = () => {
    setGoods(goodsFromServer);
    setSortType('none');
    setIsReversed(false);
  };

  const goodList = good.map((good: string, index: number) => {
    return (
      <li key={index} data-cy="Good">
        {good}
      </li>
    );
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={setReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${sortType === 'none' && !isReversed ? '' : 'is-light'}`}
          onClick={setReset}
        >
          Reset
        </button>
      </div>

      <ul>{goodList}</ul>
    </div>
  );
};
