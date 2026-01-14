import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
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
  Default = 'Default',
  Alphabet = 'Alphabet',
  Length = 'Length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  let preparedGoods = goods.slice();

  if (sortField) {
    if (sortField === SortType.Alphabet) {
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
    } else if (sortField === SortType.Length) {
      const decoratedGoods = preparedGoods.map((value, index) => ({
        value,
        index,
      }));

      decoratedGoods.sort((a, b) => {
        const lengthDiff = a.value.length - b.value.length;

        if (lengthDiff !== 0) {
          return lengthDiff;
        }

        return a.index - b.index;
      });

      preparedGoods = decoratedGoods.map(item => item.value);
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReverse] = useState<boolean>(false);

  const visibleGoods = useMemo(
    () => getPreparedGoods(goodsFromServer, sortField, isReversed),
    [sortField, isReversed],
  );
  const isInitialOrder =
    visibleGoods.length === goodsFromServer.length &&
    visibleGoods.every((g, i) => g === goodsFromServer[i]);

  function handleReset() {
    setSortField(SortType.Default);
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortField(SortType.Length);
          }}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReverse(prev => !prev);
          }}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
