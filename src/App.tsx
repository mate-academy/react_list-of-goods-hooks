import React from 'react';
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
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = React.useState(goodsFromServer);
  const [sortField, setSortField] = React.useState('');
  const [isReversed, setIsReversed] = React.useState(false);

  const toggleReverse = () => {
    setIsReversed(prev => {
      const newValue = !prev;

      let sorted;

      if (sortField === SortType.Alphabet) {
        sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      } else if (sortField === SortType.Length) {
        sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);
      } else {
        sorted = [...goodsFromServer];
      }

      setGoods(newValue ? [...sorted].reverse() : sorted);

      return newValue;
    });
  };

  const applySort = (sortedArray: string[]) => {
    return isReversed ? [...sortedArray].reverse() : sortedArray;
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  const sortByAlphabet = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(applySort(sorted));
    setSortField(SortType.Alphabet);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(applySort(sorted));
    setSortField(SortType.Length);
  };

  const isModified =
    sortField !== '' || isReversed || goods.join() !== goodsFromServer.join();


  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={`button is-info ${sortField === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
          type="button"
        >
          Sort alphabetically
        </button>
      </div>

      <div className="buttons">
        <button
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
          type="button"
        >
          Sort by length
        </button>
      </div>

      <div className="buttons">
        <button
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
          type="button"
        >
          Reverse {isReversed ? '(ON)' : ''}
        </button>
      </div>

      <div className="buttons">
        {isModified && (
          <div className="buttons">
            <button className="button is-danger" onClick={reset} type="button">
              Reset
            </button>
          </div>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good" className="item">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
