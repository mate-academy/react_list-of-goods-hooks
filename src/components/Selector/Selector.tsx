import { FC, memo } from 'react';

interface Props {
  options: number[];
  selectedLength: number;
  onChange: (value: string) => void;
}

export const Selector: FC<Props> = memo(({
  options, selectedLength, onChange,
}) => (
  <div className="Selector">
    <span className="Selector__label">
      Length
    </span>

    <select
      className="Selector__select"
      value={selectedLength}
      onChange={({ target }) => {
        onChange(target.value);
      }}
    >
      {options.map(item => (
        <option key={`length-${item}`} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
));
