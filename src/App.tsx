import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './App.scss';

type Good = string;

export const goodsFromServer: Good[] = [
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
  SORT_FIELD_ASC = 'Sort alphabetically',
  SORT_FIELD_LENGTH = 'Sort by length',
  REVERSE = 'Reverse',
  RESET = 'Reset',
}

export const App: React.FC = () => {
  const [goodsList, setGoodList] = useState([...goodsFromServer]);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const resetList = () => {
    setGoodList([...goodsFromServer]);
    setSortField('');
    setIsReversed(false);
  };

  const sortList = (sortRule: string) => {
    if (sortRule === SortType.REVERSE) {
      setGoodList([...goodsList].reverse());
      setIsReversed(!isReversed);
    } else {
      setGoodList(
        [...goodsList].sort((good1, good2) => {
          switch (sortRule) {
            case SortType.SORT_FIELD_ASC:
              return isReversed
                ? good2.localeCompare(good1)
                : good1.localeCompare(good2);

            case SortType.SORT_FIELD_LENGTH:
              return isReversed
                ? good2.length - good1.length
                : good1.length - good2.length;

            default:
              return 0;
          }
        }),
      );
      setSortField(sortRule);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ASC,
          })}
          onClick={() => sortList(SortType.SORT_FIELD_ASC)}
        >
          {SortType.SORT_FIELD_ASC}
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
          onClick={() => sortList(SortType.SORT_FIELD_LENGTH)}
        >
          {SortType.SORT_FIELD_LENGTH}
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => sortList(SortType.REVERSE)}
        >
          {SortType.REVERSE}
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => resetList()}
          >
            {SortType.RESET}
          </button>
        )}
      </div>
      <ul>
        {goodsList.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
