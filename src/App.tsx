/* eslint-disable consistent-return */
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
  ALPHABET,
  LENGTH,
}

enum ButtonType {
  ALPHABET,
  LENGTH,
  REVERSE,
  RESET,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((first, second) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return first.localeCompare(second);
      case SortType.LENGTH:
        return first.length - second.length;
      default:
        return 0;
    }
  });

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const newGoods = getReorderedGoods(goodsFromServer,
    { sortType, isReversed });

  const setResetButton = sortType === SortType.ALPHABET
    || sortType === SortType.LENGTH || isReversed;

  const onButtonClick = (button: ButtonType) => {
    switch (button) {
      case ButtonType.ALPHABET:
        return setSortType(SortType.ALPHABET);
      case ButtonType.LENGTH:
        return setSortType(SortType.LENGTH);

      case ButtonType.REVERSE:
        return setReversed(!isReversed);
      case ButtonType.RESET:

        return (setReversed(false),
        setSortType(SortType.NONE)
        );
      default:
        return 0;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => onButtonClick(ButtonType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => onButtonClick(ButtonType.LENGTH)}
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
          onClick={() => onButtonClick(ButtonType.REVERSE)}
        >
          Reverse
        </button>
        {setResetButton
          && (
            <button
              type="button"
              className={classNames('button', 'is-danger', {
                'is-light': !isReversed,
              })}
              onClick={() => onButtonClick(ButtonType.RESET)}
            >
              Reset
            </button>
          )}
      </div>
      <ul>
        {newGoods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
