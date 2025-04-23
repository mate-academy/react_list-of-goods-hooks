import React, { useState } from 'react';

// Define the enum for sorting options
enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

// Define the type for goods
const goods: string[] = ['Apples', 'Oranges', 'Bananas', 'Pineapples', 'Grapes'];

const ListOfGoods: React.FC = () => {
  // State for goods and sort type
  const [sortedGoods, setSortedGoods] = useState<string[]>(goods);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  // Function to handle sorting
  const handleSort = (type: SortType) => {
    let updatedGoods = [...goods];
    switch (type) {
      case SortType.Alphabetically:
        updatedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.ByLength:
        updatedGoods.sort((a, b) => a.length - b.length);
        break;
      case SortType.Default:
      default:
        updatedGoods = [...goods];
    }
    setSortedGoods(updatedGoods);
    setSortType(type);
  };

  return (
    <div>
      <h1>List of Goods</h1>
      <ul>
        {sortedGoods.map((good, index) => (
          <li key={index}>{good}</li>
        ))}
      </ul>
      <button onClick={() => handleSort(SortType.Default)}>Default</button>
      <button onClick={() => handleSort(SortType.Alphabetically)}>Sort Alphabetically</button>
      <button onClick={() => handleSort(SortType.ByLength)}>Sort by Length</button>
    </div>
  );
};

export default ListOfGoods;
