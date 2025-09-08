import React, { useMemo, useCallback, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  None = 'none',
  name = 'name',
  length = 'length',
}

interface FilterParams {
  sortField: SortType;
  reverseField: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverseField }: FilterParams,
) {
  let preparedGoods = [...goods];

  switch (sortField) {
    case SortType.name:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    case SortType.None:
    default:
      // sem ordenação
      break;
  }

  if (reverseField) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reverseField, setReverseField] = useState(false);

  const goodsPrepared = useMemo(
    () => getPreparedGoods(goodsFromServer, { sortField, reverseField }),
    [sortField, reverseField],
  );

  const handleStart = useCallback(() => {
    setIsStarted(true);
  }, []);

  const handleSortByName = useCallback(() => {
    setSortField(SortType.name);
  }, []);

  const handleSortByLength = useCallback(() => {
    setSortField(SortType.length);
  }, []);

  const handleToggleReverse = useCallback(() => {
    setReverseField(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setSortField(SortType.None);
    setReverseField(false);
  }, []);

  return (
    <div className="section content">
      {!isStarted ? (
        <button
          type="button"
          className="button is-primary is-medium"
          data-cy="Start"
          onClick={handleStart}
        >
          Start
        </button>
      ) : (
        <>
          <div className="buttons">
            <button
              type="button"
              className={classNames('button is-info', {
                'is-light': sortField !== SortType.name,
              })}
              data-cy="SortByName"
              onClick={handleSortByName}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={classNames('button is-success', {
                'is-light': sortField !== SortType.length,
              })}
              data-cy="SortByLength"
              onClick={handleSortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className={classNames('button is-warning', {
                'is-light': !reverseField,
              })}
              data-cy="Reverse"
              onClick={handleToggleReverse}
            >
              Reverse
            </button>

            {(reverseField || sortField !== SortType.None) && (
              <button
                type="button"
                className="button is-danger is-light"
                data-cy="Reset"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>

          <ul>
            {goodsPrepared.map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
