import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './Components/Button';

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
  NONE,
  ALPABET,
  LENGTH,
}
type State = {
  isReversed: boolean,
  sortType: SortType,
};

export function getSortedGoods(
  goods: string[],
  state: State,
) {
  const { sortType, isReversed } = state;
  const visibleGoods = [...goods].sort((goodA, goodB) => {
    switch (sortType) {
      case SortType.ALPABET:
        return goodA.localeCompare(goodB);

      case SortType.LENGTH:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const resetOrder = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const visibleGoods = getSortedGoods(goodsFromServer,
    { sortType, isReversed });

  const shouldRenderReset = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </Button>

        <Button
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </Button>

        <Button
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </Button>

        {shouldRenderReset && (
          <Button
            className="button is-danger is-light"
            onClick={resetOrder}
          >
            Reset
          </Button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={uuidv4()}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
