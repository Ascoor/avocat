import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Plus,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const DEFAULT_PAGE_SIZE = 10;

type Alignment = 'start' | 'center' | 'end';

export interface DetailsTableColumn<T> {
  key: string;
  header: string;
  /** Optional secondary label to display under the header (e.g., bilingual hint). */
  secondaryHeader?: string;
  render: (row: T) => ReactNode;
  accessor?: (row: T) => string | number | Date | null | undefined;
  sortable?: boolean;
  align?: Alignment;
  className?: string;
}

export interface DetailsTableProps<T> {
  data: T[];
  columns: DetailsTableColumn<T>[];
  actionsHeader?: string;
  renderActions?: (row: T) => ReactNode;
  emptyMessage: string;
  enableSearch?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableExport?: boolean;
  exportFileName?: string;
  pageSize?: number;
  onSortChange?: (sort: { key: string | null; direction: 'asc' | 'desc' }) => void;
  addButtonLabel?: string;
  onAdd?: () => void;
  toolbarExtras?: ReactNode;
  isLoading?: boolean;
}

const alignClass: Record<Alignment, string> = {
  start: 'text-left rtl:text-right',
  center: 'text-center',
  end: 'text-right rtl:text-left',
};

const normaliseValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'number') return Number.isFinite(value) ? value.toString() : '';
  if (Array.isArray(value)) return value.map((item) => normaliseValue(item)).join(' ');
  if (typeof value === 'object')
    return Object.values(value as Record<string, unknown>)
      .map((item) => normaliseValue(item))
      .join(' ');
  return String(value);
};

const compareValues = (a: unknown, b: unknown): number => {
  if (a === b) return 0;
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;

  if (a instanceof Date || b instanceof Date) {
    const aTime = a instanceof Date ? a.getTime() : new Date(String(a)).getTime();
    const bTime = b instanceof Date ? b.getTime() : new Date(String(b)).getTime();
    return aTime - bTime;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  const aStr = String(a);
  const bStr = String(b);
  return aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: 'base' });
};

const escapeCsvValue = (value: string): string => {
  const needsQuotes = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const formatExportValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  return Array.isArray(value) ? value.join(', ') : String(value);
};

