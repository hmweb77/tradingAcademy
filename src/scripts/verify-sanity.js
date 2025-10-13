// Run this script to verify your Sanity setup
// Usage: node scripts/verify-sanity.js

require('dotenv').config({ path: '.env.local' })

const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN',
]

console.log('🔍 Verifying Sanity Configuration...\n')

let hasErrors = false

// Check environment variables
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName]
  if (!value) {
    console.log(`❌ Missing: ${varName}`)
    hasErrors = true
  } else {
    console.log(`✅ Found: ${varName}`)
    // Show first 10 chars for security
    console.log(`   Value: ${value.substring(0, 10)}...`)
  }
})

console.log('\n📋 Summary:')
if (hasErrors) {
  console.log('❌ Configuration incomplete. Please check your .env.local file.')
  console.log('\nMake sure you have:')
  console.log('1. Created a Sanity project at https://www.sanity.io/')
  console.log('2. Added the Project ID to .env.local')
  console.log('3. Created an API token with Editor permissions')
  console.log('4. Added the token to .env.local')
  process.exit(1)
} else {
  console.log('✅ All environment variables configured!')
  console.log('\nNext steps:')
  console.log('1. Run: npm run dev')
  console.log('2. Visit: http://localhost:3000/studio')
  console.log('3. Log in and start adding content!')
}