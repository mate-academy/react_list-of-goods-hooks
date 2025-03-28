import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [, setIsModified] = useState(false);
  const [isActive, setIsActive] = useState<null | string>(null);
  const [sortOrder, setSortOrder] = useState<null | string>(null); // Додано стан для збереження поточного сортування

  const applySorting = (sortedGoods: string[]) => {
    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods); // Застосування реверсування, якщо потрібно
  };

  const sortAlphabetically = () => {
    if (sortOrder === 'alphabetically') {
      return;
    } // Якщо вже відсортовано алфавітно, не сортуємо знову

    const sortedGoods = [...goodsFromServer]
      .slice()
      .sort((a, b) => a.localeCompare(b));

    applySorting(sortedGoods);
    setSortOrder('alphabetically'); // Зберігаємо поточний порядок сортування
    setIsModified(true);
    setIsActive('alphabetically');
  };

  const sortByLength = () => {
    if (sortOrder === 'length') {
      return;
    } // Якщо вже відсортовано по довжині, не сортуємо знову

    const sortedGoods = [...goodsFromServer]
      .slice()
      .sort((a, b) => a.length - b.length);

    applySorting(sortedGoods);
    setSortOrder('length'); // Зберігаємо поточний порядок сортування
    setIsModified(true);
    setIsActive('length');
  };

  const reverseOrder = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);
    setIsModified(true);
  };

  const resetOrder = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setIsModified(false);
    setSortOrder(null); // Скидаємо стан сортування
    setIsActive(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {(sortOrder || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((item: string) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
