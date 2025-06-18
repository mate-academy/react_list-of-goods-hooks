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
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'byLength',
}

enum ReverseType {
  ON = 'on',
  OFF = 'off',
}

const sortAlphabetically = (a: string, b: string) => a.localeCompare(b);
const sortByLength = (a: string, b: string) => a.length - b.length;

export const App = () => {
  const [sortType, setSortType] = useState<SortType | ''>('');
  const [reverseType, setReverseType] = useState<ReverseType>(ReverseType.OFF);

  const getProcessedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.ALPHABETICALLY) {
      sortedGoods.sort(sortAlphabetically);
    } else if (sortType === SortType.BY_LENGTH) {
      sortedGoods.sort(sortByLength);
    }

    if (reverseType === ReverseType.ON) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const goods = getProcessedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETICALLY,
          })}
          onClick={() => {
            setSortType(SortType.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.BY_LENGTH,
          })}
          onClick={() => {
            setSortType(SortType.BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseType !== ReverseType.ON,
          })}
          onClick={() => {
            setReverseType(
              reverseType === ReverseType.ON ? ReverseType.OFF : ReverseType.ON,
            );
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-hidden': sortType === '' && reverseType === ReverseType.OFF,
            'is-light': sortType !== '' || reverseType !== ReverseType.OFF,
          })}
          onClick={() => {
            // Скидаємо всі стани та список
            setSortType('');
            setReverseType(ReverseType.OFF);
          }}
        >
          Reset
        </button>
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
