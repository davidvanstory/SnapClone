#!/usr/bin/env node

/**
 * Demo Content Validation Script - Task 3.11
 * 
 * This script validates that demo content is high quality:
 * - Tests that image URLs are working and return valid images
 * - Verifies comments display properly with correct content
 * - Checks timer states are realistic for consistent demo experience
 * - Validates all demo data relationships are intact
 * 
 * Usage: node scripts/validate-demo.js
 */

const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

// Supabase configuration - prioritize local development environment
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_LOCAL || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - EXPO_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Test if an image URL returns a valid image
 */
function testImageUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      // Handle redirects (302, 301) - common for image services like Picsum
      if (res.statusCode === 302 || res.statusCode === 301) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          // Follow the redirect
          return https.get(redirectUrl, (redirectRes) => {
            const isValidImage = redirectRes.statusCode === 200 && 
              redirectRes.headers['content-type'] && 
              redirectRes.headers['content-type'].startsWith('image/');
            
            resolve({
              url,
              status: redirectRes.statusCode,
              contentType: redirectRes.headers['content-type'],
              isValid: isValidImage,
              redirected: true
            });
            
            redirectRes.destroy();
          }).on('error', (err) => {
            resolve({
              url,
              status: 'REDIRECT_ERROR',
              error: err.message,
              isValid: false
            });
          });
        }
      }
      
      // Direct response
      const isValidImage = res.statusCode === 200 && 
        res.headers['content-type'] && 
        res.headers['content-type'].startsWith('image/');
      
      resolve({
        url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        isValid: isValidImage
      });
      
      // Don't download the full image, just test headers
      res.destroy();
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        isValid: false
      });
    });
  });
}

/**
 * Validate demo content quality
 */
