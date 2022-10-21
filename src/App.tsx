import { FC, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

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

interface Goods {
  name: string;
  id: string;
}

const goodsWithUniqueID: Goods[] = goodsFromServer.map(goodsName => ({
  name: goodsName,
  id: uuidv4(),
}));

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: Goods[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (!SortType.NONE) {
    visibleGoods.sort(({ name: prevName }, { name: currName }) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return prevName.localeCompare(currName);

        case SortType.LENGTH:
          return prevName.length - currName.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getReorderedGoods(goodsWithUniqueID, {
    sortType,
    isReversed,
  });
  const isResetButtonVisible = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
        <ul>
          {goods.map(({ name, id }) => (
            <li data-cy="Good" key={id}>{name}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
