import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  sortAlphabet = 'Sort alphabetically',
  sortLength = 'Sort by length',
  sortReverse = 'Reverse',
  reset = 'Reset',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [fieldName, setFieldName] = useState('');

  function sortOfGoods(field: SortType) {
    let copyArr: string[] = [...goodsFromServer];

    switch (field) {
      case SortType.sortAlphabet:
        copyArr.sort((a: string, b: string): number => a.localeCompare(b));
        break;
      case SortType.sortLength:
        copyArr.sort((a: string, b: string) => a.length - b.length);
        break;
      case SortType.sortReverse:
        copyArr.reverse();
        break;
      case SortType.reset:
        copyArr = [...goodsFromServer];
    }

    setGoods(copyArr);
  }

  return (
    <div className="section content">
      <div className="buttons">
        {Object.values(SortType).map(field => (
          <button
            type="button"
            key={field}
            className={classNames('button', 'is-info', {
              'is-light': fieldName !== field,
              'no-light': fieldName === field,
            })}
            onClick={() => {
              sortOfGoods(field as SortType);
              setFieldName(field);
            }}
          >
            {field}
          </button>
        ))}
      </div>

      <ul>
        {goods.map(items => (
          <li key={items} data-cy="Good">
            {items}
          </li>
        ))}
      </ul>
    </div>
  );
};
