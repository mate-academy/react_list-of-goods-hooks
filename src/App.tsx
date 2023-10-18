import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';

export const goodsFromServer: string[] = [
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
  Length = 'Sort by length',
  None = '',
}

interface Button {
  name: string,
  color: string,
}

const buttons: Button[] = [
  { name: 'Sort alphabetically', color: 'is-info' },
  { name: 'Sort by length', color: 'is-success' },
  { name: 'Reverse', color: 'is-warning' },
  { name: 'Reset', color: 'is-danger' },
];

function sortGoods(goods: string[], type: SortType, reverse: boolean):string[] {
  const goodsSorted = [...goods];

  if (type) {
    goodsSorted.sort((good1, good2) => (
      (type === 'Sort alphabetically')
        ? good1.localeCompare(good2)
        : good1.length - good2.length));
  }

  if (reverse) {
    goodsSorted.reverse();
  }

  return goodsSorted;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setisReversed] = useState<boolean>(false);
  const goods = sortGoods(goodsFromServer, sortType, isReversed);

  function isLight(name: string) {
    switch (name) {
      case 'Sort alphabetically':
        return sortType !== name;
      case 'Sort by length':
        return sortType !== name;
      case 'Reverse':
        return !isReversed;
      case 'Reset':
        return true;
      default:
        return false;
    }
  }

  function clickEvent(name: string) {
    switch (name) {
      case 'Sort alphabetically':
        return setSortType(SortType.Alphabetically);
      case 'Sort by length':
        return setSortType(SortType.Length);
      case 'Reverse':
        return (isReversed)
          ? setisReversed(false)
          : setisReversed(true);
      case 'Reset':
        return (
          setisReversed(false),
          setSortType(SortType.None)
        );
      default:
        return false;
    }
  }

  function anethingButReset(condition: string) {
    return condition !== 'Reset' || (sortType || isReversed);
  }

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          (anethingButReset(button.name)) && (
            <button
              type="button"
              key={button.name}
              className={cn(
                'button',
                button.color,
                {
                  'is-light': isLight(button.name),
                },
              )}
              onClick={() => {
                clickEvent(button.name);
              }}
            >
              {button.name}
            </button>
          )
        ))}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
