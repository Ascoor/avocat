import { useMemo } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import TableComponent from '@shared/components/common/TableComponent';

const CourtList = ({ courts = [], handleDelete }) => {
  const { t, isRTL } = useLanguage();

  const headers = useMemo(
    () => [
      {
        key: 'name',
        text: t('legalCaseDetails.courts.table.court'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.name || '-',
      },
      {
        key: 'case_year',
        text: t('legalCaseDetails.courts.table.year'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.pivot?.case_year || '-',
      },
      {
        key: 'case_number',
        text: t('legalCaseDetails.courts.table.caseNumber'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.pivot?.case_number || '-',
      },
    ],
    [t],
  );

  return (
    <TableComponent
      data={courts}
      headers={headers}
      isRTL={isRTL}
      itemsPerPage={6}
      searchPlaceholder={t('legalCaseDetails.courts.searchPlaceholder')}
      emptyLabel={t('legalCaseDetails.courts.empty')}
      retryLabel={t('legalCaseDetails.actions.retry')}
      onDelete={(id, row) => handleDelete(id, row?.name || '')}
      permissions={{ view: false, update: false, delete: true, create: false }}
      deleteLabel={t('legalCaseDetails.actions.delete')}
      prevLabel={t('legalCaseDetails.pagination.prev')}
      nextLabel={t('legalCaseDetails.pagination.next')}
      pageLabel={t('legalCaseDetails.pagination.page')}
    />
  );
};

export default CourtList;
