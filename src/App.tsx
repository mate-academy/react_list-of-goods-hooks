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
];

enum SortType {
  SortFieldName = 'Name',
  SortFieldLength = 'Length',
}

function getPrepearedGoods(goods: string[],
  sortType: string, isReversed: boolean) {
  const prepearedGoods = [...goods];

  if (sortType !== '') {
    prepearedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.SortFieldName: {
          return good1.localeCompare(good2);
        }

        case SortType.SortFieldLength: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  return isReversed ? prepearedGoods.reverse() : prepearedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const vissibleGoods = getPrepearedGoods(goodsFromServer,
    sortType, isReversed);

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const isStateNotReversedOrSorted
    = isReversed || sortType;

  const reset = () => {
    setIsReversed(false);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.SortFieldName)}
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.SortFieldName },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.SortFieldLength)}
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.SortFieldLength },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isStateNotReversedOrSorted && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {vissibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
