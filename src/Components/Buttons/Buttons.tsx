import { SortOptions } from '../../Types/SortOptions';
import { Button } from '../Button/Button';

interface Props {
  sortField: SortOptions;
  sortBy: React.Dispatch<React.SetStateAction<SortOptions>>;
  reverseStatus: string;
  reverse: React.Dispatch<React.SetStateAction<string>>;
}

const ResetButton = (reverseStatus: string, sortField: SortOptions) => {
  return reverseStatus || (sortField && sortField !== 'reset');
};

const ResetClassName = (reverseStatus: string, sortField: SortOptions) => {
  return reverseStatus !== '' || sortField !== '';
};

export const Buttons: React.FC<Props> = ({
  sortField,
  sortBy,
  reverseStatus,
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
      reverseStatus={reverseStatus}
      reverse={reverse}
    />

    <Button
      name="Sort by length"
      color="is-success"
      colorNameCondition={sortField !== SortOptions.length}
      sortField={sortField}
      currentValue={SortOptions.length}
      sortBy={sortBy}
      reverseStatus={reverseStatus}
      reverse={reverse}
    />

    <Button
      name="Reverse"
      color="is-warning"
      colorNameCondition={reverseStatus === ''}
      sortField={sortField}
      currentValue={sortField}
      sortBy={sortBy}
      reverseStatus={reverseStatus}
      reverse={reverse}
    />

    {ResetButton(reverseStatus, sortField) && (
      <Button
        name="Reset"
        color="is-danger"
        colorNameCondition={ResetClassName(reverseStatus, sortField)}
        sortField={sortField}
        currentValue={SortOptions.reset}
        sortBy={sortBy}
        reverseStatus={reverseStatus}
        reverse={reverse}
      />
    )}
  </div>
);
