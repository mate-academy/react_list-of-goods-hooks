import React from 'react';

type Props = {
  length: number,
};

const Options: React.FC<Props> = ({ length }) => {
  return (
    <>
      {[...new Array(length)].map((_, i) => (
        <option value={i + 1}>
          {i + 1}
        </option>
      ))}
    </>
  );
};

export default React.memo(Options);
