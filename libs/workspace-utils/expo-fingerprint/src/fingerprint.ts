import { hashAllSources } from './hashAllSources';
import {
  getRootLevelFingerprintSourcesAsync,
  getProjectLevelFingerprintSourcesAsync,
} from './adapters';

/**
 * This is a custom implementation on top of @expo/fingerprint.
 *
 * This works by fingerprinting both the project AND the workspace, selecting
 * only the sources we're interested in -- then combines them into a single
 * fingerprint
 */

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns entire fingerprint object
 */
export async function createCustomFingerprintAsync(projectRoot?: string) {
  const rootLevelFingerprint = await getRootLevelFingerprintSourcesAsync();
  const projectLevelFingerprint = await getProjectLevelFingerprintSourcesAsync(
    './apps/order'
  );

  const mergedSources = [...rootLevelFingerprint, ...projectLevelFingerprint];

  const hash = hashAllSources(mergedSources);

  return { sources: mergedSources, hash };
}

/**
 * Returns just the hash of all fingerprinted sources
 */
export async function createCustomProjectHashAsync(projectRoot?: string) {
  const { hash } = await createCustomFingerprintAsync(projectRoot);

  return hash;
}
