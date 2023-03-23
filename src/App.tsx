import React, { useState } from 'react';
import classNames from 'classnames';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [goodsArray] = useState(goodsFromServer);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverse = () => {
    setReversed(() => {
      return !isReversed;
    });
  };

  const sortBy = (type: SortType) => {
    setSortType(() => {
      return type;
    });
  };

  const reset = () => {
    setReversed(() => {
      return false;
    });
    setSortType(() => {
      return SortType.NONE;
    });
  };

  const getReorderedGoods = (goods: string[]) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((prevGood, nextGood) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return prevGood.localeCompare(nextGood);
        case SortType.LENGTH:
          return prevGood.length - nextGood.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const isListChanged = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={() => {
            sortBy(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={() => {
            sortBy(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => reverse()}
        >
          Reverse
        </button>

        {isListChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsArray).map((index) => (
            <li data-cy="Good" key={index}>{index}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
