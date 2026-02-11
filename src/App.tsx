import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';
import cn from 'classnames';

const enum Sort {
  none = 'none',
  alphabetical = 'alphabetical',
  length = 'length',
}

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

const getPreparedGoods = (
  goods: string[],
  sortField: Sort,
  reverseField: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortField === Sort.alphabetical) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === Sort.length) {
    preparedGoods.sort((a, b) => {
      return a.length - b.length || a.localeCompare(b);
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Sort>(Sort.none);
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = useMemo(() => {
    return getPreparedGoods(goodsFromServer, sortField, reverseField);
  }, [sortField, reverseField]);

  const handleReset = () => {
    setSortField(Sort.none);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== Sort.alphabetical,
          })}
          onClick={() => setSortField(Sort.alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== Sort.length,
          })}
          onClick={() => setSortField(Sort.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !reverseField,
          })}
          onClick={() => {
            setReverseField(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortField !== Sort.none || reverseField) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
