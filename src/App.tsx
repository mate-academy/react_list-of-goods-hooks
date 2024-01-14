import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

type Good = {
  id: number,
  name: string,
};

enum SortType {
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
  Default = '',
}

function getSortedGoods(sortType: SortType, isReversed: boolean) {
  const goodsWithID: Good[] = goodsFromServer
    .map((good, index) => ({ id: index, name: good }));

  switch (sortType) {
    case SortType.ALPHABETICALLY: goodsWithID
      .sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortType.BY_LENGTH: goodsWithID
      .sort((a, b) => a.name.length - b.name.length);
      break;
    case SortType.Default:
    default:
      break;
  }

  if (isReversed) {
    goodsWithID.reverse();
  }

  return goodsWithID;
}

export const App: React.FC = () => {
  const [value, setValue] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const goodsWithID: Good[] = getSortedGoods(value, reversed);

  const handleResetOnClick = () => {
    setValue(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({ 'is-light': value !== SortType.ALPHABETICALLY },
            'button', 'is-info')}
          onClick={() => setValue(SortType.ALPHABETICALLY)}
        >
          {SortType.ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={cn({ 'is-light': value !== SortType.BY_LENGTH },
            'button', 'is-success')}
          onClick={() => setValue(SortType.BY_LENGTH)}
        >
          {SortType.BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !reversed },
            'button', 'is-warning')}
          onClick={() => setReversed(current => !current)}
        >
          Reverse
        </button>

        {(value || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetOnClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsWithID.map(good => (
          <li key={good.id} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
