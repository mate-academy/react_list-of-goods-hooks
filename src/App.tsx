import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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

interface Good {
  name: string;
  id: number;
}

interface Button {
  id: number;
  text: string;
  classNames: string;
  isActive: boolean;
  onClick: () => void;
}

enum SortType {
  Name = 'name',
  Length = 'length',
  None = 'no-sorting',
}

const goodsObject: Good[] = goodsFromServer
  .map((good, index) => ({ name: good, id: index }));

function getSortedGoods(
  goods: Good[],
  sortType: SortType,
  toReverse: boolean,
): Good[] {
  const sortedGoods = [...goods];

  if (sortType === SortType.Name) {
    sortedGoods.sort((good1, good2) => good1.name.localeCompare(good2.name));
  }

  if (sortType === SortType.Length) {
    sortedGoods.sort((good1, good2) => good1.name.length - good2.name.length);
  }

  return toReverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsObject, sortType, isReversed);
  const isResetVisible = sortType !== SortType.None || isReversed;

  const handleReverseButton = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const buttons: Button[] = [
    {
      id: 1,
      text: 'Sort alphabetically',
      classNames: 'button is-info',
      isActive: sortType === SortType.Name,
      onClick: () => setSortType(SortType.Name),
    },
    {
      id: 2,
      text: 'Sort by length',
      classNames: 'button is-success',
      isActive: sortType === SortType.Length,
      onClick: () => setSortType(SortType.Length),
    },
    {
      id: 3,
      text: 'Reverse',
      classNames: 'button is-warning',
      isActive: isReversed,
      onClick: handleReverseButton,
    },
  ];

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            key={button.id}
            type="button"
            className={cn(button.classNames, {
              'is-light': !button.isActive,
            })}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(({ name, id }) => {
          return (
            <li data-cy="Good" key={id}>{name}</li>
          );
        })}
      </ul>
    </div>
  );
};
