#!/usr/bin/env node
const { spawnSync } = require('node:child_process');

const args = process.argv.slice(2);
const isTest = args[0] === 'test';

if (isTest) {
  const result = spawnSync('npm', ['run', 'test', '--', ...args.slice(1)], {
    stdio: 'inherit',
    shell: true,
  });
  process.exit(result.status ?? 1);
}

const result = spawnSync('vite', args, {
  stdio: 'inherit',
  shell: true,
});
process.exit(result.status ?? 1);
