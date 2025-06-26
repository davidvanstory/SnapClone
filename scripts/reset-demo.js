#!/usr/bin/env node

/**
 * Demo Data Reset Script - Task 3.12
 * 
 * This script resets demo data with fresh timestamps to ensure consistent 
 * demo experience across multiple sessions. It deletes existing demo posts 
 * and recreates them with relative timestamps from NOW().
 * 
 * Usage: node scripts/reset-demo.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration - prioritize local development environment
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_LOCAL || process.env.SUPABASE_SERVICE_ROLE_KEY; // Needs service role for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - EXPO_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Reset demo data with fresh timestamps
 */
async function resetDemoData() {
  try {
    console.log('🔄 Starting demo data reset...');
    
    // Demo user IDs
    const demoUsers = {
      maya: '11111111-1111-1111-1111-111111111111',
      jordan: '22222222-2222-2222-2222-222222222222', 
      sam: '33333333-3333-3333-3333-333333333333',
      casey: '44444444-4444-4444-4444-444444444444',
      riley: '55555555-5555-5555-5555-555555555555'
    };

    // Get demo class ID
    const { data: demoClass, error: classError } = await supabase
      .from('classes')
      .select('id')
      .eq('join_code', 'DRAW01')
      .single();

    if (classError || !demoClass) {
      console.error('❌ Demo class DRAW01 not found:', classError);
      process.exit(1);
    }

    console.log('✅ Found demo class:', demoClass.id);

    // Fix demo user usernames first (they may be NULL from migration conflicts)
    console.log('👤 Updating demo user usernames...');
    const userUpdates = [
      { id: demoUsers.maya, username: 'maya_sketches' },
      { id: demoUsers.jordan, username: 'jordan_art' },
      { id: demoUsers.sam, username: 'sam_draws' },
      { id: demoUsers.casey, username: 'casey_creates' },
      { id: demoUsers.riley, username: 'riley_paints' }
    ];

    for (const update of userUpdates) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ username: update.username })
        .eq('id', update.id);
      
      if (updateError) {
        console.error(`❌ Error updating username for ${update.username}:`, updateError);
      } else {
        console.log(`✅ Updated username: ${update.username}`);
      }
    }

    // Delete existing demo posts and related data
    console.log('🗑️  Deleting existing demo posts...');
    
    // Delete AI feedback for demo posts
    await supabase
      .from('ai_feedback')
      .delete()
      .in('user_id', Object.values(demoUsers));

    // Delete comments from demo posts
    await supabase
      .from('comments')
      .delete() 
      .in('user_id', Object.values(demoUsers));

    // Delete post views for demo posts
    await supabase
      .from('post_views')
      .delete()
      .in('user_id', Object.values(demoUsers));

    // Delete demo posts
    await supabase
      .from('posts')
      .delete()
      .in('user_id', Object.values(demoUsers));

    console.log('✅ Deleted existing demo data');

    // Calculate fresh timestamps relative to NOW
    const now = new Date();
    const formatInterval = (minutes) => {
      const future = new Date(now.getTime() + minutes * 60000);
      return future.toISOString();
    };

    const formatPast = (minutes) => {
      const past = new Date(now.getTime() - minutes * 60000);
      return past.toISOString();
    };

    // Recreate demo posts with fresh timestamps
    console.log('📝 Creating fresh demo posts...');

    const demoPosts = [
      {
        id: '10000000-0000-0000-0000-000000000001',
        user_id: demoUsers.maya,
        class_id: demoClass.id,
        image_url: 'https://picsum.photos/800/600?random=maya1',
        image_path: 'demo/maya_charcoal_portrait.jpg',
        frame_style: 'classic',
        title: 'Charcoal Portrait Study',
        description: 'Working on capturing light and shadow in this self-portrait. Still learning!',
        max_viewers: 5,
        view_count: 3,
        duration_minutes: 60,
        expires_at: formatInterval(45), // Expires in 45 minutes
        is_expired: false,
        created_at: formatPast(15), // Created 15 minutes ago
        updated_at: formatPast(15)
      },
      {
        id: '10000000-0000-0000-0000-000000000002',
        user_id: demoUsers.jordan,
        class_id: demoClass.id,
        image_url: 'https://picsum.photos/800/600?random=jordan1',
        image_path: 'demo/jordan_watercolor_landscape.jpg',
        frame_style: 'modern',
        title: 'Watercolor Landscape',
        description: 'First attempt at wet-on-wet technique. The colors bled more than expected but I like it!',
        max_viewers: 4,
        view_count: 2,
        duration_minutes: 180,
        expires_at: formatInterval(140), // Expires in 2h 20m
        is_expired: false,
        created_at: formatPast(40), // Created 40 minutes ago
        updated_at: formatPast(40)
      },
      {
        id: '10000000-0000-0000-0000-000000000003', 
        user_id: demoUsers.sam,
        class_id: demoClass.id,
        image_url: 'https://picsum.photos/800/600?random=sam1',
        image_path: 'demo/sam_pencil_study.jpg',
        frame_style: null,
        title: 'Pencil Study - Hands',
        description: 'Practiced drawing hands today. They are so difficult but getting better!',
        max_viewers: 5,
        view_count: 5,
        duration_minutes: 30,
        expires_at: formatInterval(18), // Expires in 18 minutes
        is_expired: false,
        created_at: formatPast(12), // Created 12 minutes ago
        updated_at: formatPast(12)
      },
      {
        id: '10000000-0000-0000-0000-000000000004',
        user_id: demoUsers.casey,
        class_id: demoClass.id,
        image_url: 'https://picsum.photos/800/600?random=casey1',
        image_path: 'demo/casey_digital_sketch.jpg',
        frame_style: 'vintage',
        title: 'Digital Character Sketch',
        description: 'Exploring digital art for the first time. Really enjoying the undo button! 😊',
        max_viewers: 3,
        view_count: 1,
        duration_minutes: 1440, // 24 hours
        expires_at: formatInterval(1425), // Expires in 23h 45m
        is_expired: false,
        created_at: formatPast(15), // Created 15 minutes ago
        updated_at: formatPast(15)
      }
    ];

    // Insert fresh posts
    const { error: postsError } = await supabase
      .from('posts')
      .insert(demoPosts);

    if (postsError) {
      console.error('❌ Error creating demo posts:', postsError);
      process.exit(1);
    }

    console.log('✅ Created fresh demo posts');

    // Recreate post views with fresh timestamps
    console.log('👀 Adding demo post views...');
    
    const demoViews = [
      // Maya's post viewers
      { post_id: demoPosts[0].id, user_id: demoUsers.jordan, viewed_at: formatPast(10) },
      { post_id: demoPosts[0].id, user_id: demoUsers.sam, viewed_at: formatPast(8) },
      { post_id: demoPosts[0].id, user_id: demoUsers.casey, viewed_at: formatPast(5) },
      
      // Jordan's post viewers
      { post_id: demoPosts[1].id, user_id: demoUsers.maya, viewed_at: formatPast(35) },
      { post_id: demoPosts[1].id, user_id: demoUsers.sam, viewed_at: formatPast(20) },
      
      // Sam's post viewers (max reached)
      { post_id: demoPosts[2].id, user_id: demoUsers.maya, viewed_at: formatPast(10) },
      { post_id: demoPosts[2].id, user_id: demoUsers.jordan, viewed_at: formatPast(8) },
      { post_id: demoPosts[2].id, user_id: demoUsers.casey, viewed_at: formatPast(6) },
      { post_id: demoPosts[2].id, user_id: demoUsers.riley, viewed_at: formatPast(4) },
      
      // Casey's post viewer
      { post_id: demoPosts[3].id, user_id: demoUsers.riley, viewed_at: formatPast(12) }
    ];

    const { error: viewsError } = await supabase
      .from('post_views')
      .insert(demoViews);

    if (viewsError) {
      console.error('❌ Error creating demo views:', viewsError);
      process.exit(1);
    }

    console.log('✅ Added demo post views');

    // Recreate encouraging comments with fresh timestamps
    console.log('💬 Adding demo comments...');
    
    const demoComments = [
      // Comments on Maya's post
      { post_id: demoPosts[0].id, user_id: demoUsers.jordan, content: 'Wow, the shading on the cheekbone is really well done! You captured the light beautifully.', created_at: formatPast(8), updated_at: formatPast(8) },
      { post_id: demoPosts[0].id, user_id: demoUsers.sam, content: 'I love how you used the charcoal texture to show depth. The contrast is striking!', created_at: formatPast(6), updated_at: formatPast(6) },
      { post_id: demoPosts[0].id, user_id: demoUsers.casey, content: 'This is incredible! The way you rendered the hair texture is so realistic. Goals! ✨', created_at: formatPast(3), updated_at: formatPast(3) },
      
      // Comments on Jordan's post
      { post_id: demoPosts[1].id, user_id: demoUsers.maya, content: 'The color blending in the sky is absolutely gorgeous! Sometimes happy accidents make the best art.', created_at: formatPast(30), updated_at: formatPast(30) },
      { post_id: demoPosts[1].id, user_id: demoUsers.sam, content: 'I can feel the atmosphere in this piece. The wet-on-wet technique gives it such a dreamy quality.', created_at: formatPast(18), updated_at: formatPast(18) },
      
      // Comments on Sam's post  
      { post_id: demoPosts[2].id, user_id: demoUsers.maya, content: 'Hands are so challenging but you nailed the proportions! The gesture feels very natural.', created_at: formatPast(8), updated_at: formatPast(8) },
      { post_id: demoPosts[2].id, user_id: demoUsers.jordan, content: 'The way you captured the knuckle details is amazing. I struggle with hands so much!', created_at: formatPast(6), updated_at: formatPast(6) },
      { post_id: demoPosts[2].id, user_id: demoUsers.casey, content: 'Such clean linework! You can really see your improvement from practice. Keep it up! 👏', created_at: formatPast(4), updated_at: formatPast(4) },
      { post_id: demoPosts[2].id, user_id: demoUsers.riley, content: 'The anatomy looks spot on. This gives me motivation to practice hands more!', created_at: formatPast(2), updated_at: formatPast(2) },
      
      // Comments on Casey's post
      { post_id: demoPosts[3].id, user_id: demoUsers.riley, content: 'Love seeing you explore digital! The character design has so much personality. 🎨', created_at: formatPast(10), updated_at: formatPast(10) }
    ];

    const { error: commentsError } = await supabase
      .from('comments')
      .insert(demoComments);

    if (commentsError) {
      console.error('❌ Error creating demo comments:', commentsError);
      process.exit(1);
    }

    console.log('✅ Added demo comments');

    // Recreate AI feedback with fresh timestamps
    console.log('🤖 Adding demo AI feedback...');
    
    const demoAIFeedback = [
      {
        post_id: demoPosts[0].id,
        user_id: demoUsers.maya,
        feedback_text: `Your charcoal portrait demonstrates excellent understanding of light and shadow. The contrast you've achieved creates strong dimensionality, particularly in the facial structure. The way you've handled the transition from light to shadow on the cheekbone shows developing technical skill.

Areas of strength:
• Strong tonal range from deep blacks to subtle grays
• Good proportional accuracy in facial features  
• Effective use of charcoal texture to suggest surface quality

For continued growth, consider:
• Experimenting with softer edges in some shadow transitions
• Adding more subtle mid-tones to enhance roundness
• Exploring how reflected light affects shadow areas

This piece shows real promise and dedication to observational drawing. Keep practicing with direct observation!`,
        feedback_status: 'completed',
        processing_time_ms: 2847,
        ai_model: 'gpt-4v',
        created_at: formatPast(5),
        updated_at: formatPast(5)
      },
      {
        post_id: demoPosts[2].id,
        user_id: demoUsers.sam,
        feedback_text: `This hand study shows impressive attention to anatomical accuracy and proportional relationships. Drawing hands is one of the most challenging subjects, and you've approached it with clear observation and patience.

Strengths in this piece:
• Accurate finger proportions and joint placement
• Good understanding of how tendons affect surface form
• Clean, confident line quality that suggests three-dimensional form
• Proper scale relationships between palm and fingers

Suggestions for development:
• Consider adding subtle shading to enhance volume
• Study how hands change when viewed from different angles
• Practice gesture drawings to capture hand movement and expression

Your improvement through practice is evident. Hands become much easier with continued observation - you're on the right track!`,
        feedback_status: 'completed',
        processing_time_ms: 3156,
        ai_model: 'gpt-4v',
        created_at: formatPast(3),
        updated_at: formatPast(3)
      }
    ];

    const { error: aiFeedbackError } = await supabase
      .from('ai_feedback')
      .insert(demoAIFeedback);

    if (aiFeedbackError) {
      console.error('❌ Error creating demo AI feedback:', aiFeedbackError);
      process.exit(1);
    }

    console.log('✅ Added demo AI feedback');

    // Summary
    console.log('\n🎉 Demo data reset complete!');
    console.log('📊 Fresh content created:');
    console.log(`   • 4 artwork posts with realistic expiration times`);
    console.log(`   • ${demoViews.length} post views with engagement`);
    console.log(`   • ${demoComments.length} encouraging comments`);
    console.log(`   • ${demoAIFeedback.length} AI feedback examples`);
    console.log('\n⏰ Timer states:');
    console.log('   • Maya: Expires in 45 minutes (3/5 viewers)');
    console.log('   • Jordan: Expires in 2h 20m (2/4 viewers)');
    console.log('   • Sam: Expires in 18 minutes (5/5 viewers - max reached)'); 
    console.log('   • Casey: Expires in 23h 45m (1/3 viewers)');
    console.log('\n✨ Demo is ready for consistent multi-session testing!');

  } catch (error) {
    console.error('❌ Demo reset failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  resetDemoData();
}

module.exports = { resetDemoData }; 