const DetailsTable = <T,>({
  data,
  columns,
  actionsHeader,
  renderActions,
  emptyMessage,
  enableSearch = true,
  enableSorting = true,
  enablePagination = true,
  enableExport = false,
  exportFileName = 'table-data',
  pageSize = DEFAULT_PAGE_SIZE,
  onSortChange,
  addButtonLabel,
  onAdd,
  toolbarExtras,
  isLoading = false,
}: DetailsTableProps<T>) => {
  const { isRTL, t } = useLanguage();
  const hasActions = typeof renderActions === 'function';

  const sortableColumns = useMemo(
    () =>
      enableSorting
        ? columns.filter((column) => column.sortable && typeof column.accessor === 'function')
        : [],
    [columns, enableSorting],
  );

  const exportableColumns = useMemo(
    () => columns.filter((column) => typeof column.accessor === 'function'),
    [columns],
  );

  const searchableColumns = useMemo(
    () => columns.filter((column) => typeof column.accessor === 'function'),
    [columns],
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortKey, sortDirection, data.length, pageSize]);

  const filteredData = useMemo(() => {
    if (!enableSearch || !searchTerm.trim()) return data;
    const query = searchTerm.trim().toLowerCase();

    return data.filter((row) =>
      searchableColumns.some((column) => {
        if (!column.accessor) return false;
        const value = column.accessor(row);
        return normaliseValue(value).toLowerCase().includes(query);
      }),
    );
  }, [data, enableSearch, searchTerm, searchableColumns]);

  const sortedData = useMemo(() => {
    if (!enableSorting || !sortKey) return filteredData;
    const column = columns.find((col) => col.key === sortKey && typeof col.accessor === 'function');
    if (!column || !column.accessor) return filteredData;

    const accessor = column.accessor;
    const cloned = [...filteredData];
    cloned.sort((a, b) => {
      const result = compareValues(accessor(a), accessor(b));
      return sortDirection === 'asc' ? result : -result;
    });
    return cloned;
  }, [columns, enableSorting, filteredData, sortDirection, sortKey]);

  const totalItems = sortedData.length;
  const totalPages = enablePagination ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;

  useEffect(() => {
    if (enablePagination && page > totalPages) {
      setPage(totalPages);
    }
  }, [enablePagination, page, totalPages]);

  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [enablePagination, page, pageSize, sortedData]);

  const downloadBlob = (blob: Blob, filename: string) => {
    if (typeof window === 'undefined') return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    if (exportableColumns.length === 0) return;

    const headers = exportableColumns.map((column) => escapeCsvValue(column.header));
    const rows = sortedData.map((row) =>
      exportableColumns.map((column) => escapeCsvValue(formatExportValue(column.accessor?.(row)))),
    );

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${exportFileName}.csv`);
  };

  const handleExportExcel = () => {
    if (exportableColumns.length === 0) return;

    const headerRow = exportableColumns
      .map((column) => `<th>${escapeHtml(column.header)}</th>`)
      .join('');
    const dataRows = sortedData
      .map((row) =>
        `<tr>${exportableColumns
          .map((column) => `<td>${escapeHtml(formatExportValue(column.accessor?.(row)))}</td>`)
          .join('')}</tr>`,
      )
      .join('');

    const html = `<table><thead><tr>${headerRow}</tr></thead><tbody>${dataRows}</tbody></table>`;
    const blob = new Blob(['\ufeff' + html], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    });
    downloadBlob(blob, `${exportFileName}.xls`);
  };

  const handleSortKeyChange = useCallback(
    (value: string) => {
      const nextKey = value === 'none' ? null : value;
      setSortKey(nextKey);
      onSortChange?.({ key: nextKey, direction: sortDirection });
    },
    [onSortChange, sortDirection],
  );

  const handleToggleDirection = useCallback(() => {
    setSortDirection((previous) => {
      const next = previous === 'asc' ? 'desc' : 'asc';
      onSortChange?.({ key: sortKey, direction: next });
      return next;
    });
  }, [onSortChange, sortKey]);

  const handleClearSort = useCallback(() => {
    setSortKey(null);
    setSortDirection('asc');
    onSortChange?.({ key: null, direction: 'asc' });
  }, [onSortChange]);

  const controlsVisible =
    enableSearch || (enableSorting && sortableColumns.length > 0) || enableExport || onAdd || toolbarExtras;

  const showingFrom = enablePagination && totalItems > 0 ? (page - 1) * pageSize + 1 : totalItems > 0 ? 1 : 0;
  const showingTo = enablePagination ? Math.min(page * pageSize, totalItems) : totalItems;

  return (
    <div className="rounded-lg border border-border/60 bg-card/40 shadow-card">
      {controlsVisible && (
        <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/30 px-4 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {enableSearch ? (
              <div className="relative w-full lg:max-w-sm">
                <Search
                  className={cn(
                    'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                    isRTL ? 'right-3' : 'left-3',
                  )}
                />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t('table.search')}
                  className={cn(isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3')}
                />
              </div>
            ) : (
              <div />
            )}

            <div className="flex flex-wrap items-center justify-end gap-2">
              {enableSorting && sortableColumns.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={sortKey ?? 'none'} onValueChange={handleSortKeyChange}>
                    <SelectTrigger className="h-9 w-44" aria-label={t('table.aria.sortColumn')}>
                      <SelectValue placeholder={t('table.sortBy')}>
                        {sortKey
                          ? sortableColumns.find((column) => column.key === sortKey)?.header
                          : t('table.noSort')}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align={isRTL ? 'start' : 'end'}>
                      <SelectItem value="none">{t('table.noSort')}</SelectItem>
                      {sortableColumns.map((column) => (
                        <SelectItem key={column.key} value={column.key}>
                          {column.header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleToggleDirection}
                    disabled={!sortKey}
                    aria-label={t('table.aria.toggleDirection')}
                  >
                    {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSort}
                    disabled={!sortKey}
                    aria-label={t('table.aria.clearSort')}
                    className="gap-2"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-sm">{t('table.clearSort')}</span>
                  </Button>
                </div>
              )}

              {enableExport && exportableColumns.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExportCsv}
                    aria-label={t('table.aria.exportCsv')}
                    className="gap-2"
                  >
                    <FileDown className="h-4 w-4" />
                    {t('table.exportCSV')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExportExcel}
                    aria-label={t('table.aria.exportExcel')}
                    className="gap-2"
                  >
                    <FileDown className="h-4 w-4" />
                    {t('table.exportExcel')}
                  </Button>
                </div>
              )}

              {toolbarExtras}

              {onAdd && (
                <Button type="button" onClick={onAdd} className="gap-2">
                  <Plus className="h-4 w-4" />
                  {addButtonLabel ?? t('common.add')}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table dir={isRTL ? 'rtl' : 'ltr'} className="min-w-full align-middle">
          <TableHeader>
            <TableRow className="bg-muted/40">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    'px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                    alignClass[column.align ?? 'start'],
                    column.className,
                  )}
                >
                  <div className="flex flex-col gap-0.5 leading-tight">
                    <span>{column.header}</span>
                    {column.secondaryHeader ? (
                      <span className="text-[11px] font-medium uppercase text-foreground/80 dark:text-foreground/70">
                        {column.secondaryHeader}
                      </span>
                    ) : null}
                  </div>
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground text-center">
                  {actionsHeader}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  {t('common.loading')}
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={`row-${rowIndex}`}
                  className="border-border/40 transition-colors hover:bg-muted/40"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${column.key}-${rowIndex}`}
                      className={cn(
                        'px-4 py-2 text-sm text-foreground',
                        alignClass[column.align ?? 'start'],
                        column.className,
                      )}
                    >
                      {column.render(row)}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell className="px-4 py-2 text-center">
                      {renderActions?.(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {(enablePagination || totalItems > 0) && (
        <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground">
            {t('table.showing')}{' '}
            {totalItems === 0 ? 0 : `${showingFrom}-${showingTo}`} {t('table.of')} {totalItems}{' '}
            {t('table.entries')}
          </span>

          {enablePagination && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                {t('table.previous')}
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
              >
                {t('table.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsTable;