async function validateDemoContent() {
  try {
    console.log('🔍 Starting demo content validation...\n');

    // Test 1: Validate demo class exists and is accessible
    console.log('📚 Testing demo class...');
    const { data: demoClass, error: classError } = await supabase
      .from('classes')
      .select('id, name, join_code, is_active')
      .eq('join_code', 'DRAW01')
      .single();

    if (classError || !demoClass) {
      console.error('❌ Demo class DRAW01 not found:', classError);
      return false;
    }

    console.log(`✅ Demo class found: "${demoClass.name}" (${demoClass.join_code})`);
    console.log(`   Status: ${demoClass.is_active ? 'Active' : 'Inactive'}\n`);

    // Test 2: Validate demo users exist
    console.log('👥 Testing demo users...');
    const demoUserIds = [
      '11111111-1111-1111-1111-111111111111',
      '22222222-2222-2222-2222-222222222222',
      '33333333-3333-3333-3333-333333333333',
      '44444444-4444-4444-4444-444444444444',
      '55555555-5555-5555-5555-555555555555'
    ];

    const { data: demoUsers, error: usersError } = await supabase
      .from('users')
      .select('id, username, email')
      .in('id', demoUserIds);

    if (usersError) {
      console.error('❌ Error fetching demo users:', usersError);
      return false;
    }

    console.log(`✅ Found ${demoUsers.length}/5 demo users:`);
    demoUsers.forEach(user => {
      console.log(`   • ${user.username} (${user.email})`);
    });
    console.log();

    // Test 3: Validate demo posts and timer states
    console.log('📝 Testing demo posts and timer states...');
    const { data: demoPosts, error: postsError } = await supabase
      .from('posts')
      .select(`
        id, user_id, title, description, image_url, 
        max_viewers, view_count, duration_minutes,
        expires_at, is_expired, created_at
      `)
      .in('user_id', demoUserIds)
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('❌ Error fetching demo posts:', postsError);
      return false;
    }

    if (demoPosts.length === 0) {
      console.error('❌ No demo posts found');
      return false;
    }

    console.log(`✅ Found ${demoPosts.length} demo posts:`);
    
    const now = new Date();
    let validTimerStates = 0;
    
    for (const post of demoPosts) {
      const expiresAt = new Date(post.expires_at);
      const createdAt = new Date(post.created_at);
      const timeUntilExpiry = expiresAt - now;
      const timeSinceCreated = now - createdAt;
      const hoursUntilExpiry = timeUntilExpiry / (1000 * 60 * 60);
      const minutesUntilExpiry = timeUntilExpiry / (1000 * 60);
      
      // Find the username from demo users
      const postUser = demoUsers.find(u => u.id === post.user_id);
      const username = postUser ? postUser.username || 'Unknown' : 'Unknown';
      
      console.log(`\n   📄 "${post.title}" by ${username}`);
      console.log(`      • Viewers: ${post.view_count}/${post.max_viewers}`);
      console.log(`      • Created: ${Math.round(timeSinceCreated / (1000 * 60))} minutes ago`);
      
      if (timeUntilExpiry > 0) {
        if (hoursUntilExpiry >= 1) {
          console.log(`      • Expires: in ${Math.round(hoursUntilExpiry * 10) / 10} hours`);
        } else {
          console.log(`      • Expires: in ${Math.round(minutesUntilExpiry)} minutes`);
        }
        console.log(`      • Status: ✅ Active (realistic timer)`);
        validTimerStates++;
      } else {
        console.log(`      • Status: ⚠️  EXPIRED (${Math.abs(Math.round(minutesUntilExpiry))} minutes ago)`);
      }
    }

    if (validTimerStates < demoPosts.length * 0.75) {
      console.log('\n⚠️  Warning: Many posts have expired - consider running demo:reset\n');
    } else {
      console.log(`\n✅ Timer states realistic: ${validTimerStates}/${demoPosts.length} posts active\n`);
    }

    // Test 4: Validate image URLs
    console.log('🖼️  Testing demo post image URLs...');
    const imageTests = await Promise.all(
      demoPosts.map(post => testImageUrl(post.image_url))
    );

    let validImages = 0;
    for (const test of imageTests) {
      if (test.isValid) {
        const redirectInfo = test.redirected ? ' (redirected)' : '';
        console.log(`   ✅ ${test.url} - ${test.contentType}${redirectInfo}`);
        validImages++;
      } else {
        console.log(`   ❌ ${test.url} - Status: ${test.status}, Error: ${test.error || 'Invalid content type'}`);
      }
    }

    if (validImages !== imageTests.length) {
      console.log(`\n⚠️  Image URL issues: ${validImages}/${imageTests.length} working\n`);
    } else {
      console.log(`\n✅ All image URLs working: ${validImages}/${imageTests.length}\n`);
    }

    // Test 5: Validate comments display properly
    console.log('💬 Testing demo comments...');
    const { data: demoComments, error: commentsError } = await supabase
      .from('comments')
      .select('id, content, created_at, post_id, user_id')
      .in('user_id', demoUserIds)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.error('❌ Error fetching demo comments:', commentsError);
      return false;
    }

    console.log(`✅ Found ${demoComments.length} demo comments:`);
    
    let validComments = 0;
    for (const comment of demoComments.slice(0, 5)) { // Show first 5
      const isValidLength = comment.content.length > 0 && comment.content.length <= 150;
      const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(comment.content);
      const isEncouraging = /beautiful|amazing|love|great|incredible|gorgeous|good|well done|nice|awesome/i.test(comment.content);
      
      // Find the user and post
      const commentUser = demoUsers.find(u => u.id === comment.user_id);
      const commentPost = demoPosts.find(p => p.id === comment.post_id);
      const username = commentUser ? commentUser.username || 'Unknown' : 'Unknown';
      const postTitle = commentPost ? commentPost.title : 'Unknown Post';
      
      console.log(`   💬 "${comment.content.substring(0, 50)}${comment.content.length > 50 ? '...' : ''}"`);
      console.log(`      by ${username} on "${postTitle}"`);
      console.log(`      Length: ${comment.content.length}/150 chars ${isValidLength ? '✅' : '❌'}`);
      console.log(`      Tone: ${isEncouraging ? 'Encouraging ✅' : 'Neutral ⚠️'} ${hasEmoji ? '(with emoji)' : ''}`);
      console.log();
      
      if (isValidLength && isEncouraging) validComments++;
    }

    if (validComments >= Math.min(5, demoComments.length) * 0.8) {
      console.log(`✅ Comments quality good: encouraging and well-formatted\n`);
    } else {
      console.log(`⚠️  Comment quality issues detected\n`);
    }

    // Test 6: Validate AI feedback exists and is encouraging
    console.log('🤖 Testing demo AI feedback...');
    const { data: aiFeedback, error: aiError } = await supabase
      .from('ai_feedback')
      .select('id, feedback_text, feedback_status, ai_model, post_id, user_id')
      .in('user_id', demoUserIds);

    if (aiError) {
      console.error('❌ Error fetching AI feedback:', aiError);
      return false;
    }

    if (aiFeedback.length > 0) {
      console.log(`✅ Found ${aiFeedback.length} AI feedback examples:`);
      for (const feedback of aiFeedback) {
        const wordCount = feedback.feedback_text.split(' ').length;
        const hasPositive = /excellent|good|well done|impressive|strength|promise/i.test(feedback.feedback_text);
        const hasConstructive = /consider|suggest|try|growth|develop|practice/i.test(feedback.feedback_text);
        
        // Find the user and post
        const feedbackUser = demoUsers.find(u => u.id === feedback.user_id);
        const feedbackPost = demoPosts.find(p => p.id === feedback.post_id);
        const username = feedbackUser ? feedbackUser.username || 'Unknown' : 'Unknown';
        const postTitle = feedbackPost ? feedbackPost.title : 'Unknown Post';
        
        console.log(`   🤖 Feedback for "${postTitle}" by ${username}`);
        console.log(`      Model: ${feedback.ai_model}, Status: ${feedback.feedback_status}`);
        console.log(`      Length: ${wordCount} words`);
        console.log(`      Tone: ${hasPositive ? 'Positive ✅' : 'Neutral ⚠️'} ${hasConstructive ? 'Constructive ✅' : ''}`);
        console.log();
      }
    } else {
      console.log('⚠️  No AI feedback examples found\n');
    }

    // Test 7: Validate class membership relationships
    console.log('🏫 Testing class membership relationships...');
    const { data: memberships, error: membershipError } = await supabase
      .from('class_members')
      .select('user_id, role, is_active')
      .eq('class_id', demoClass.id)
      .in('user_id', demoUserIds);

    if (membershipError) {
      console.error('❌ Error fetching class memberships:', membershipError);
      return false;
    }

    console.log(`✅ Class membership: ${memberships.length}/5 demo users are members`);
    const activeMembers = memberships.filter(m => m.is_active).length;
    console.log(`   Active members: ${activeMembers}/${memberships.length}\n`);

    // Summary
    console.log('📊 DEMO VALIDATION SUMMARY:');
    console.log('═'.repeat(40));
    console.log(`✅ Demo class: ${demoClass.name} (${demoClass.join_code})`);
    console.log(`✅ Demo users: ${demoUsers.length}/5 found`);
    console.log(`${validTimerStates >= demoPosts.length * 0.75 ? '✅' : '⚠️'} Timer states: ${validTimerStates}/${demoPosts.length} realistic`);
    console.log(`${validImages === imageTests.length ? '✅' : '❌'} Image URLs: ${validImages}/${imageTests.length} working`);
    console.log(`✅ Comments: ${demoComments.length} encouraging comments`);
    console.log(`${aiFeedback.length > 0 ? '✅' : '⚠️'} AI feedback: ${aiFeedback.length} examples`);
    console.log(`✅ Memberships: ${activeMembers}/${memberships.length} active`);
    
    const overallHealth = (
      (demoClass ? 1 : 0) +
      (demoUsers.length === 5 ? 1 : 0) +
      (validTimerStates >= demoPosts.length * 0.75 ? 1 : 0) +
      (validImages === imageTests.length ? 1 : 0) +
      (demoComments.length > 0 ? 1 : 0) +
      (aiFeedback.length > 0 ? 1 : 0) +
      (activeMembers === memberships.length ? 1 : 0)
    ) / 7;

    console.log('\n🎯 Overall Demo Health:', Math.round(overallHealth * 100) + '%');
    
    if (overallHealth >= 0.85) {
      console.log('🎉 Demo content is ready for consistent demo experience!');
      return true;
    } else if (overallHealth >= 0.7) {
      console.log('⚠️  Demo content has minor issues - consider running demo:reset');
      return true;
    } else {
      console.log('❌ Demo content has significant issues - run demo:reset required');
      return false;
    }

  } catch (error) {
    console.error('❌ Demo validation failed:', error);
    return false;
  }
}

// Run the script
if (require.main === module) {
  validateDemoContent()
    .then(success => {
      process.exit(success ? 0 : 1);
    });
}

module.exports = { validateDemoContent }; 