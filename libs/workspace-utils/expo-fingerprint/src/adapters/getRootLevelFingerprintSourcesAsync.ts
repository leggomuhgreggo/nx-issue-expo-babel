import { createFingerprintAsync } from '@expo/fingerprint';
import type {
  HashSourceDir,
  HashSourceContents,
  HashSourceFile,
} from '@expo/fingerprint';

/* ***********************************
 * getRootLevelFingerprintSourcesAsync
 * ***********************************

 * This is used in conjunction with a project level fingerprint, where both are
 * filtered and merged together, then rehashed to generate the correct
 * fingerprint
 */

export async function getRootLevelFingerprintSourcesAsync() {
  const rootFingerPrint = await createFingerprintAsync('.', {
    extraSources: [...EXTRA_SOURCES],
  });

  const filteredSources = rootFingerPrint.sources.filter((source) => {
    if (isPkgJsonScripts(source as HashSourceContents)) return true;
    if (isNpmDir(source as SourceWithPath)) return true;
    if (isExtraSource(source as SourceWithPath)) return true;
    return false;
  });

  return filteredSources;
}

export type SourceWithPath = HashSourceDir | HashSourceFile;

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/* ***********************************
 * Extra Sources (From Root)
 * ***********************************

 * There's currently an issue in the @expo/fingerprint logic, where local config
 * plugins are resolved to an "entire-project" source -- and then expo files
 * (e.g. eas.json, app.config.ts) are "de-duped" into that "entire-project"
 * source.
 *
 * But we don't want to reset the fingerprint every time an app file changes, so
 * we remove the "entire-project" source, and need to re-add sources.
 *
 */

const EXTRA_SOURCES: SourceWithPath[] = [
  {
    type: 'dir',
    filePath: 'apps/repro-app-ts-config-files/config-plugins',
    reasons: ['expoConfigPlugins'],
  },
  {
    type: 'file',
    filePath: 'apps/repro-app-ts-config-files/eas.json',
    reasons: ['expoConfig'],
  },
  {
    type: 'file',
    filePath: 'apps/repro-app-ts-config-files/app.config.ts',
    reasons: ['expoConfig'],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// ─── UTILS ────────────────────────────────────────────────────────────────

function isNpmDir(source: SourceWithPath) {
  // we only want dir type
  if (source.type !== 'dir') return false;
  // we only want node_modules
  if (!source.filePath.includes('node_modules')) return false;

  return true;
}

function isExtraSource(source: SourceWithPath) {
  return EXTRA_SOURCES.some((extra) => extra.filePath === source.filePath);
}

function isPkgJsonScripts(source: HashSourceContents) {
  return source.type === 'contents' && source.id === 'packageJson:scripts';
}
