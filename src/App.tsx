import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { SortType } from './SortType';

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

const getSortedGoods = (
  goods: string[],
  type: SortType,
  reversed: boolean,
): string[] => {
  let sortedGoods = [...goods];

  switch (type) {
    case SortType.Alphabet:
      sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return reversed ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [goods] = useState<string[]>(goodsFromServer);
  const [sortFill, setSortFill] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);
  const sorterGoods = getSortedGoods(goods, sortFill, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFill !== SortType.Alphabet,
          })}
          onClick={() => setSortFill(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFill !== SortType.Length,
          })}
          onClick={() => setSortFill(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortFill !== SortType.Default || reversed) && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortFill === SortType.Default,
            })}
            onClick={() => {
              setSortFill(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sorterGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
