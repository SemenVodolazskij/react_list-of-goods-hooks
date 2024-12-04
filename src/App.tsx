import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
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
  ByLength = 'ByLength',
  Alphabetically = 'Alphabetically',
}

function sortGoods(
  goods: string[],
  sortType: SortType | null,
  reverse: boolean,
): string[] {
  const sortedGoods = [...goods].sort((good1, good2) => {
    if (sortType === SortType.Alphabetically) {
      return good1.localeCompare(good2);
    }

    if (sortType === SortType.ByLength) {
      return good1.length - good2.length;
    }

    return 0;
  });

  return reverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState<SortType | null>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const isResetButtonVisible = sort || reverse;

  const resultSortedGoods =
    sort || reverse
      ? sortGoods(goodsFromServer, sort, reverse)
      : goodsFromServer;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sort !== SortType.Alphabetically,
          })}
          onClick={() => {
            if (sort === SortType.Alphabetically) {
              return setSort(null);
            } else {
              return setSort(SortType.Alphabetically);
            }
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sort !== SortType.ByLength,
          })}
          onClick={() => {
            if (sort === SortType.ByLength) {
              return setSort(null);
            } else {
              return setSort(SortType.ByLength);
            }
          }}
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
        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSort(null);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {resultSortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
