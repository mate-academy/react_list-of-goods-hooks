import React from 'react';
import cn from 'classnames';
import { SortBy } from '../../types/Types';
import { Button } from '../Button/Button';

type Props = {
  sortedBy: (arg: SortBy) => void,
  reverse: () => void,
  reset: () => void,
  showReset: boolean,
  currentSorted: string,
  isRevers: boolean,
};

export const SortButtons: React.FC<Props> = ({
  sortedBy,
  reverse,
  reset,
  showReset,
  currentSorted,
  isRevers,
}) => {
  return (
    <div className="buttons">
      <Button
        classStr={cn('is-info',
          { 'is-light': currentSorted !== SortBy.Alphabet })}
        click={() => sortedBy(SortBy.Alphabet)}
        text="Sort alphabetically"
      />

      <Button
        classStr={cn('is-success',
          { 'is-light': currentSorted !== SortBy.Length })}
        click={() => sortedBy(SortBy.Length)}
        text="Sort by length"
      />

      <Button
        classStr={cn('is-warning', { 'is-light': !isRevers })}
        click={reverse}
        text="Reverse"
      />

      {showReset && (
        <Button
          classStr="is-danger is-light"
          click={reset}
          text="Reset"
        />
      )}
    </div>
  );
};
