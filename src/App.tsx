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

interface TrackStatus {
  reversed: boolean;
  sortType: SortType;
}

const defaultState: TrackStatus = {
  reversed: false,
  sortType: SortType.Default,
};

export const App: React.FC = () => {
  const [trackStatus, setTrackStatus] = useState<TrackStatus>(defaultState);

  const { reversed, sortType } = trackStatus;

  const getGoods = () => {
    const goods = [...goodsFromServer];

    if (sortType === SortType.Alphabetical) {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.Length) {
      goods.sort((a, b) => a.length - b.length);
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
      reversed: reversed,
    });
  };

  const handleSortByLength = () => {
    setTrackStatus({
      ...trackStatus,
      sortType: SortType.Length,
      reversed: reversed,
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
