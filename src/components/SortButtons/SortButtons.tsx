import React from 'react';
import cn from 'classnames';
import { sortBy } from '../../const/const';
import { Button } from '../Button/Button';

type Props = {
  sortedBy: (arg: string) => void,
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
          { 'is-light': currentSorted !== sortBy.alphabet })}
        click={() => sortedBy(sortBy.alphabet)}
        text="Sort alphabetically"
      />

      <Button
        classStr={cn('is-success',
          { 'is-light': currentSorted !== sortBy.length })}
        click={() => sortedBy(sortBy.length)}
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
