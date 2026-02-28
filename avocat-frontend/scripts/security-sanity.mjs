import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'src');
const permissionMapPath = path.join(root, 'shared/security/permission-map.ts');
const sidebarPath = path.join(root, 'config/sidebar.js');

const permissionMapSource = fs.readFileSync(permissionMapPath, 'utf8');
const sidebarSource = fs.readFileSync(sidebarPath, 'utf8');

const [canonicalBlock] = permissionMapSource.split('export const permissionAliases');
const canonicalPermissions = [...canonicalBlock.matchAll(/"([a-z]+\.[a-z_]+)"/g)].map((m) => m[1]);
const aliasBlock = permissionMapSource.split('export const permissionAliases')[1] ?? '';
const aliasKeys = [...aliasBlock.matchAll(/"([a-z-]+\.[a-z-]+)"\s*:/g)].map((m) => m[1]);

const duplicates = canonicalPermissions.filter((permission, idx) => canonicalPermissions.indexOf(permission) !== idx);
const aliasCanonicalOverlap = aliasKeys.filter((key) => canonicalPermissions.includes(key));

const moduleActionPairs = [...permissionMapSource.matchAll(/^(\s{2})(\w+):\s*\{([\s\S]*?)^\s{2}\},/gm)]
  .map((m) => {
    const moduleName = m[2];
    const actions = [...m[3].matchAll(/\s{4}(\w+):\s*"/g)].map((a) => a[1]);
    return [moduleName, new Set(actions)];
  });
const moduleActionMap = new Map(moduleActionPairs);

const sidebarRefs = [...sidebarSource.matchAll(/requiredPermission:\s*permissionMap\.(\w+)\.(\w+)/g)].map((m) => ({
  module: m[1],
  action: m[2],
  raw: m[0],
}));

const missingSidebarRefs = sidebarRefs.filter((ref) => !moduleActionMap.get(ref.module)?.has(ref.action));

if (duplicates.length || aliasCanonicalOverlap.length || missingSidebarRefs.length) {
  console.error('Security sanity check failed.');
  if (duplicates.length) console.error('Duplicate canonical permission names:', [...new Set(duplicates)].join(', '));
  if (aliasCanonicalOverlap.length) console.error('Alias keys must not be canonical keys:', aliasCanonicalOverlap.join(', '));
  if (missingSidebarRefs.length) {
    console.error('Sidebar requiredPermission references unknown permissionMap entries:');
    for (const ref of missingSidebarRefs) console.error(` - ${ref.raw}`);
  }
  process.exit(1);
}

console.log('Security sanity check passed.');
console.log(`Canonical permissions: ${canonicalPermissions.length}`);
console.log(`Legacy aliases: ${aliasKeys.length}`);
console.log(`Sidebar permission references: ${sidebarRefs.length}`);
