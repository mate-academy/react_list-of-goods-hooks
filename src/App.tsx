import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  enum SortType {
    Alphabetically = 'sortAlphabet',
    Lengthly = 'sortLength',
    None = '',
  }

  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  function action(
    initialValue: string[],
    howToSotr: SortType,
    reverse: boolean,
  ): string[] {
    const sortedGoods = [...initialValue];

    switch (howToSotr) {
      case SortType.Alphabetically:
        sortedGoods.sort((el1, el2) => el1.localeCompare(el2));
        break;
      case SortType.Lengthly:
        sortedGoods.sort((el1, el2) => el1.length - el2.length);
        break;
      default:
        break;
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const toRender = action(goodsFromServer, sortField, isReversed);

  const alphabetClass = classNames({
    button: true,
    'is-info': true,
    'is-light': !(sortField === SortType.Alphabetically),
  });

  const lengthClass = classNames({
    button: true,
    'is-success': true,
    'is-light': !(sortField === SortType.Lengthly),
  });

  const reverseClass = classNames({
    button: true,
    'is-warning': true,
    'is-light': !isReversed,
  });

  const resetClass = classNames({
    button: true,
    'is-danger': true,
    'is-light': true,
    hiden: !(sortField !== SortType.None || isReversed === true),
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={alphabetClass}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Lengthly)}
          type="button"
          className={lengthClass}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={reverseClass}
        >
          Reverse
        </button>

        <button
          onClick={() => {
            setSortField(SortType.None);
            setIsReversed(false);
          }}
          type="button"
          className={resetClass}
        >
          Reset
        </button>
      </div>

      <ul>
        {toRender.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
