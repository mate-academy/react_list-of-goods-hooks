import React, { useState } from 'react';
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
] as const;

enum SortStatus {
  alphabetically = 'alphabetically',
  length = 'length',
  default = '',
}

const getUpdatedList = (
  goods: readonly string[],
  statusOfCurrentList: SortStatus,
  isReversed: boolean,
): string[] => {
  let preparedGoods = [...goods];

  if (statusOfCurrentList) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (statusOfCurrentList) {
        case SortStatus.alphabetically:
          return good1.localeCompare(good2);
        case SortStatus.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [statusOfCurrentList, setStatusOfCurrentList] = useState(
    SortStatus.default,
  );
  const [isReversed, setIsReversed] = useState(false);

  const showReset = statusOfCurrentList !== SortStatus.default || isReversed;
  const visibleGood = getUpdatedList(
    goodsFromServer,
    statusOfCurrentList,
    isReversed,
  );
  const reset = () => {
    setStatusOfCurrentList(SortStatus.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': statusOfCurrentList !== SortStatus.alphabetically,
          })}
          onClick={() => {
            setStatusOfCurrentList(SortStatus.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': statusOfCurrentList !== SortStatus.length,
          })}
          onClick={() => {
            setStatusOfCurrentList(SortStatus.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
