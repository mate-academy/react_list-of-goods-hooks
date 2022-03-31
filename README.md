# React list of goods (Hooks)
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_list-of-goods-hooks/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Tasks
> Starting from this task you should use ONLY functional components

1. At first show a button `Start` on the page
1. After clicking the button show a `GoodsList` (ul > li) with the given goods and hide the button
1. Add `Reverse` button to show the goods in reversed order
1. Add `Sort alphabetically` button to show the goods in alphabetical order
1. Add `Reset` button to show the goods in the initial order
1. Add `Sort by length` button to show the goods ordered by name length

## (*) Advanced tasks (require understanding of Forms in React)
1. Add `<select>` with numbers from 1 to 10. (1 is default). All the previous buttons
  should now show only goods having length >= than the selected value. When you change the
  value the items should be immediately re-rendered accordingly.
1. `Reset` button should set the default value to the `<select>`

## Requirements
1. `GoodsList` should contain `data-cy="goods"` attribute
1. `Start` button should contain `data-cy="start"` attribute
1. `Sort alphabetically` button should contain `data-cy="sortAlphabetically"` attribute
1. `Reset` button should contain `data-cy="reset"` attribute
1. `Reverse` button should contain `data-cy="reverse"` attribute
1. `Sort by length` button should contain `data-cy="sortByLength"` attribute
1. (*) Advanced: `<select>` should contain `data-cy="select"` attribute
1. (*) Advanced: each `<option>` of `<select>` should contain `data-cy="option"` attribute
