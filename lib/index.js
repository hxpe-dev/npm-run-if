import { globby } from "globby";
import { execSync } from "node:child_process";
import "dotenv/config";

export async function runIf(args) {
  if (args.help || args.h) {
    console.log(`
      npm-run-if [options]

      Options:
        --env KEY=VALUE         Run only if environment variable matches
        --not-env KEY=VALUE     Run only if environment variable does NOT match
        --exists <glob>         Run only if file(s) matching glob exist
        --not-exists <glob>     Run only if file(s) matching glob DO NOT exist
        --run "<command>"       The command to run if all conditions pass
        --dry-run               Show what would be run without executing
        --help                  Show this help message
    `);
    process.exit(0);
  }

  const shouldRun = await checkConditions(args);
  const dry = args["dry-run"];
  const command = args.run;

  if (!command) {
    throw new Error("Missing --run <command>");
  }

  if (shouldRun) {
    runCommand(command, dry);
  } else if (args["else-run"]) {
    runCommand(args["else-run"], dry);
  } else if (dry) {
    console.log(`[dry-run] Skipping command: ${command}`);
  }
}

const runCommand = (cmd, dry) => {
  if (dry) {
    console.log(`[dry-run] Would run: ${cmd}`);
  } else {
    execSync(cmd, { stdio: "inherit", shell: true });
  }
};

async function checkConditions(args) {
  const envs = Array.isArray(args.env) ? args.env : args.env ? [args.env] : [];
  const notEnvs = Array.isArray(args["not-env"])
    ? args["not-env"]
    : args["not-env"]
    ? [args["not-env"]]
    : [];
  const exists = Array.isArray(args.exists)
    ? args.exists
    : args.exists
    ? [args.exists]
    : [];
  const notExists = Array.isArray(args["not-exists"])
    ? args["not-exists"]
    : args["not-exists"]
    ? [args["not-exists"]]
    : [];
  const requiredEnv = Array.isArray(args["require-env"])
    ? args["require-env"]
    : args["require-env"]
    ? [args["require-env"]]
    : [];

  // Check env
  for (const pair of envs) {
    const [key, val] = pair.split("=");
    if (process.env[key] !== val) return false;
  }

  // Check not-env
  for (const pair of notEnvs) {
    const [key, val] = pair.split("=");
    if (process.env[key] === val) return false;
  }

  // Check file exists
  for (const pattern of exists) {
    const matched = await globby(pattern);
    if (matched.length === 0) return false;
  }

  // Check file does not exist
  for (const pattern of notExists) {
    const matched = await globby(pattern);
    if (matched.length > 0) return false;
  }

  // Check env var exists
  for (const key of requiredEnv) {
    if (!(key in process.env)) return false
  }

  return true;
}
