import { createFingerprintAsync } from '@expo/fingerprint';

/* ***********************************
 * getProjectLevelFingerprintAsync
 * ***********************************

 * This is used in conjunction with a root level fingerprint, where both are
 * filtered and merged together, then rehashed to generate the correct
 * fingerprint
 */
export async function getProjectLevelFingerprintSourcesAsync(
  projectRoot: string
) {
  const projectFingerPrint = await createFingerprintAsync(projectRoot);
  const filteredSources = projectFingerPrint.sources.filter(
    (source) => source.type === 'file'
  );
  return filteredSources;
}
