import React from 'react';
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

enum SortType {
  length = 'length',
  alphabet = 'alphabet',
}

function getPreparedGoods(
  goods: string[],
  sortList: string,
  isReversed: boolean,
):string[] {
  const preparedGoods:string[] = [...goods];

  if (sortList) {
    preparedGoods.sort((good1, good2) => {
      switch (sortList) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortList, setSortList] = React.useState('');
  const [isReversed, setIsReversed] = React.useState(false);

  const reset = () => {
    setSortList('');
    setIsReversed(false);
  };

  const makeSetSortList = (field: SortType) => () => setSortList(field);

  const sortGoods = getPreparedGoods(goodsFromServer, sortList, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortList !== SortType.alphabet })}`}
          onClick={makeSetSortList(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortList !== SortType.length })}`}
          onClick={makeSetSortList(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
          onClick={() => setIsReversed(prevState => !prevState)}
        >
          Reverse
        </button>

        {(sortList || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
