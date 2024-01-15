import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetically = 'alphabet',
  ByLength = 'sortByLength',
}

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

const App: React.FC = () => {
  const [sortFormat, setSortFormat] = useState<SortType | ''>('');
  const [doReverse, setDoReverse] = useState<boolean>(false);

  const getPreparedGoods = (
    groceries: string[],
    // eslint-disable-next-line @typescript-eslint/no-shadow
    sortFormat: SortType | '',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    doReverse: boolean,
  ): string[] => {
    const preparedGoods = [...groceries];

    if (sortFormat) {
      preparedGoods.sort((good1, good2) => {
        switch (sortFormat) {
          case SortType.Alphabetically:
            return good1.localeCompare(good2);

          case SortType.ByLength:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    return doReverse ? preparedGoods.reverse() : preparedGoods;
  };

  const visibleGoods = getPreparedGoods(goodsFromServer, sortFormat, doReverse);
  const HAS_ACTIVE_SORTING = sortFormat !== '' || doReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortFormat !== SortType.Alphabetically })}`}
          onClick={() => setSortFormat(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortFormat !== SortType.ByLength })}`}
          onClick={() => setSortFormat(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': doReverse })}`}
          onClick={() => setDoReverse(!doReverse)}
        >
          Reverse
        </button>

        {HAS_ACTIVE_SORTING && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortFormat('');
              setDoReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
