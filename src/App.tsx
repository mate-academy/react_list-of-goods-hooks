import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Props = {
  initialGoods: string[];
};

enum SortType {
  Alphabetical = 'Alphabetical',
  ByLength = 'ByLength',
  None = 'None',
}

export const App: React.FC<Props> = ({ initialGoods }) => {
  const [goods, setGoods] = useState([...initialGoods]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversedActive, setIsReversedActive] = useState<boolean>(false);

  function getPreparedGoods(
    sortedGoods: string[],
    currentSortType: SortType,
    reversed: boolean,
  ): string[] {
    const updatedGoods = [...sortedGoods];

    switch (currentSortType) {
      case SortType.Alphabetical:
        updatedGoods.sort((one, two) => one.localeCompare(two));
        break;
      case SortType.ByLength:
        updatedGoods.sort((one, two) => one.length - two.length);
        break;
      default:
        break;
    }

    if (reversed) {
      updatedGoods.reverse();
    }

    return updatedGoods;
  }

  function sortGoods(type: SortType) {
    const sorted = getPreparedGoods(goods, type, false);

    setGoods(sorted);
    setSortType(type);
    setIsReversedActive(false);
  }

  function reverseGoods() {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversedActive(!isReversedActive);
  }

  function reset() {
    setGoods([...initialGoods]);
    setSortType(SortType.None);
    setIsReversedActive(false);
  }

  const preparedGoods = getPreparedGoods(goods, sortType, isReversedActive);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={() => sortGoods(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => sortGoods(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedActive,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversedActive) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
