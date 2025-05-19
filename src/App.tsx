import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodList } from './components/GoodList';

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
  DEFAULT = '',
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

interface FilterParams {
  sortType: SortType;
  isReversed: boolean;
}

function sortGoods(goods: string[], { sortType, isReversed }: FilterParams) {
  let sortedGoods = [...goods];

  if (sortType === SortType.DEFAULT && isReversed) {
    sortedGoods = [...goods].reverse();
  } else if (sortType === SortType.ALPHABETICALLY && !isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortType === SortType.ALPHABETICALLY && isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => good2.localeCompare(good1));
  } else if (sortType === SortType.LENGTH && !isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });
  } else if (sortType === SortType.LENGTH && isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good2.localeCompare(good1);
      }

      return good2.length - good1.length;
    });
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [isReversed, setReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortType, isReversed });

  const alphabeticallyBtnCN = classNames('button', 'is-info', {
    'is-light': sortType !== SortType.ALPHABETICALLY,
  });

  const lengthBtnCN = classNames('button', 'is-success', {
    'is-light': sortType !== SortType.LENGTH,
  });

  const reverseBtnCN = classNames('button', 'is-warning', {
    'is-light': !isReversed,
  });

  const onSortAlphabeticallyClick = () => {
    setSortType(SortType.ALPHABETICALLY);
  };

  const onSortByLengthClick = () => {
    setSortType(SortType.LENGTH);
  };

  const onReverseSortClick = () => {
    setReversed(!isReversed);
  };

  const onResetClick = () => {
    setSortType(SortType.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabeticallyBtnCN}
          onClick={onSortAlphabeticallyClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthBtnCN}
          onClick={onSortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseBtnCN}
          onClick={onReverseSortClick}
        >
          Reverse
        </button>

        {(sortType !== SortType.DEFAULT || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};
