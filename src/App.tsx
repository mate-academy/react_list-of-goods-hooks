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

  function sortGoods(type: SortType) {
    let sortedGoods = [...goods];

    switch (type) {
      case SortType.Alphabetical:
        sortedGoods.sort((one, two) => one.localeCompare(two));
        setIsReversedActive(false);
        break;
      case SortType.ByLength:
        sortedGoods.sort((one, two) => one.length - two.length);
        setIsReversedActive(false);
        break;
      case SortType.None:
        sortedGoods = [...initialGoods];
        setIsReversedActive(false);
        break;
      default:
        break;
    }

    setGoods(sortedGoods);
    setSortType(type);
  }

  function reverseGoods() {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversedActive(!isReversedActive);
  }

  function reset() {
    setGoods([...initialGoods]);
    setSortType(SortType.None);
    setIsReversedActive(false);
  }

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
        {goods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
