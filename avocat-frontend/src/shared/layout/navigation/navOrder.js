export const topNavPreferredOrder = [
  'dashboard',
  'customer_service',
  'cases',
  'services',
  'power_of_attorney',
  'documents',
  'reports',
  'finance',
  'settings',
  'follow_work',
  'admin_access',
];

const topNavOrderMap = new Map(topNavPreferredOrder.map((key, index) => [key, index]));

export const getTopNavOrderIndex = (itemKey) => topNavOrderMap.get(itemKey) ?? Number.MAX_SAFE_INTEGER;

export const sortItemsByTopNavOrder = (items) => {
  return [...items].sort((a, b) => getTopNavOrderIndex(a.key) - getTopNavOrderIndex(b.key));
};
