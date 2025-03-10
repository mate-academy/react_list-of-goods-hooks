import 'bulma/css/bulma.css';
import classNames from 'classnames';
import React, { useState } from 'react';
import './App.scss';

export const goodsFromServer: string[] = [
	'Dumplings',
	'Carrot',
	'Eggs',
	'Ice cream',
	'Apple',
	'Bread',
	'Fish',
	'Honey',
	'Jam',
	'Garlic',
];

enum SortType {
	SORT_BY_ALPHA = 'alphabetically',
	SORT_BY_LENGTH = 'length',
}

function getSortGoods(sortBy: string, reverse: boolean) {
	const sorted = [...goodsFromServer].sort((a, b) => {
		switch (sortBy) {
			case SortType.SORT_BY_ALPHA:
				return a.localeCompare(b);
			case SortType.SORT_BY_LENGTH:
				return a.length - b.length;
			default:
				return 0;
		}
	});

	return reverse ? sorted.reverse() : sorted;
}

export const App: React.FC = () => {
	const [sortType, setSortType] = useState('');
	const [reverse, setReverse] = useState<boolean>(false);
	const goodsList = getSortGoods(sortType, reverse);

	return (
		<div className="section content">
			<div className="buttons">
				<button
					type="button"
					className={classNames('button', 'is-info', {
						'is-light': sortType !== SortType.SORT_BY_ALPHA,
					})}
					onClick={() => setSortType(SortType.SORT_BY_ALPHA)}
				>
					Sort alphabetically
				</button>

				<button
					type="button"
					className={classNames('button', 'is-success', {
						'is-light': sortType !== SortType.SORT_BY_LENGTH,
					})}
					onClick={() => setSortType(SortType.SORT_BY_LENGTH)}
				>
					Sort by length
				</button>

				<button
					type="button"
					className={classNames('button', 'is-warning', {
						'is-light': !reverse,
					})}
					onClick={() => setReverse(!reverse)}
				>
					Reverse
				</button>
				{(sortType || reverse) && (
					<button
						type="button"
						className="button is-danger is-light"
						onClick={() => {
							setSortType('');
							setReverse(false);
						}}
					>
						Reset
					</button>
				)}
			</div>
			<ul>
				{goodsList.map(good => (
					<li key={good} data-cy="Good">
						{good}
					</li>
				))}
			</ul>
		</div>
	);
};
