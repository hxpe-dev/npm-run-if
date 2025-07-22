#!/usr/bin/env node
import minimist from 'minimist'
import { runIf } from '../lib/index.js'

const args = minimist(process.argv.slice(2))

runIf(args).catch(err => {
  console.error('[npm-run-if] Error:', err.message)
  process.exit(1)
})
