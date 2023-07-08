import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer = [
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
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [reorderOptions, setReorderOptions] = useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const [goods, setGoods] = useState<string[]>([]);

  useEffect(() => {
    const reorderedGoods = getReorderedGoods(goodsFromServer, reorderOptions);

    setGoods(reorderedGoods);
  }, [reorderOptions]);

  const handleSortAlphabetically = () => {
    if (reorderOptions.sortType === SortType.ALPHABET) {
      return;
    }

    setReorderOptions({
      sortType: SortType.ALPHABET,
      isReversed: false,
    });
  };

  const handleSortByLength = () => {
    if (reorderOptions.sortType === SortType.LENGTH) {
      return;
    }

    setReorderOptions({
      sortType: SortType.LENGTH,
      isReversed: false,
    });
  };

  const handleReverseOrder = () => {
    setReorderOptions((prevOptions) => ({
      ...prevOptions,
      isReversed: !prevOptions.isReversed,
    }));
  };

  const handleResetOrder = () => {
    setReorderOptions({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const shouldDisplayResetButton
    = reorderOptions.sortType !== SortType.NONE || reorderOptions.isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': reorderOptions.sortType !== SortType.ALPHABET,
          })}
          onClick={handleSortAlphabetically}
          disabled={reorderOptions.sortType === SortType.ALPHABET}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': reorderOptions.sortType !== SortType.LENGTH,
          })}
          onClick={handleSortByLength}
          disabled={reorderOptions.sortType === SortType.LENGTH}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reorderOptions.isReversed,
          })}
          onClick={handleReverseOrder}
        >
          Reverse
        </button>

        {shouldDisplayResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
