import React, { useMemo, useState } from 'react';
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

type SortType = 'alphabetically' | 'length' | null;

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = useMemo(() => {
    let result = [...goodsFromServer];

    if (sortType === 'alphabetically') {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const isButtonActive = (type: SortType | 'reverse') => {
    if (type === 'reverse') return isReversed;
    return sortType === type;
  };

  return (
    <div className="section">
      <div className="buttons">
        <button
          type="button"
          className={`button ${!isButtonActive('alphabetically') ? 'is-light' : ''}`}
          onClick={() => setSortType('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${!isButtonActive('length') ? 'is-light' : ''}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${!isButtonActive('reverse') ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
          <button type="button" className="button" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
