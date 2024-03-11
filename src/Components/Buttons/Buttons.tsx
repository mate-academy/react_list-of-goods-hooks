import { SortOptions } from '../../Types/SortOptions';
import { Button } from '../Button/Button';

interface Props {
  sortField: SortOptions;
  sortBy: React.Dispatch<React.SetStateAction<SortOptions>>;
  isReversed: boolean;
  reverse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Buttons: React.FC<Props> = ({
  sortField,
  sortBy,
  isReversed,
  reverse,
}) => (
  <div className="buttons">
    <Button
      name="Sort alphabetically"
      color="is-info"
      colorNameCondition={sortField !== SortOptions.abc}
      sortField={sortField}
      currentValue={SortOptions.abc}
      sortBy={sortBy}
      isReversed={isReversed}
      reverse={reverse}
    />

    <Button
      name="Sort by length"
      color="is-success"
      colorNameCondition={sortField !== SortOptions.length}
      sortField={sortField}
      currentValue={SortOptions.length}
      sortBy={sortBy}
      isReversed={isReversed}
      reverse={reverse}
    />

    <Button
      name="Reverse"
      color="is-warning"
      colorNameCondition={!isReversed}
      sortField={sortField}
      currentValue={sortField}
      sortBy={sortBy}
      isReversed={isReversed}
      reverse={reverse}
    />

    {(isReversed || sortField) && (
      <Button
        name="Reset"
        color="is-danger"
        colorNameCondition={isReversed || sortField !== ''}
        sortField={sortField}
        currentValue={sortField}
        sortBy={sortBy}
        isReversed={isReversed}
        reverse={reverse}
      />
    )}
  </div>
);
