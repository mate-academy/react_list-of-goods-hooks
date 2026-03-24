import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<'alphabet' | 'length' | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  // Завжди сортуємо з оригінального списку
  const sortAlphabetically = () => {
    setGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setSortType('alphabet');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setSortType('length');
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType('');
    setIsReversed(false);
  };

  const isResetVisible =
    sortType !== '' ||
    isReversed ||
    goods.join('') !== goodsFromServer.join('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
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
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button type="button" className="button is-danger" onClick={resetGoods}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
