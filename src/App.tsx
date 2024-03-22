import React, { MouseEventHandler, useState } from 'react';
import cn from 'classnames';
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
  SORT_BY_ALPHABET = 'alphabetically',
  SORT_BY_LENGTH = 'length',
  DEFAULT = '',
}

function getGoods(goods: string[], sortBy: SortType, isReversed: boolean) {
  let prepareGoods = [...goods];

  if (sortBy) {
    prepareGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [goodsField, setGoodsField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getGoods(goodsFromServer, goodsField, isReversed);

  const handleReversed: MouseEventHandler<HTMLButtonElement> = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': goodsField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setGoodsField(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': goodsField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setGoodsField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReversed}
        >
          Reverse
        </button>

        {goodsField && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setGoodsField(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
