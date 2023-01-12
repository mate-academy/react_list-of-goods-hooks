import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { Button } from './button';
import { ListOfGoods } from './list';

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
  ALPHABET,
  LENGTH,
}

// Use this function in the render method to prepare goods
function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  if (sortType) {
    visibleGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);

        case SortType.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = React.memo(() => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);
  const reArrange = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={classNames(
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </Button>

        <Button
          className={classNames(
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </Button>

        <Button
          className={classNames(
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => reverse()}
        >
          Reverse
        </Button>
        {reArrange && (
          <Button
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </Button>
        )}

      </div>
      <ListOfGoods goods={visibleGoods} />
    </div>
  );
});
