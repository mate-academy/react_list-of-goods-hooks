import { useState } from 'react';

import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';

enum SortType {
  Default = '',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
  Reverse = 'reverse',
  Reset = 'reset',
}

type ButtonInfo = {
  type: SortType;
  text: string;
  colorClass: string;
};

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

const BUTTONS: ButtonInfo[] = [
  {
    type: SortType.Alphabetically,
    text: 'Sort alphabetically',
    colorClass: 'is-info',
  },
  {
    type: SortType.ByLength,
    text: 'Sort by length',
    colorClass: 'is-success',
  },
  {
    type: SortType.Reverse,
    text: 'Reverse',
    colorClass: 'is-warning',
  },
  {
    type: SortType.Reset,
    text: 'Reset',
    colorClass: 'is-danger',
  },
];

export const App = () => {
  const [currentSortType, setCurrentSortType] = useState<SortType>(
    SortType.Default,
  );
  const [isReversed, setIsReversed] = useState(false);

  const handleButtonClick = (type: SortType) => {
    switch (type) {
      case SortType.Alphabetically:
      case SortType.ByLength:
        setCurrentSortType(type);
        break;

      case SortType.Reverse:
        setIsReversed(prev => !prev);
        break;

      case SortType.Reset:
        setCurrentSortType(SortType.Default);
        setIsReversed(false);
        break;
    }
  };

  const getProcessedGoods = () => {
    let processedGoods = goodsFromServer;

    switch (currentSortType) {
      case SortType.Alphabetically:
        processedGoods = processedGoods.toSorted((a, b) => {
          return a.localeCompare(b);
        });
        break;

      case SortType.ByLength:
        processedGoods = processedGoods.toSorted((a, b) => {
          return a.length - b.length;
        });
        break;

      default:
        break;
    }

    return isReversed ? processedGoods.toReversed() : processedGoods;
  };

  const getButtonClasses = (buttonType: SortType, colorClass: string) => ({
    button: true,
    [colorClass]: true,
    'is-light':
      buttonType !== currentSortType &&
      !(buttonType === SortType.Reverse && isReversed),
  });

  const currentGoods = getProcessedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        {BUTTONS.map(({ type, text, colorClass }) => {
          const shouldRender =
            type !== SortType.Reset ||
            currentSortType !== SortType.Default ||
            isReversed;

          if (!shouldRender) {
            return null;
          }

          return (
            <button
              type="button"
              key={type}
              className={cn(getButtonClasses(type, colorClass))}
              onClick={() => handleButtonClick(type)}
            >
              {text}
            </button>
          );
        })}
      </div>

      <ul>
        {currentGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
