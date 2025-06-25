#!/usr/bin/env node
/**
 * Migration Management Script
 * 
 * This script helps apply database migrations to both local and cloud Supabase environments
 * Usage: node scripts/migrate-both.js [command]
 * 
 * Commands:
 * - reset-local: Reset local database with migrations
 * - push-cloud: Push migrations to cloud environment
 * - reset-both: Reset both local and cloud databases
 * - status: Check migration status on both environments
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = colors.white) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command, description) {
  log(`\n🔄 ${description}...`, colors.cyan);
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, colors.red);
    console.error(error.message);
    return false;
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${question}${colors.reset}`, (answer) => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

async function resetLocal() {
  log('\n🏠 Resetting Local Supabase Database', colors.bright);
  
  const success = execCommand(
    'supabase db reset --local',
    'Reset local database with migrations'
  );
  
  if (success) {
    log('📊 Local database is now up to date with all migrations', colors.green);
  }
  
  return success;
}

async function pushToCloud() {
  log('\n☁️ Pushing Migrations to Cloud', colors.bright);
  
  const answer = await askQuestion(
    'This will apply migrations to your PRODUCTION cloud database. Are you sure? (yes/no): '
  );
  
  if (answer !== 'yes' && answer !== 'y') {
    log('❌ Cloud migration cancelled by user', colors.yellow);
    return false;
  }
  
  const success = execCommand(
    'supabase db push --linked',
    'Push migrations to cloud database'
  );
  
  if (success) {
    log('📊 Cloud database is now up to date with all migrations', colors.green);
  }
  
  return success;
}

async function checkStatus() {
  log('\n📊 Checking Migration Status', colors.bright);
  
  log('\n🏠 Local Database Status:', colors.cyan);
  execCommand(
    'supabase migration list --local',
    'Check local migration status'
  );
  
  log('\n☁️ Cloud Database Status:', colors.cyan);
  execCommand(
    'supabase migration list --linked',
    'Check cloud migration status'
  );
}

async function resetBoth() {
  log('\n🔄 Resetting Both Local and Cloud Databases', colors.bright);
  
  const answer = await askQuestion(
    '⚠️  WARNING: This will reset BOTH local AND cloud databases. All data will be lost! Continue? (yes/no): '
  );
  
  if (answer !== 'yes' && answer !== 'y') {
    log('❌ Operation cancelled by user', colors.yellow);
    return false;
  }
  
  // Reset local first
  const localSuccess = await resetLocal();
  
  if (localSuccess) {
    // Then push to cloud
    const cloudSuccess = await pushToCloud();
    
    if (cloudSuccess) {
      log('\n🎉 Both databases have been reset and synchronized!', colors.green);
      return true;
    }
  }
  
  return false;
}

async function main() {
  const command = process.argv[2];
  
  log('🗄️ Database Migration Manager', colors.bright);
  log('================================', colors.bright);
  
  switch (command) {
    case 'reset-local':
      await resetLocal();
      break;
      
    case 'push-cloud':
      await pushToCloud();
      break;
      
    case 'reset-both':
      await resetBoth();
      break;
      
    case 'status':
      await checkStatus();
      break;
      
    default:
      log('\nUsage: node scripts/migrate-both.js [command]', colors.yellow);
      log('\nAvailable commands:', colors.white);
      log('  reset-local  - Reset local database with migrations', colors.cyan);
      log('  push-cloud   - Push migrations to cloud environment', colors.cyan);
      log('  reset-both   - Reset both local and cloud databases', colors.cyan);
      log('  status       - Check migration status on both environments', colors.cyan);
      log('\nExamples:', colors.white);
      log('  node scripts/migrate-both.js reset-local', colors.gray);
      log('  node scripts/migrate-both.js status', colors.gray);
      break;
  }
  
  rl.close();
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n\n👋 Migration manager interrupted', colors.yellow);
  rl.close();
  process.exit(0);
});

main().catch((error) => {
  log(`\n❌ Migration manager error: ${error.message}`, colors.red);
  rl.close();
  process.exit(1);
}); 