export const resolveActionsMode = (actionsMode) =>
  actionsMode === 'single' ? 'single' : 'separate';

export const getTableDirectionMeta = (isRTL) => ({
  dir: isRTL ? 'rtl' : 'ltr',
  thAlign: isRTL ? 'text-right' : 'text-left',
  tdAlign: isRTL ? 'text-right' : 'text-left',
  cellJustify: isRTL ? 'justify-end' : 'justify-start',
});

export const getActionColumnsCount = ({
  showView,
  showEdit,
  showDelete,
  actionsMode,
}) => {
  const actionsCount = Number(showView) + Number(showEdit) + Number(showDelete);
  if (!actionsCount) return 0;
  return resolveActionsMode(actionsMode) === 'single' ? 1 : actionsCount;
};

export const dispatchTableAction = ({
  action,
  id,
  row,
  onView,
  onEdit,
  onDelete,
  onRowAction,
}) => {
  if (action === 'view') onView?.(id);
  if (action === 'edit') onEdit?.(id);
  if (action === 'delete') onDelete?.(id, row);
  onRowAction?.(action, id, row);
};
