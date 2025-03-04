import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList';

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
  DEFAULT = '',
  ALPHABETICFIELD = 'alpha',
  LENGTHFIELD = 'length',
}

const getVisibleGoods = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICFIELD:
          return good1.localeCompare(good2);
        case SortType.LENGTHFIELD:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortField !== SortType.ALPHABETICFIELD,
          })}
          onClick={() => setSortField(SortType.ALPHABETICFIELD)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortField !== SortType.LENGTHFIELD,
          })}
          onClick={() => setSortField(SortType.LENGTHFIELD)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.DEFAULT || isReversed) && (
          <button
            type="button"
            className={cn({
              button: true,
              'is-danger': true,
            })}
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
