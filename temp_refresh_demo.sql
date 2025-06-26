-- Demo data refresh - Generated at 2025-06-26T18:32:38.493Z
-- This script deletes existing demo data and recreates it with fresh timestamps

-- Begin transaction for atomic refresh
BEGIN;

-- Log refresh start
DO $$ BEGIN RAISE NOTICE 'Starting demo data refresh at %', NOW(); END $$;

-- Delete existing demo data in correct order (respecting foreign keys)
DELETE FROM public.ai_feedback WHERE post_id IN (
  SELECT id FROM public.posts WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222', 
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555'
  )
);

DELETE FROM public.comments WHERE post_id IN (
  SELECT id FROM public.posts WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333', 
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555'
  )
);

DELETE FROM public.post_views WHERE post_id IN (
  SELECT id FROM public.posts WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444', 
    '55555555-5555-5555-5555-555555555555'
  )
);

DELETE FROM public.posts WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

DELETE FROM public.class_members WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

-- Note: Keep demo users in auth.users and public.users for consistency

-- Recreate demo data with fresh timestamps
DO $$
DECLARE
  demo_class_id UUID;
  maya_id UUID := '11111111-1111-1111-1111-111111111111';
  jordan_id UUID := '22222222-2222-2222-2222-222222222222';
  sam_id UUID := '33333333-3333-3333-3333-333333333333';
  casey_id UUID := '44444444-4444-4444-4444-444444444444';
  riley_id UUID := '55555555-5555-5555-5555-555555555555';
  
  -- Post IDs for consistent references
  maya_post_id UUID := '10000000-0000-0000-0000-000000000001';
  jordan_post_id UUID := '10000000-0000-0000-0000-000000000002';
  sam_post_id UUID := '10000000-0000-0000-0000-000000000003';
  casey_post_id UUID := '10000000-0000-0000-0000-000000000004';
