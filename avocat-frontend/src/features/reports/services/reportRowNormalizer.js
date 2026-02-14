const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const resolveLegCase = (row) => pickFirst(row?.leg_case, row?.legcase, row?.legCase, row?._raw?.leg_case, row?._raw?.legcase, row?._raw?.legCase, {});

export const resolveLegCaseId = (row) =>
  pickFirst(row?.leg_case_id, row?.legcase_id, row?.legCaseId, row?.leg_case?.id, row?.legcase?.id, row?.legCase?.id, row?._raw?.leg_case_id, row?._raw?.legcase_id, row?._raw?.leg_case?.id, row?._raw?.legcase?.id, row?._raw?.legCase?.id, null);

export const normalizeReportRow = (tabKey, row) => {
  const legCase = resolveLegCase(row);
  const slug = pickFirst(row?.slug, row?.file_no, row?.file_number, legCase?.slug, row?._raw?.slug, row?._raw?.file_no, row?._raw?.file_number, '-');

  const base = {
    id: pickFirst(row?.id, row?._raw?.id, null),
    leg_case_id: resolveLegCaseId(row),
    slug,
    status: pickFirst(row?.status, row?._raw?.status, '-'),
    row_date: pickFirst(row?.row_date, row?.created_at, row?.updated_at, row?._raw?.created_at, null),
    _raw: row,
  };

  if (tabKey === 'procedures') {
    return {
      ...base,
      title: pickFirst(row?.procedure_type?.name, row?.procedureType?.name, row?.job, '-'),
      type_name: pickFirst(row?.procedure_type?.name, row?.procedureType?.name, '-'),
      type_id: pickFirst(row?.procedure_type_id, row?.procedure_type?.id, row?.procedureType?.id, ''),
      lawyer_id: pickFirst(row?.lawyer_id, row?.lawyer?.id, ''),
      client_name: pickFirst(row?.client?.name, legCase?.clients?.[0]?.name, '-'),
      row_date: pickFirst(row?.date_start, row?.date_end, base.row_date),
    };
  }

  if (tabKey === 'sessions') {
    return {
      ...base,
      title: pickFirst(row?.session_type?.name, row?.legalSessionType?.name, row?.court_session, '-'),
      type_name: pickFirst(row?.session_type?.name, row?.legalSessionType?.name, '-'),
      type_id: pickFirst(row?.session_type_id, row?.legal_session_type_id, row?.session_type?.id, row?.legalSessionType?.id, ''),
      lawyer_id: pickFirst(row?.lawyer_id, row?.lawyer?.id, ''),
      client_name: pickFirst(row?.client?.name, legCase?.clients?.[0]?.name, '-'),
      row_date: pickFirst(row?.session_date, base.row_date),
    };
  }

  if (tabKey === 'services') {
    return {
      ...base,
      title: pickFirst(row?.description, row?.serviceType?.name, '-'),
      type_name: pickFirst(row?.serviceType?.name, '-'),
      type_id: pickFirst(row?.service_type_id, row?.serviceType?.id, ''),
      client_name: pickFirst(row?.client?.name, row?.clients?.[0]?.name, row?.unclients?.[0]?.name, '-'),
    };
  }

  if (tabKey === 'cases') {
    return {
      ...base,
      title: pickFirst(row?.title, '-'),
      type_name: pickFirst(row?.caseSubType?.name, row?.caseType?.name, '-'),
      type_id: pickFirst(row?.case_type_id, row?.caseType?.id, row?.caseSubType?.case_type_id, ''),
      client_name: pickFirst(row?.client?.name, row?.clients?.[0]?.name, '-'),
    };
  }

  return {
    ...base,
    name: pickFirst(row?.name, '-'),
    client_name: pickFirst(row?.name, '-'),
    client_type: pickFirst(row?.client_type, '-'),
    phone_number: pickFirst(row?.phone_number, row?.phone, '-'),
  };
};
