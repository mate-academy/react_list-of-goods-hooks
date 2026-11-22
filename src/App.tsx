import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reverse = 'reverse',
  None = '',
}

export const App = () => {
  const [value, setValue] = useState<string[]>(goodsFromServer);
  const [act, actValue] = useState<SortType>(SortType.None);
  const [reve, revValue] = useState(false);

  function sortGoods(
    good: string[],
    setvalue: SortType,
    rev = false,
  ): string[] {
    const val = [...good];

    if (setvalue === SortType.Alphabetically) {
      val.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (setvalue === SortType.Length) {
      val.sort((good1, good2) => good1.length - good2.length);
    }

    if (setvalue === SortType.Reverse) {
      val.reverse();
    }

    if (rev) {
      if (setvalue === SortType.Alphabetically) {
        val.sort((good1, good2) => good2.localeCompare(good1));
      }

      if (setvalue === SortType.Length) {
        val.sort((good1, good2) => good2.length - good1.length);
      }
    }

    return val;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            act === SortType.Alphabetically
              ? 'button is-info '
              : 'button is-info is-light'
          }
          onClick={() => {
            setValue(sortGoods(value, SortType.Alphabetically, reve));
            actValue(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            act === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setValue(sortGoods(value, SortType.Length, reve));
            actValue(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reve === true ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            if (!reve) {
              revValue(true);
              setValue(sortGoods(value, SortType.Reverse, true));
            } else {
              revValue(false);
              setValue(sortGoods(value, SortType.Reverse, false));
            }
          }}
        >
          Reverse
        </button>

        {(act !== SortType.None || reve) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setValue(goodsFromServer);
              actValue(SortType.None);
              revValue(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {value.map(e => (
          <li key={e} data-cy="Good">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};
