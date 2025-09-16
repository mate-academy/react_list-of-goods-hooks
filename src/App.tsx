import * as React from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './components/SortType';
import { ButtonType } from './components/ButtonType';

export const buttons = [
  { id: 'name', value: 'Sort alphabetically', className: 'is-info' },
  { id: 'length', value: 'Sort by length', className: 'is-success' },
];

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

interface GoodListProps {
  goods: string[];
}

export const GoodList: React.FC<GoodListProps> = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      // eslint-disable-next-line prettier/prettier
      <li key={good} data-cy="Good" className="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const isOrigin = (a, b) => {
  return a === '' && b === false;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortType | ButtonType | ''>(
    SortType.None,
  );
  const [reversed, setReversed] = React.useState<boolean>(false);
  let visibleGoods = [...goodsFromServer];

  const handleReseted = () => {
    setSortField(SortType.None);
    setReversed(false);
  };

  if (sortField) {
    visibleGoods = visibleGoods.slice().sort((a, b) => {
      switch (sortField) {
        case SortType.Length:
          return a.length - b.length;
        case SortType.Name:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(butt => (
          <button
            type="button"
            key={butt.id}
            className={classNames('button', butt.className, {
              'is-light': sortField !== butt.id,
            })}
            onClick={() => setSortField(butt.id as ButtonType)}
          >
            {butt.value}
          </button>
        ))}

        <button
          type="button"
          key="reverse"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {!isOrigin(sortField, reversed) && (
          <button
            type="button"
            key="reset"
            className="button is-danger is-light"
            onClick={handleReseted}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
