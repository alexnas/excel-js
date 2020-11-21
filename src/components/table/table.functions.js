import { range } from '../../core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function martix($target, $current, $root) {
  const current = $current.id(true);
  const target = $target.id(true);

  const cols = range(+current.col, +target.col);
  const rows = range(+current.row, +target.row);

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return ids.map((id) => $root.find(`[data-id="${id}"]`));
}

export function nextSelection(key, { row, col }) {
  const MIN_VALUE = 0;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col > MIN_VALUE ? col-- : col;
      break;
    case 'ArrowUp':
      row > MIN_VALUE ? row-- : row;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
