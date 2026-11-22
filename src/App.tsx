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
type SortType = 'alphabetically' | 'length' | 'reverse' | '';

export const App = () => {
  const [value, setValue] = useState<string[]>(goodsFromServer);
  const [act, actValue] = useState<SortType>('');
  const [reve, revValue] = useState(false);

  function sortGoods(
    good: string[],
    setvalue: SortType,
    rev = false,
  ): string[] {
    const val = [...good];

    if (setvalue === 'alphabetically') {
      val.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (setvalue === 'length') {
      val.sort((good1, good2) => good1.length - good2.length);
    }

    if (setvalue === 'reverse') {
      val.reverse();
    }

    if (rev) {
      if (setvalue === 'alphabetically') {
        val.sort((good1, good2) => good2.localeCompare(good1));
      }

      if (setvalue === 'length') {
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
            act === 'alphabetically'
              ? 'button is-info '
              : 'button is-info is-light'
          }
          onClick={() => {
            setValue(sortGoods(value, 'alphabetically', reve));
            actValue('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            act === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setValue(sortGoods(value, 'length', reve));
            actValue('length');
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
              setValue(sortGoods(value, 'reverse', true));
            } else {
              revValue(false);
              setValue(sortGoods(value, 'reverse', false));
            }
          }}
        >
          Reverse
        </button>

        {(act !== '' || reve) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setValue(goodsFromServer);
              actValue('');
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
