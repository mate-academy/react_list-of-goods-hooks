import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
//import classNames from 'classnames';

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
  NONE,
  ALPH,
  LENGTH,
  REVERS,
}

function sorts(buttonName: SortType, [...good] = goodsFromServer): string[] {
  if (buttonName === SortType.REVERS) {
    return good.reverse();
  }

  return good.sort((item1, item2) => {
    switch (buttonName) {
      case SortType.ALPH:
        return item1.localeCompare(item2);

      case SortType.LENGTH:
        return item1.length - item2.length;

      default:
        return 0;
    }
  });
}

export const App: React.FC = () => {
  const [buttonName, buttonSort] = useState<SortType>(SortType.NONE);

  const [...visibleSort] = sorts(buttonName);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${buttonName === SortType.ALPH ? '' : 'is-light'}`}
          onClick={() => buttonSort(SortType.ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${buttonName === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => buttonSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${buttonName === SortType.REVERS ? '' : 'is-light'}`}
          onClick={() => buttonSort(SortType.REVERS)}
        >
          Reverse
        </button>

        {visibleSort.join('') !== goodsFromServer.join('') && (
          <button
            type="button"
            className={`button  is-danger  ${buttonName === SortType.NONE ? 'is-light' : ''}`}
            onClick={() => buttonSort(SortType.NONE)}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleSort.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
