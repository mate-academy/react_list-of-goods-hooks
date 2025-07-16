import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer: string[] = [
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
  None = '',
  Name = 'name',
  Length = 'length',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>([...goodsFromServer]);
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  let visibleGoodsCopy = [...visibleGoods];

  switch (sortType) {
    case SortType.Name:
      visibleGoodsCopy.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      visibleGoodsCopy.sort((a, b) => a.length - b.length);
      break;
  }

  if (reversed) {
    visibleGoodsCopy = visibleGoodsCopy.toReversed();
  }

  const reset = (): void => {
    setVisibleGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setReversed(false);
  };

  const showResetButton = sortType !== SortType.None || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Name,
          })}
          onClick={() => setSortType(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoodsCopy.map((good) => (
          <li className="good" data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
