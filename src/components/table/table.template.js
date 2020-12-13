import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_ROW_COUNT = 15;
const DEFAULT_COL_WIDTH = 120;
const DEFAULT_ROW_HEIGHT = 24;

function createRow(index, content, height) {
  const resize = index
    ? `<div class='row-resize' data-resize='row'></div>`
    : '';
  return `
    <div 
      class='row' 
      data-type='resizable' 
      data-elem='row' 
      data-row=${index}
      style='height: ${height}'
    >
      <div class='row-info'>
        ${index ? index : ''}
        ${resize}
      </div>
      <div class='row-data'>${content}
      </div>
    </div>
  `;
}

function toColumn({ col, index, width }) {
  return `
    <div 
      class='column' 
      data-type='resizable' 
      data-col=${index} 
      style='width: ${width}'
    >
      ${col}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `;
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const width = (state.colState[col] || DEFAULT_COL_WIDTH) + 'px';
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
        <div 
          class="cell" 
          contenteditable="" 
          data-col="${col}" 
          data-type="cell"
          data-id="${id}"
          data-value="${data || ''}"
          style="${styles}; width:${width}"
        >${parse(data)}</div>
      `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(index + CODES.A);
}

function getWidth(colState, index) {
  const width = (colState[index] || DEFAULT_COL_WIDTH) + 'px';
  return width;
}

function withwidthFrom(colState) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(colState, index),
    };
  };
}

function getHeight(rowState, index) {
  const height = (rowState[index] || DEFAULT_ROW_HEIGHT) + 'px';
  return height;
}

export function createTable(rowsCount = DEFAULT_ROW_COUNT, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withwidthFrom(state.colState))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const height = getHeight(state.rowState, row + 1);
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('');
    rows.push(createRow(row + 1, cells, height));
  }
  return rows.join('');
}
