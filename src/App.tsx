import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer: Good[] = [
  { name: 'Dumplings' },
  { name: 'Carrot' },
  { name: 'Eggs' },
  { name: 'Ice cream' },
  { name: 'Apple' },
  { name: 'Bread' },
  { name: 'Fish' },
  { name: 'Honey' },
  { name: 'Jam' },
  { name: 'Garlic' },
];

interface Good {
  name: string
}

export const App = () => {
  const defaultValue: Good[] = [...goodsFromServer];
  const [goods, setGoods] = useState<Good[]>(defaultValue);
  const [sort, setSort] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  function sortGoods(sortValue: string) {
    switch (sortValue) {
      case 'alphabetically':
        if (isReversed) {
          setGoods([...goods]
            .sort((goodA, goodB) => goodB.name.localeCompare(goodA.name)));
        } else {
          setGoods([...goods]
            .sort((goodA, goodB) => goodA.name.localeCompare(goodB.name)));
        }

        break;
      case 'length':
        if (isReversed) {
          setGoods([...goods]
            .sort((goodA, goodB) => goodB.name.length - goodA.name.length));
        } else {
          setGoods([...goods]
            .sort((goodA, goodB) => goodA.name.length - goodB.name.length));
        }

        break;
      default:
        setGoods(defaultValue);
    }

    setSort(sortValue);
  }

  const handleReverse = function reverse() {
    setGoods([...goods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== 'alphabetically',
          })}
          onClick={() => sortGoods('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== 'length',
          })}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            handleReverse();
          }}
        >
          Reverse
        </button>

        {(sort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortGoods('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good.name}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
