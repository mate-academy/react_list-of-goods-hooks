import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Reverse = 'reverse',
  None = '',
}

function getPreparedGoods(
  goods: string[],
  { sortField }: { sortField: SortType },
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabet:
      return preparedGoods.sort((a, b) => a.localeCompare(b));
    case SortType.Length:
      return preparedGoods.sort((a, b) => a.length - b.length);
    default:
      return preparedGoods;
  }
}

export const App: React.FC = () => {
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState<string[]>(initialGoods);
  const [activeButton, setActiveButton] = useState<SortType>(SortType.None);

  const isChanged =
    goods.length !== goodsFromServer.length ||
    goods.some((good, index) => good !== goodsFromServer[index]);

  const handleSortAlphabetically = () => {
    setGoods(getPreparedGoods([...goods], { sortField: SortType.Alphabet }));
    setActiveButton(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setGoods(getPreparedGoods([...goods], { sortField: SortType.Length }));
    setActiveButton(SortType.Length);
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setActiveButton(SortType.Reverse);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setActiveButton(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === SortType.Reverse ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
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
