import React, { memo } from 'react';

type Props = {
  lengthGoodName: number,
};

export const LengthFilter: React.FC<Props> = memo(({ lengthGoodName }) => {
  return (
    <>
      {[...new Array(lengthGoodName)].map((_, i) => (
        <option value={i + 1}>
          {i + 1}
        </option>
      ))}
    </>
  );
});
