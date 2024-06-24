import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

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
  Default = 'default',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

interface FilterProps {
  reversed: boolean;
  sortType: SortType;
}

const defaultState: FilterProps = {
  reversed: false,
  sortType: SortType.Default,
};

export const App: React.FC = () => {
  const [trackStatus, setTrackStatus] = useState<FilterProps>(defaultState);

  const { reversed, sortType } = trackStatus;

  const getGoods = () => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetical:
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        goods.sort((a, b) => a.length - b.length);
        break;
    }

    if (reversed) {
      goods.reverse();
    }

    return goods;
  };

  const handleSortAlphabetically = () => {
    setTrackStatus({
      ...trackStatus,
      sortType: SortType.Alphabetical,
    });
  };

  const handleSortByLength = () => {
    setTrackStatus({
      ...trackStatus,
      sortType: SortType.Length,
    });
  };

  const handleReverse = () => {
    setTrackStatus({
      ...trackStatus,
      reversed: !reversed,
    });
  };

  const handleReset = () => {
    setTrackStatus(defaultState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortType !== SortType.Alphabetical })}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortType !== SortType.Length })}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reversed })}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(reversed || sortType !== SortType.Default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getGoods().map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
