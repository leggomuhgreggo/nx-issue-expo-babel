import { createHash } from 'crypto';
import type { FingerprintSource, HashSource } from '@expo/fingerprint';

/**
 * Creates Hash From Array of "sources"
 *
 * Note: adapted from @expo/fingerprint
 * @see: https://github.com/expo/expo/blob/main/packages/@expo/fingerprint/src/hash/Hash.ts
 */

export function hashAllSources(fingerprintSources: FingerprintSource[]) {
  const hasher = createHash('sha1');
  for (const source of fingerprintSources) {
    if (source.hash != null) {
      hasher.update(createSourceId(source));
      hasher.update(source.hash);
    }
  }
  const hash = hasher.digest('hex');

  return hash;
}

function createSourceId(source: HashSource): string {
  switch (source.type) {
    case 'contents':
      return source.id;
    case 'file':
      return source.filePath;
    case 'dir':
      return source.filePath;
    default:
      throw new Error('Unsupported source type');
  }
}
