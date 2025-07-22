# npm-run-if

> 🧠 A tiny CLI tool to conditionally run npm scripts or shell commands based on environment variables, file existence, and more.

---

## 🕉 Why?

Sometimes you want to run a script **only if** certain conditions are met, for example:

- ✅ Run `npm run build` **only if** `NODE_ENV=production`
- ✅ Run tests **only if** certain files exist
- ✅ Skip steps in dry-run mode
- ✅ Show a fallback message if preconditions fail

*makes this super easy with a simple, zero-config CLI.*

---

## ✨ Features

- ✅ Run any command only if conditions are met
- 🌍 Works cross-platform (macOS, Linux, Windows)
- ⚡ Blazing fast and dependency-light
- 🧪 Dry-run support to preview what would be run
- 🧵 Easily chain with npm/yarn scripts or CI pipelines

---

## 🚀 Installation

Install globally:

```bash
npm install -g npm-run-if
```

Or use with `npx`:

```bash
npx npm-run-if --help
```

---

## 📆 Usage

```bash
npm-run-if [options]
```

| Option          | Description                              | Example                            |
| --------------- | ---------------------------------------- | ---------------------------------- |
| `--env`         | Require environment variable match       | `--env NODE_ENV=production`        |
| `--not-env`     | Require env **not** to match             | `--not-env DEBUG=true`             |
| `--require-env` | Require env var to be set (non-empty)    | `--require-env GITHUB_TOKEN`       |
| `--exists`      | Require file(s)/glob to exist            | `--exists src/*.ts`                |
| `--not-exists`  | Require file(s)/glob **not** to exist    | `--not-exists dist/bundle.js`      |
| `--run`         | The command to run (required)            | `--run "npm run build"`            |
| `--else-run`    | Fallback command if conditions fail      | `--else-run "echo Skipping..."`    |
| `--dry-run`     | Preview what would be run                | `--dry-run`                        |
| `--help`        | Show help output                         | `--help`                           |

---

## 🧪 Examples

### ✅ Run build only if `NODE_ENV=production`

```bash
npm-run-if --env NODE_ENV=production --run "npm run build"
```

### 🧵 Fallback message if condition fails

```bash
npm-run-if --exists src/index.ts --run "npm run build" --else-run "echo Skipping build"
```

### 🚫 Run only if a file does **not** exist

```bash
npm-run-if --not-exists dist/index.js --run "npm run build"
```

### 🔍 Show what would run (dry-run)

```bash
npm-run-if --env DEBUG=true --run "npm test" --dry-run
```

---

## 🔧 How it works

1. Parses CLI arguments (`--env`, `--exists`, etc.)
2. Evaluates all conditions:
   - Matches env vars and patterns
   - Checks file existence (globs supported)
   - Executes shell checks (optional)
3. If **all pass**, runs your command via `child_process.execSync`
4. If `--dry-run`, it simply prints what would happen

---

## 📄 License

MIT - hxpe-dev

---

## 💡 Ideas & Contributions

Want to contribute a new condition type (e.g. port check, changed files, config-based conditions)? PRs and issues are welcome!

---

Created with ❤️ by [hxpe](https://github.com/hxpe-dev)

