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
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOption = {
  sortType: SortType,
  isReversed: boolean,
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOption,
) {
  const visiableGoods = [...goods];

  visiableGoods.sort((a, b) => {
    switch (sortType) {
      case (SortType.ALPABET):
        return a.localeCompare(b);

      case (SortType.LENGTH):
        return a.length - b.length;

      default: return 0;
    }
  });

  if (isReversed) {
    visiableGoods.reverse();
  }

  return visiableGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const handlerOnClick = (nameOfSort: string) => {
    switch (nameOfSort) {
      case 'Sort alphabetically':
        return setSortType(SortType.ALPABET);

      case 'Sort by length':
        return setSortType(SortType.LENGTH);

      case 'Reverse':
        return setIsReversed(prevState => !prevState);

      case 'Reset':
        return (
          setSortType(SortType.NONE),
          setIsReversed(false)
        );
      default: return 0;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={event => {
            handlerOnClick(event.currentTarget.innerHTML);
          }}
          className={classNames(
            'button',
            'is-info',
            sortType !== SortType.ALPABET && 'is-light',
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={event => {
            handlerOnClick(event.currentTarget.innerHTML);
          }}
          className={classNames(
            'button',
            'is-info',
            sortType !== SortType.LENGTH && 'is-light',
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={event => {
            handlerOnClick(event.currentTarget.innerHTML);
          }}
          className={classNames(
            'button',
            'is-info',
            !isReversed && 'is-light',
          )}
        >
          Reverse
        </button>

        <button
          type="button"
          style={{
            display: (isReversed || sortType !== SortType.NONE)
              ? 'block'
              : 'none',
          }}
          onClick={event => {
            handlerOnClick(event.currentTarget.innerHTML);
          }}
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {getReorderedGoods(
          goodsFromServer,
          { sortType, isReversed },
        ).map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
