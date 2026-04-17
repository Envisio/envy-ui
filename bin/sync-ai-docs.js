#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {
    force: false,
    check: false,
    dryRun: false,
    bundle: 'envy-ui-v1',
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--force') {
      args.force = true;
      continue;
    }
    if (arg === '--check') {
      args.check = true;
      continue;
    }
    if (arg === '--dry-run') {
      args.dryRun = true;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      args.help = true;
      continue;
    }
    if (arg === '--bundle') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('--bundle requires a value');
      }
      args.bundle = value;
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function printHelp() {
  console.log('Sync Envy UI AI docs into the current application repository.');
  console.log('');
  console.log('Usage: envy-ui-sync-ai-docs [options]');
  console.log('');
  console.log('Options:');
  console.log('  --bundle <name>   Bundle name under ai/ (default: envy-ui-v1)');
  console.log('  --check           Validate destination files only (no writes)');
  console.log('  --force           Overwrite destination files when content differs');
  console.log('  --dry-run         Print planned actions without writing');
  console.log('  -h, --help        Show this help');
}

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (_) {
    return false;
  }
}

function isWithin(basePath, targetPath) {
  const relative = path.relative(basePath, targetPath);
  return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function copyFileContent(sourcePath, destinationPath) {
  const sourceData = fs.readFileSync(sourcePath);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.writeFileSync(destinationPath, sourceData);
}

function formatTarget(target) {
  return `${target.source} -> ${target.destination}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  if (args.check && args.force) {
    throw new Error('Cannot use --check and --force together');
  }

  const packageRoot = path.resolve(__dirname, '..');
  const bundleRoot = path.join(packageRoot, 'ai', args.bundle);
  const manifestPath = path.join(bundleRoot, 'manifest.json');

  if (!fileExists(manifestPath)) {
    throw new Error(`Bundle manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const targets = Array.isArray(manifest.targets) ? manifest.targets : [];
  if (!targets.length) {
    throw new Error(`No targets found in manifest: ${manifestPath}`);
  }

  const appRoot = process.cwd();
  const stats = {
    created: 0,
    updated: 0,
    unchanged: 0,
    skipped: 0,
    missing: 0,
    outdated: 0,
  };
  const problems = [];

  console.log(`Bundle: ${manifest.bundleName || args.bundle}`);
  console.log(`Mode: ${args.check ? 'check' : args.dryRun ? 'dry-run' : 'sync'}`);
  console.log(`App root: ${appRoot}`);
  console.log('');

  for (const target of targets) {
    const sourcePath = path.resolve(bundleRoot, target.source);
    const destinationPath = path.resolve(appRoot, target.destination);

    if (!fileExists(sourcePath)) {
      throw new Error(`Source file not found: ${sourcePath}`);
    }

    if (!isWithin(appRoot, destinationPath)) {
      throw new Error(`Destination escapes current repository root: ${destinationPath}`);
    }

    const sourceData = fs.readFileSync(sourcePath);
    const destinationExists = fileExists(destinationPath);

    if (!destinationExists) {
      if (args.check) {
        stats.missing += 1;
        problems.push(`Missing: ${target.destination}`);
        continue;
      }

      if (args.dryRun) {
        console.log(`CREATE ${formatTarget(target)}`);
      } else {
        copyFileContent(sourcePath, destinationPath);
        console.log(`CREATE ${formatTarget(target)}`);
      }
      stats.created += 1;
      continue;
    }

    const destinationData = fs.readFileSync(destinationPath);
    const sameContent = Buffer.compare(sourceData, destinationData) === 0;

    if (sameContent) {
      stats.unchanged += 1;
      continue;
    }

    if (args.check) {
      stats.outdated += 1;
      problems.push(`Outdated: ${target.destination}`);
      continue;
    }

    if (args.force) {
      if (args.dryRun) {
        console.log(`UPDATE ${formatTarget(target)}`);
      } else {
        copyFileContent(sourcePath, destinationPath);
        console.log(`UPDATE ${formatTarget(target)}`);
      }
      stats.updated += 1;
      continue;
    }

    stats.skipped += 1;
    console.log(`SKIP   ${formatTarget(target)} (destination exists; use --force to overwrite)`);
  }

  console.log('');
  console.log(
    `Summary: created=${stats.created}, updated=${stats.updated}, unchanged=${stats.unchanged}, skipped=${stats.skipped}, missing=${stats.missing}, outdated=${stats.outdated}`
  );

  if (args.check && problems.length) {
    console.log('');
    for (const problem of problems) {
      console.log(problem);
    }
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
