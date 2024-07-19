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

function generateRandomNumericId(length = 10): string {
  const digits = '0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);

    randomId += digits[randomIndex];
  }

  return randomId;
}

export const App: React.FC = () => {
  const [goodsList, setGoodsList] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<string>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const sortAlphabetically = (): void => {
    setSortType('by name');
    setGoodsList([...goodsList].sort());
  };

  const sortByLength = (): void => {
    setSortType('by length');
    setGoodsList(
      [...goodsList].sort(
        (good1: string, good2: string) => good1.length - good2.length,
      ),
    );
  };

  const sortByReverse = (): void => {
    setReversed(!reversed);
    setGoodsList([...goodsList].reverse());
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
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== 'by length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={sortByReverse}
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
          <li data-cy="Good" key={generateRandomNumericId()}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
