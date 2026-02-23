export const lookupEntities = [
  { value: 'procedure_types', titleKey: 'settings.lookups.entities.procedureTypes' },
  {
    value: 'procedure_place_types',
    titleKey: 'settings.lookups.entities.procedurePlaceTypes',
  },
  {
    value: 'legal_session_types',
    titleKey: 'settings.lookups.entities.legalSessionTypes',
  },
  { value: 'legal_ad_types', titleKey: 'settings.lookups.entities.legalAdTypes' },
  { value: 'service_types', titleKey: 'settings.lookups.entities.serviceTypes' },
  {
    value: 'expense_categories',
    titleKey: 'settings.lookups.entities.expenseCategories',
  },
  {
    value: 'revenue_categories',
    titleKey: 'settings.lookups.entities.revenueCategories',
  },
];

export const lookupFields = [
  { name: 'name', labelKey: 'settings.lookups.fields.name' },
  {
    name: 'sort_order',
    labelKey: 'settings.lookups.fields.sortOrder',
    type: 'number',
  },
  {
    name: 'is_active',
    labelKey: 'settings.lookups.fields.active',
    type: 'checkbox',
  },
];

export const courtSettingEntities = [
  { value: 'court_levels', titleKey: 'settings.lookups.entities.courtLevels' },
  { value: 'court_types', titleKey: 'settings.lookups.entities.courtTypes' },
  { value: 'courts', titleKey: 'settings.lookups.entities.courts' },
  { value: 'divisions', titleKey: 'settings.lookups.entities.divisions' },
];

export const courtSettingFieldsByEntity = {
  court_levels: lookupFields,
  court_types: lookupFields,
  courts: [
    { name: 'name', labelKey: 'settings.lookups.fields.name' },
    {
      name: 'court_level_id',
      labelKey: 'settings.lookups.fields.courtLevel',
      type: 'entity-select',
      optionsEntity: 'court_levels',
    },
    {
      name: 'court_type_id',
      labelKey: 'settings.lookups.fields.courtType',
      type: 'entity-select',
      optionsEntity: 'court_types',
    },
    ...lookupFields.filter((field) => field.name !== 'name'),
  ],
  divisions: [
    { name: 'name', labelKey: 'settings.lookups.fields.name' },
    {
      name: 'court_id',
      labelKey: 'settings.lookups.fields.court',
      type: 'entity-select',
      optionsEntity: 'courts',
    },
    ...lookupFields.filter((field) => field.name !== 'name'),
  ],
};
