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

enum SortType {
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
  Default = '',
}

function prepareGoods(
  goods: string[],
  { selected, reverse }: { selected: SortType; reverse: boolean },
) {
  const preparedGoods = [...goods];

  if (selected !== SortType.Default) {
    preparedGoods.sort((good1, good2) => {
      switch (selected) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [selected, setSelected] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods: string[] = prepareGoods(goodsFromServer, {
    selected,
    reverse,
  });

  const handleReverseClick = () => {
    setReverse(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSelected(SortType.Alphabet)}
          className={cn('button', 'is-info', {
            'is-light': selected !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSelected(SortType.Length)}
          className={cn('button', 'is-success', {
            'is-light': selected !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(selected || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSelected(SortType.Default);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
