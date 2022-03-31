import { FC } from 'react';

interface Props {
  options: number[];
  selectedLength: number;
  onChangeFunc: (value: string) => void;
}

export const Selector: FC<Props> = ({
  options,
  selectedLength,
  onChangeFunc,
}) => (
  <div className="Selector">
    <span className="Selector__label">
      Length
    </span>

    <select
      className="Selector__select"
      value={selectedLength}
      onChange={({ target }) => {
        onChangeFunc(target.value);
      }}
    >
      {options.map(item => (
        <option key={`length-${item}`} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);
