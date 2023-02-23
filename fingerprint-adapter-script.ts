#!/usr/bin/env ./node_modules/.bin/ts-node

/**
 * This is a (temporary) way to incorporate the new, node-based solution, into existing shell scripts.
 */

import { createCustomFingerprintAsync } from './libs/workspace-utils/expo-fingerprint/src/index';

createCustomFingerprintAsync('apps/repro-app-ts-config-files').then((hash) => {
  console.log(hash); // this is similar to echo, and can be read by bash fns
});

// import { createCustomProjectHashAsync } from './libs/workspace-utils/expo-fingerprint/src/index';

// createCustomProjectHashAsync('apps/repro-app-ts-config-files').then((hash) => {
//   console.log(hash); // this is similar to echo, and can be read by bash fns
// });
