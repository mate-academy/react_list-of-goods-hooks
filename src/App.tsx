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

enum Sort {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState(Sort.NONE);
  const [isVisible, setIsVisible] = useState(false);

  const sentDataFromButtons = (
    sortBy = Sort.NONE,
    visible = false,
    reversed = false,
  ) => {
    setSortedBy(sortBy);
    setIsVisible(visible);
    setIsReversed(reversed);
  };

  const changeArray = (array: string[]) => {
    const visibleGoods = [...array];

    switch (sortedBy) {
      case Sort.ALPHABET:
        visibleGoods.sort((good1, good2) => {
          return good1.localeCompare(good2);
        });
        break;

      case Sort.LENGTH:
        visibleGoods.sort((good1, good2) => {
          return good1.length - good2.length;
        });
        break;

      case Sort.NONE:
      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const newGoods = changeArray(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== Sort.ALPHABET,
          })}
          onClick={() => sentDataFromButtons(Sort.ALPHABET, true)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== Sort.LENGTH,
          })}
          onClick={() => sentDataFromButtons(Sort.LENGTH, true)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => sentDataFromButtons(sortedBy,
            !(isReversed && sortedBy === Sort.NONE),
            !isReversed)}
        >
          Reverse
        </button>

        {isVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => sentDataFromButtons()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {newGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
