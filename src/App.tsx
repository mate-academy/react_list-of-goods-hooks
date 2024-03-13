import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

interface Rules {
  sortField: SortField | '';
  isReversed: boolean;
}

function sortGoods(array: string[], { sortField, isReversed }: Rules) {
  const result = [...array];

  switch (sortField) {
    case SortField.alphabet:
      result.sort((a, b) => a.localeCompare(b));
      break;

    case SortField.length:
      result.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [objOfRules, setObjOfRules] = useState<Rules>({
    sortField: '',
    isReversed: false,
  });

  let goods = [...goodsFromServer];

  goods = sortGoods(goods, objOfRules);

  function sortedByAlphabetically() {
    setObjOfRules({
      ...objOfRules,
      sortField: SortField.alphabet,
    });
  }

  function sortedByLength() {
    setObjOfRules({
      ...objOfRules,
      sortField: SortField.length,
    });
  }

  function reverseList() {
    if (objOfRules.isReversed) {
      setObjOfRules({ ...objOfRules, isReversed: false });
    } else {
      setObjOfRules({ ...objOfRules, isReversed: true });
    }
  }

  function resetList() {
    setObjOfRules({
      sortField: '',
      isReversed: false,
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': objOfRules.sortField !== SortField.alphabet,
          })}
          onClick={sortedByAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': objOfRules.sortField !== SortField.length,
          })}
          onClick={sortedByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !objOfRules.isReversed,
          })}
          onClick={reverseList}
        >
          Reverse
        </button>
        {(objOfRules.sortField || objOfRules.isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
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
