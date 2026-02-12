import test from 'node:test';
import assert from 'node:assert/strict';
import { matchPath } from 'react-router-dom';
import {
  dispatchTableAction,
  getActionColumnsCount,
  getTableDirectionMeta,
} from '../src/shared/components/common/tableActions.helpers.js';

test('details route pattern matches with id param', () => {
  const matched = matchPath('/dashboard/legcases/show/:id', '/dashboard/legcases/show/42');
  assert.ok(matched);
  assert.equal(matched.params.id, '42');
});

test('table action buttons dispatch the expected handlers', () => {
  const calls = [];
  const onView = (id) => calls.push(['view', id]);
  const onEdit = (id) => calls.push(['edit', id]);
  const onDelete = (id, row) => calls.push(['delete', id, row.slug]);
  const onRowAction = (action, id, row) => calls.push(['rowAction', action, id, row.slug]);
  const row = { id: 9, slug: 'A-9' };

  dispatchTableAction({ action: 'view', id: 9, row, onView, onEdit, onDelete, onRowAction });
  dispatchTableAction({ action: 'edit', id: 9, row, onView, onEdit, onDelete, onRowAction });
  dispatchTableAction({ action: 'delete', id: 9, row, onView, onEdit, onDelete, onRowAction });

  assert.deepEqual(calls, [
    ['view', 9],
    ['rowAction', 'view', 9, 'A-9'],
    ['edit', 9],
    ['rowAction', 'edit', 9, 'A-9'],
    ['delete', 9, 'A-9'],
    ['rowAction', 'delete', 9, 'A-9'],
  ]);
});

test('RTL alignment and actions columns smoke test', () => {
  const rtl = getTableDirectionMeta(true);
  const ltr = getTableDirectionMeta(false);

  assert.equal(rtl.dir, 'rtl');
  assert.equal(rtl.thAlign, 'text-right');
  assert.equal(ltr.dir, 'ltr');
  assert.equal(ltr.thAlign, 'text-left');

  assert.equal(
    getActionColumnsCount({
      showView: true,
      showEdit: true,
      showDelete: true,
      actionsMode: 'single',
    }),
    1,
  );

  assert.equal(
    getActionColumnsCount({
      showView: true,
      showEdit: true,
      showDelete: true,
      actionsMode: 'separate',
    }),
    3,
  );
});
