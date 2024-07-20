import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

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

export const App: React.FC = () => {
  const [goodsList, setGoodsList] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<string>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const handleSort = (type: string): void => {
    let sortedGoods = [...goodsList];

    switch (type) {
      case 'by name':
        sortedGoods.sort();
        break;
      case 'by length':
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      case 'reverse':
        sortedGoods.reverse();
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    setSortType(type);
    setGoodsList(sortedGoods);
  };

  const resetSort = (): void => {
    setSortType('');
    setReversed(false);
    setGoodsList([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== 'by name',
          })}
          onClick={() => handleSort('by name')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== 'by length',
          })}
          onClick={() => handleSort('by length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
            handleSort('reverse');
          }}
        >
          Reverse
        </button>

        {sortType !== '' || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
