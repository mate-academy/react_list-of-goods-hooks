import React, { useState } from 'react';
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

export function getReorderedGoods(
  goods: string[], sortType: SortType, isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => {
      if (a > b) {
        return 1;
      }

      if (a < b) {
        return -1;
      }

      return 0;
    });
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

const handleClassName = (target: Element) => {
  const element = target as HTMLButtonElement;
  const buttons = document.querySelector('.buttons');

  if (buttons) {
    Array.from(buttons?.children).forEach(button => {
      button.classList.add('is-light');
    });
  }

  element.classList.remove('is-light');
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={(e) => {
            handleClassName(e.currentTarget);
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={(e) => {
            handleClassName(e.currentTarget);
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={(e) => {
            handleClassName(e.currentTarget);
            setIsReversed(true);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={(e) => {
              handleClassName(e.currentTarget);
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, sortType, isReversed)
            .map((good) => {
              return (
                <li data-cy="Good" key={Date.now() + Math.random()}>{good}</li>
              );
            })}
        </ul>
      </ul>
    </div>
  );
};
