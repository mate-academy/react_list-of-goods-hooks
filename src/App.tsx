import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './goodsFromServer';

interface Good {
  id: number;
  name: string;
}

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function getReorderedGoods(
  goods: Good[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => {
        return good1.name.localeCompare(good2.name);
      });
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => (
        good1.name.length - good2.name.length));
      break;

    default: break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [value, setValue] = useState({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const sortByAlphabet = () => {
    setValue({ ...value, sortType: SortType.ALPHABET });
  };

  const sortByLength = () => {
    setValue({ ...value, sortType: SortType.LENGTH });
  };

  const reverse = () => {
    setValue({ ...value, isReversed: !value.isReversed });
  };

  const reset = () => {
    setValue({ sortType: SortType.NONE, isReversed: false });
  };

  const preparedList = getReorderedGoods(
    goodsFromServer,
    value,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => sortByAlphabet()}
          className={classNames(
            'button is-info',
            { 'is-light': value.sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => sortByLength()}
          className={classNames(
            'button is-success',
            { 'is-light': value.sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => reverse()}
          className={classNames(
            'button is-warning',
            { 'is-light': !value.isReversed },
          )}
        >
          Reverse
        </button>

        {(value.sortType !== SortType.NONE || value.isReversed) && (
          <button
            type="button"
            className={classNames('button is-info',
              { 'is-light': value.sortType !== SortType.NONE })}
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedList.map(good => {
            return (
              <li data-cy="Good" key={good.id}>{good.name}</li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
