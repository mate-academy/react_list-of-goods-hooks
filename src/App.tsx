import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  sortByAlphabet = 'alphabet',
  sortByLength = 'length',
  default = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const onClickReverse = () => {
    setReverseField(!reverseField);
  };

  const onReset = () => {
    setSortField('');
    setReverseField(false);
  };

  function prepareGoods(sortBy: string) {
    const allGoods = [...goodsFromServer];

    if (sortBy === SortType.sortByAlphabet) {
      return allGoods.sort();
    }

    if (sortBy === SortType.sortByLength) {
      return allGoods.sort(
        (firstGood, nextGood) => firstGood.length - nextGood.length,
      );
    }

    return allGoods;
  }

  const preparedGoods = prepareGoods(sortField);

  if (reverseField) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.sortByAlphabet })}
          onClick={() => setSortField(SortType.sortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.sortByLength })}
          onClick={() => setSortField(SortType.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseField })}
          onClick={onClickReverse}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
