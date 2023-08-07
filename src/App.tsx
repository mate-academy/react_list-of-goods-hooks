import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';

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

export enum Classes {
  rev = 'reverse',
  alphabet = 'alphabet',
  alphabetRev = 'alphabet reverse',
  length = 'length',
  lengthRev = 'length reverse',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const searchReverse = (allClass: string) => {
    if (allClass.includes(Classes.rev)) {
      return true;
    }

    return false;
  };

  const searchClassButton = (buttonName: string, classButtonActive: string) => {
    if (sortField.includes(buttonName)) {
      return classButtonActive;
    }

    return `${classButtonActive} is-light`;
  };

  const sortAlphabet = () => {
    setVisibleGoods(prevGoods => (
      searchReverse(sortField)
        ? [...prevGoods].sort((a, b) => b.localeCompare(a))
        : [...prevGoods].sort((a, b) => a.localeCompare(b))
    ));
    setSortField(searchReverse(sortField)
      ? Classes.alphabetRev
      : Classes.alphabet);
  };

  const sortLength = () => {
    setVisibleGoods(prevGoods => (
      searchReverse(sortField)
        ? [...prevGoods].sort((a, b) => b.length - a.length)
        : [...prevGoods].sort((a, b) => a.length - b.length)
    ));
    setSortField(searchReverse(sortField) ? Classes.lengthRev : Classes.length);
  };

  const reverse = () => {
    setVisibleGoods(prevGoods => ([...prevGoods].reverse()));
    setSortField(prevSortField => (
      searchReverse(prevSortField)
        ? prevSortField.split(' ')[0]
        : `${prevSortField} ${Classes.rev}`
    ));
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={searchClassButton(Classes.alphabet, 'button is-info')}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={searchClassButton(Classes.length, 'button is-success')}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={searchClassButton(Classes.rev, 'button is-warning')}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortField.length > 0 && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
