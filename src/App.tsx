import React from 'react';
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
  ALPHABET,
  LENGTH,
  NONE,
}

type ArrangeOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getArrangedGoods(
  goods: string[],
  { sortType, isReversed }: ArrangeOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((item1, item2) => item1.localeCompare(item2));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((item1, item2) => item1.length - item2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = React.useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = React.useState<boolean>(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed ? '' : 'is-light',
          })}
          onClick={() => setIsReversed(state => !state)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getArrangedGoods(goodsFromServer, { sortType, isReversed }).map(
          (item, index) => (
            <li data-cy="Good" key={index}>
              {item}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
