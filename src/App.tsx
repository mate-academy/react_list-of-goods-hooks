import { useState } from 'react';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            'button is-info' +
            (sortType !== SortType.ALPHABET ? ' is-light' : '')
          }
          onClick={() => {
            setGoods(
              [...goodsFromServer].sort((a, b) => {
                return a.localeCompare(b);
              }),
            );
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            'button is-success' +
            (sortType !== SortType.LENGTH ? ' is-light' : '')
          }
          onClick={() => {
            setGoods(
              [...goodsFromServer].sort((a, b) => {
                return a.length - b.length;
              }),
            );
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={'button is-warning' + (isReversed ? '' : ' is-light')}
          onClick={() => {
            setGoods([...goods].reverse());
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods([...goodsFromServer]);
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => {
          return (
            <li data-cy="Good" key={index}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
