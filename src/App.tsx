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
  Default = 'DEFAULT',
  Alphabetically = 'ALPHABETICALLY',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState(SortType.Default);

  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setVisibleGoods([...goodsFromServer]);
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  const prepareGoods = (type: SortType) => {
    if (type === SortType.Reverse) {
      setVisibleGoods([...visibleGoods].reverse());

      return;
    }

    if (isReversed) {
      setVisibleGoods(
        [...goodsFromServer]
          .sort((good1: string, good2: string) => {
            switch (type) {
              case SortType.Alphabetically:
                setSortField(type);

                return good1.localeCompare(good2);
              case SortType.Length:
                setSortField(type);

                return +good1.length - good2.length;
              default:
                return 0;
            }
          })
          .reverse(),
      );
    } else {
      setVisibleGoods(
        [...goodsFromServer].sort((good1: string, good2: string) => {
          switch (type) {
            case SortType.Alphabetically:
              setSortField(type);

              return good1.localeCompare(good2);
            case SortType.Length:
              setSortField(type);

              return +good1.length - good2.length;
            default:
              return 0;
          }
        }),
      );
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => prepareGoods(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => prepareGoods(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            prepareGoods(SortType.Reverse);
          }}
        >
          Reverse
        </button>

        {isReversed || sortField !== SortType.Default ? (
          <button
            type="button"
            onClick={reset}
            className={classNames('button is-danger is-light')}
          >
            Reset
          </button>
        ) : (
          false
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
