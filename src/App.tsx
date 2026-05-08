import { useState } from 'react';
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
  Default = 'default',
  Alphabet = 'alphabet',
  ByLength = 'byLength',
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);

  const handleSetSort = (type: SortType) => {
    if (type === sortField) {
      setReversed(prev => !prev);
    } else {
      setSortField(type);
    }
  };

  const visibleGoods = [...goodsFromServer];

  switch (sortField) {
    case SortType.Alphabet:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.ByLength:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  const needReset = sortField !== SortType.Default || reversed;

  const handleReset = () => {
    setSortField(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
    <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => handleSetSort(SortType.Alphabet)}
        >
          Sort alphabetically
    </button>
     <button
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => handleSetSort(SortType.ByLength)}
        >
          Sort by length
      </button>
       <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>
          {needReset && (
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
       {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
