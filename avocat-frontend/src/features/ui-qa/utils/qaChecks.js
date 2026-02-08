import React from 'react';

const isReactNode = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true;
  return React.isValidElement(value);
};

const uniq = (arr) => new Set(arr).size === arr.length;

export const runTableChecks = ({
  headers = [],
  data = [],
  rowKey = 'id',
  getRowId,
  customRenderers = {},
}) => {
  const results = [];

  results.push({
    id: 'headers-non-empty',
    label: 'Headers array is not empty',
    pass: Array.isArray(headers) && headers.length > 0,
  });

  const headerKeys = headers.map((h) => h?.key).filter(Boolean);
  results.push({
    id: 'headers-have-key',
    label: 'Each header has key/text',
    pass: headers.every((h) => h?.key && h?.text),
  });

  results.push({
    id: 'headers-unique',
    label: 'Header keys are unique',
    pass: uniq(headerKeys),
  });

  const actionsHeader = headers.find((h) => h?.key === 'actions');
  results.push({
    id: 'actions-not-searchable',
    label: 'Actions header not searchable',
    pass: !actionsHeader || actionsHeader.searchable === false,
  });

  const resolvedIds = data.map((row, index) =>
    typeof getRowId === 'function' ? getRowId(row) : row?.[rowKey] ?? index,
  );

  results.push({
    id: 'row-id-present',
    label: 'Row IDs are present',
    pass: resolvedIds.every((id) => id !== null && id !== undefined),
  });

  results.push({
    id: 'row-id-unique',
    label: 'Row IDs are unique',
    pass: uniq(resolvedIds),
  });

  const rendererChecks = Object.entries(customRenderers).map(([key, renderer]) => {
    const sample = data[0];
    const value = sample && typeof renderer === 'function' ? renderer(sample) : null;
    return {
      id: `renderer-${key}`,
      label: `Renderer for ${key} returns ReactNode`,
      pass: isReactNode(value),
    };
  });

  return [...results, ...rendererChecks];
};
