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

export const rev = 'reverse';
export const alphabet = 'alphabet';
export const alphabetRev = 'alphabet reverse';
export const length = 'length';
export const lengthRev = 'length reverse';

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const searchClass = (allClass: string) => {
    if (allClass.includes(rev)) {
      return true;
    }

    return false;
  };

  const classButton = (buttonName: string, classButtonActive: string) => {
    if (sortField.includes(buttonName)) {
      return classButtonActive;
    }

    return `${classButtonActive} is-light`;
  };

  const sortAlphabet = () => {
    setVisibleGoods(prevGoods => (
      searchClass(sortField)
        ? [...prevGoods].sort((a, b) => b.localeCompare(a))
        : [...prevGoods].sort((a, b) => a.localeCompare(b))
    ));
    setSortField(searchClass(sortField) ? alphabetRev : alphabet);
  };

  const sortLength = () => {
    setVisibleGoods(prevGoods => (
      searchClass(sortField)
        ? [...prevGoods].sort((a, b) => b.length - a.length)
        : [...prevGoods].sort((a, b) => a.length - b.length)
    ));
    setSortField(searchClass(sortField) ? lengthRev : length);
  };

  const reverse = () => {
    setVisibleGoods(prevGoods => ([...prevGoods].reverse()));
    setSortField(prevSortField => (
      searchClass(prevSortField)
        ? prevSortField.split(' ')[0]
        : `${prevSortField} ${rev}`
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
          className={classButton(alphabet, 'button is-info')}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classButton(length, 'button is-success')}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classButton(rev, 'button is-warning')}
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
