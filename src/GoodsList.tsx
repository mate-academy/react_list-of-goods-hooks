type Props = {
  goods: string[],
  onReverse: () => void,
  onSort: () => void,
  onReset: () => void,
  onSortByLength: () => void,
  setLength: (x: string) => void,
  length: string,
};

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const GoodsList: React.FC<Props> = ({
  goods,
  onReverse,
  onSort,
  onReset,
  onSortByLength,
  setLength,
  length,
}) => {
  return (
    <div>
      <ul className="App__list">
        {goods.filter((good: string) => good.length >= +length)
          .map((product: string) => (
            <li key={product} className="App__item">
              <span className="App__span">
                {product}
              </span>
            </li>
          ))}
      </ul>

      <div className="App__tools">
        <button
          type="button"
          className="App__tools--button button"
          onClick={onReverse}
        >
          Reverse
        </button>
        <button
          type="button"
          className="App__tools--button button"
          onClick={onSort}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className="App__tools--button button"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="App__tools--button button"
          onClick={onSortByLength}
        >
          Sort by length
        </button>
      </div>
      <div className="App__select">
        <span className="App__select--title">
          Choose length
        </span>
        <select
          value={length}
          onChange={event => setLength(event.target.value)}
        >
          {options.map(option => (
            <option value={`${option}`}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
