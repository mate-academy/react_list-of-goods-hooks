import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  none,
  alphabetically,
  byLength,
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  function getPreparedGoods(goods: string[], field: SortType) {
    const preparedGoods = [...goods];

    switch (field) {
      case SortType.alphabetically:
        preparedGoods.sort();
        break;
      case SortType.byLength:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    return isReversed ? preparedGoods.reverse() : preparedGoods;
  }

  const renderGoods = getPreparedGoods(goodsFromServer, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortType !== SortType.alphabetically,
          })}
          onClick={() => {
            setSortType(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortType !== SortType.byLength,
          })}
          onClick={() => {
            setSortType(SortType.byLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.none || isReversed) && (
          <button
            type="button"
            className={cn({
              button: true,
              'is-danger': true,
              'is-light': true,
            })}
            onClick={() => {
              setSortType(SortType.none);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