BEGIN
  -- Get the demo class
  SELECT id INTO demo_class_id FROM public.classes WHERE join_code = 'DRAW01';
  
  IF demo_class_id IS NULL THEN
    RAISE EXCEPTION 'Demo class DRAW01 not found. Cannot refresh demo data.';
  END IF;
  
  -- Re-add demo users as class members with fresh timestamps
  INSERT INTO public.class_members (id, class_id, user_id, role, joined_at, is_active) VALUES 
    (gen_random_uuid(), demo_class_id, maya_id, 'student', NOW() - INTERVAL '2 days', true),
    (gen_random_uuid(), demo_class_id, jordan_id, 'student', NOW() - INTERVAL '2 days', true),
    (gen_random_uuid(), demo_class_id, sam_id, 'student', NOW() - INTERVAL '1 day', true),
    (gen_random_uuid(), demo_class_id, casey_id, 'student', NOW() - INTERVAL '1 day', true),
    (gen_random_uuid(), demo_class_id, riley_id, 'student', NOW() - INTERVAL '4 hours', true);
  
  -- Create fresh posts with realistic relative timing
  
  -- Maya's post (expires in 45 minutes, 3 of 5 viewers)
  INSERT INTO public.posts (
    id, user_id, class_id, image_url, image_path, frame_style, title, description,
    max_viewers, view_count, duration_minutes, expires_at, is_expired, created_at, updated_at
  ) VALUES (
    maya_post_id, maya_id, demo_class_id,
    'https://picsum.photos/800/600?random=maya1',
    'demo/maya_charcoal_portrait.jpg',
    'classic',
    'Charcoal Portrait Study',
    'Working on capturing light and shadow in this self-portrait. Still learning!',
    5, 3, 60,
    NOW() + INTERVAL '45 minutes',
    false,
    NOW() - INTERVAL '15 minutes',
    NOW() - INTERVAL '15 minutes'
  );
  
  -- Jordan's post (expires in 2 hours 20 minutes, 2 of 4 viewers)
  INSERT INTO public.posts (
    id, user_id, class_id, image_url, image_path, frame_style, title, description,
    max_viewers, view_count, duration_minutes, expires_at, is_expired, created_at, updated_at
  ) VALUES (
    jordan_post_id, jordan_id, demo_class_id,
    'https://picsum.photos/800/600?random=jordan1',
    'demo/jordan_watercolor_landscape.jpg',
    'modern',
    'Watercolor Landscape',
    'First attempt at wet-on-wet technique. The colors bled more than expected but I like it!',
    4, 2, 180,
    NOW() + INTERVAL '2 hours 20 minutes',
    false,
    NOW() - INTERVAL '40 minutes',
    NOW() - INTERVAL '40 minutes'
  );
  
  -- Sam's post (expires in 18 minutes, 5 of 5 viewers - max reached)
  INSERT INTO public.posts (
    id, user_id, class_id, image_url, image_path, frame_style, title, description,
    max_viewers, view_count, duration_minutes, expires_at, is_expired, created_at, updated_at
  ) VALUES (
    sam_post_id, sam_id, demo_class_id,
    'https://picsum.photos/800/600?random=sam1',
    'demo/sam_pencil_study.jpg',
    NULL,
    'Pencil Study - Hands',
    'Practiced drawing hands today. They are so difficult but getting better!',
    5, 5, 30,
    NOW() + INTERVAL '18 minutes',
    false,
    NOW() - INTERVAL '12 minutes',
    NOW() - INTERVAL '12 minutes'
  );
  
  -- Casey's post (expires tomorrow, 1 of 3 viewers, fresh post)
  INSERT INTO public.posts (
    id, user_id, class_id, image_url, image_path, frame_style, title, description,
    max_viewers, view_count, duration_minutes, expires_at, is_expired, created_at, updated_at
  ) VALUES (
    casey_post_id, casey_id, demo_class_id,
    'https://picsum.photos/800/600?random=casey1',
    'demo/casey_digital_sketch.jpg',
    'vintage',
    'Digital Character Sketch',
    'Exploring digital art for the first time. Really enjoying the undo button! 😊',
    3, 1, 1440, -- 24 hours
    NOW() + INTERVAL '23 hours 45 minutes',
    false,
    NOW() - INTERVAL '15 minutes',
    NOW() - INTERVAL '15 minutes'
  );
  
  -- Record fresh post views to make engagement realistic
  INSERT INTO public.post_views (post_id, user_id, viewed_at) VALUES 
    -- Maya's post viewers
    (maya_post_id, jordan_id, NOW() - INTERVAL '10 minutes'),
    (maya_post_id, sam_id, NOW() - INTERVAL '8 minutes'),
    (maya_post_id, casey_id, NOW() - INTERVAL '5 minutes'),
    
    -- Jordan's post viewers  
    (jordan_post_id, maya_id, NOW() - INTERVAL '35 minutes'),
    (jordan_post_id, sam_id, NOW() - INTERVAL '20 minutes'),
    
    -- Sam's post viewers (max reached)
    (sam_post_id, maya_id, NOW() - INTERVAL '10 minutes'),
    (sam_post_id, jordan_id, NOW() - INTERVAL '8 minutes'),
    (sam_post_id, casey_id, NOW() - INTERVAL '6 minutes'),
    (sam_post_id, riley_id, NOW() - INTERVAL '4 minutes'),
    
    -- Casey's post viewer
    (casey_post_id, riley_id, NOW() - INTERVAL '12 minutes');
  
  -- Create fresh encouraging comments
  INSERT INTO public.comments (post_id, user_id, content, created_at, updated_at) VALUES 
    -- Comments on Maya's post
    (maya_post_id, jordan_id, 'Wow, the shading on the cheekbone is really well done! You captured the light beautifully.', NOW() - INTERVAL '8 minutes', NOW() - INTERVAL '8 minutes'),
    (maya_post_id, sam_id, 'I love how you used the charcoal texture to show depth. The contrast is striking!', NOW() - INTERVAL '6 minutes', NOW() - INTERVAL '6 minutes'),
    (maya_post_id, casey_id, 'This is incredible! The way you rendered the hair texture is so realistic. Goals! ✨', NOW() - INTERVAL '3 minutes', NOW() - INTERVAL '3 minutes'),
    
    -- Comments on Jordan's post
    (jordan_post_id, maya_id, 'The color blending in the sky is absolutely gorgeous! Sometimes happy accidents make the best art.', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes'),
    (jordan_post_id, sam_id, 'I can feel the atmosphere in this piece. The wet-on-wet technique gives it such a dreamy quality.', NOW() - INTERVAL '18 minutes', NOW() - INTERVAL '18 minutes'),
    
    -- Comments on Sam's post  
    (sam_post_id, maya_id, 'Hands are so challenging but you nailed the proportions! The gesture feels very natural.', NOW() - INTERVAL '8 minutes', NOW() - INTERVAL '8 minutes'),
    (sam_post_id, jordan_id, 'The way you captured the knuckle details is amazing. I struggle with hands so much!', NOW() - INTERVAL '6 minutes', NOW() - INTERVAL '6 minutes'),
    (sam_post_id, casey_id, 'Such clean linework! You can really see your improvement from practice. Keep it up! 👏', NOW() - INTERVAL '4 minutes', NOW() - INTERVAL '4 minutes'),
    (sam_post_id, riley_id, 'The anatomy looks spot on. This gives me motivation to practice hands more!', NOW() - INTERVAL '2 minutes', NOW() - INTERVAL '2 minutes'),
    
    -- Comments on Casey's post
    (casey_post_id, riley_id, 'Love seeing you explore digital! The character design has so much personality. 🎨', NOW() - INTERVAL '10 minutes', NOW() - INTERVAL '10 minutes');
  
  -- Add fresh AI feedback for demonstration
  INSERT INTO public.ai_feedback (post_id, user_id, feedback_text, feedback_status, processing_time_ms, ai_model, created_at, updated_at) VALUES 
    (maya_post_id, maya_id, 
     'Your charcoal portrait demonstrates excellent understanding of light and shadow. The contrast you''ve achieved creates strong dimensionality, particularly in the facial structure. The way you''ve handled the transition from light to shadow on the cheekbone shows developing technical skill.

Areas of strength:
• Strong tonal range from deep blacks to subtle grays
• Good proportional accuracy in facial features  
• Effective use of charcoal texture to suggest surface quality

For continued growth, consider:
• Experimenting with softer edges in some shadow transitions
• Adding more subtle mid-tones to enhance roundness
• Exploring how reflected light affects shadow areas

This piece shows real promise and dedication to observational drawing. Keep practicing with direct observation!',
     'completed', 2847, 'gpt-4v', NOW() - INTERVAL '5 minutes', NOW() - INTERVAL '5 minutes'),
     
    (sam_post_id, sam_id,
     'This hand study shows impressive attention to anatomical accuracy and proportional relationships. Drawing hands is one of the most challenging subjects, and you''ve approached it with clear observation and patience.

Strengths in this piece:
• Accurate finger proportions and joint placement
• Good understanding of how tendons affect surface form
• Clean, confident line quality that suggests three-dimensional form
• Proper scale relationships between palm and fingers

Suggestions for development:
• Consider adding subtle shading to enhance volume
• Study how hands change when viewed from different angles
• Practice gesture drawings to capture hand movement and expression

Your improvement through practice is evident. Hands become much easier with continued observation - you''re on the right track!',
     'completed', 3156, 'gpt-4v', NOW() - INTERVAL '3 minutes', NOW() - INTERVAL '3 minutes');
  
  RAISE NOTICE 'Demo data refresh completed successfully at %', NOW();
  RAISE NOTICE 'Created 5 demo users, 4 sample posts with fresh timers, realistic views, and encouraging comments';
  RAISE NOTICE 'Post expiration times refreshed: Maya (+45min), Jordan (+2h20m), Sam (+18min), Casey (+23h45m)';
END;
$$;

-- Commit the refresh
COMMIT;

-- Final log
DO $$ BEGIN RAISE NOTICE 'Demo data refresh transaction completed at %', NOW(); END $$;