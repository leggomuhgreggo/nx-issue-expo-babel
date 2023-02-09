# NxReproWorkspace

## Repro Notes

### Basic Monorepo Example

#### command

```
npx @expo/fingerprint apps/repro-app > fingerprint-repro-app.json
```

The issue to highlight here is the package.json.

A common technique with RN monorepos is to use the [asterisk version](https://www.linkedin.com/pulse/things-i-have-learned-while-maintaining-javascript-monorepo-gorej/) hack, illustrated in the [linked example](https://docs.expo.dev/guides/monorepos/#using-the-package) from from expo + monorepo docs.

This usage is not currently supported by the `@expo/fingerprint` package.

### Local Config Plugin Example

#### command

```
npx @expo/fingerprint apps/repro-app-local-config-plugins > fingerprint-repro-app-local-config-plugins.json
```

Following the "Importing Plugins" [example](https://docs.expo.dev/guides/config-plugins/#importing-plugins) from the expo config plugin docs, this case has a "local" config plugin, defined in the project root.

This causes some undesirable behavior from the fingerprinting utility.

### TS App Config Example

#### command

```
npx @expo/fingerprint apps/repro-app-ts-config-files > fingerprint-repro-app-ts-config-files.json
```

Following the app config [example](https://docs.expo.dev/guides/typescript/#appconfigjs) in the expo + typescript docs, this case converts the `app.json` to `app.config.ts`

It turns out that this issue was another side effect of the local config plugin case.

### Workspace Example

Figured I'd include this for reference

#### command

```
npx @expo/fingerprint . > fingerprint-workspace.json
```
