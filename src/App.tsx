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
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
  Default = '',
}

export const App: React.FC = () => {
  const [sortButton, setSortButton] = useState<SortType>(SortType.Default);
  const [reverseClicked, setReverseClicked] = useState<boolean>(false);

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortButton) {
      sorted.sort((good1, good2) => {
        switch (sortButton) {
          case SortType.Alphabetically:
            return good1.localeCompare(good2);

          case SortType.ByLength:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (reverseClicked) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleButtonClick = (buttonName: SortType | 'Reverse') => {
    if (buttonName === 'Reverse') {
      setReverseClicked(!reverseClicked);
    } else {
      setSortButton(buttonName);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[
          ['Sort alphabetically', 'is-info'],
          ['Sort by length', 'is-success'],
          ['Reverse', 'is-warning'],
        ].map(button => {
          return (
            <button
              key={button[0]}
              type="button"
              onClick={() => handleButtonClick(button[0] as SortType)}
              className={classNames('button', button[1], {
                'is-light':
                  (button[0] !== sortButton && button[0] !== 'Reverse') ||
                  (button[0] === 'Reverse' && !reverseClicked),
              })}
            >
              {button[0]}
            </button>
          );
        })}

        {getSortedGoods().some(
          (value, index) => value !== goodsFromServer[index],
        ) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortButton(SortType.Default);
              setReverseClicked(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedGoods().map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
