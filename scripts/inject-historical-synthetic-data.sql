-- Inject Historical Synthetic Data for RAG Testing
-- This script creates realistic historical conversations with proper timestamps
-- Run with: psql or through Supabase SQL Editor

-- Target user ID
-- 7e20cbba-83c2-4297-90a6-0ac94aabb814

-- First, let's insert the chats with historical timestamps
INSERT INTO solo_ai_chats (id, user_id, title, created_at, updated_at) VALUES
('31000000-0000-0000-0000-000000000001', '7e20cbba-83c2-4297-90a6-0ac94aabb814', 'Apple Still Life - Crossflow Technique (Historical)', '2025-06-22 10:00:00+00', '2025-06-24 15:30:00+00'),
('31000000-0000-0000-0000-000000000002', '7e20cbba-83c2-4297-90a6-0ac94aabb814', 'Sunset Landscape - Color Accuracy Issues (Historical)', '2025-06-18 14:00:00+00', '2025-06-20 16:45:00+00'),
('31000000-0000-0000-0000-000000000003', '7e20cbba-83c2-4297-90a6-0ac94aabb814', 'Stormy Seascape - Purple Cloud Breakthrough (Historical)', '2025-06-16 09:30:00+00', '2025-06-18 11:20:00+00'),
('31000000-0000-0000-0000-000000000004', '7e20cbba-83c2-4297-90a6-0ac94aabb814', 'Portrait Drawing - Left-Handed Smudging Issues (Historical)', '2025-06-13 13:15:00+00', '2025-06-16 10:30:00+00'),
('31000000-0000-0000-0000-000000000005', '7e20cbba-83c2-4297-90a6-0ac94aabb814', 'Coffee Shop Portrait Series (Historical)', '2025-06-04 08:00:00+00', '2025-06-18 17:00:00+00');

-- Now insert the messages (embeddings will be generated separately)
-- Chat 1: Apple Still Life - Crossflow Technique
INSERT INTO solo_ai_messages (chat_id, role, content, created_at) VALUES
('31000000-0000-0000-0000-000000000001', 'user', 'Working on this apple painting but my brushstrokes in the mid-tones are streaky and uneven. The red areas look choppy.', '2025-06-22 10:00:00+00'),
('31000000-0000-0000-0000-000000000001', 'assistant', 'For smooth apple surfaces, try consistent pressure and better paint loading - remove excess paint before each stroke, especially in those red transition areas.', '2025-06-22 10:05:00+00'),
('31000000-0000-0000-0000-000000000001', 'user', 'Better but still inconsistent. The left apple looks smooth, the right one choppy. Same brush, same paint.', '2025-06-23 14:30:00+00'),
('31000000-0000-0000-0000-000000000001', 'assistant', 'Let''s develop something custom for your apple work - I''ll call it the ''Crossflow Technique.'' Light pressure for 4 counts, medium for 2, then light for 1, with tiny crosshatch motions. This 4:2:1 rhythm should help those red mid-tones blend smoothly.', '2025-06-23 14:35:00+00'),
('31000000-0000-0000-0000-000000000001', 'user', 'The Crossflow Technique transformed my apple painting! The 4:2:1 rhythm gives such smooth transitions in the red areas.', '2025-06-24 15:20:00+00'),
('31000000-0000-0000-0000-000000000001', 'assistant', 'Perfect! Use Crossflow for those apple mid-tones and any blending. For highlights and fine details, stick to light pressure. Your slight tremor actually helps create natural apple skin texture with the crosshatch motion.', '2025-06-24 15:30:00+00');

-- Chat 2: Sunset Landscape - Color Accuracy Issues  
INSERT INTO solo_ai_messages (chat_id, role, content, created_at) VALUES
('31000000-0000-0000-0000-000000000002', 'user', 'This sunset landscape looks vibrant while I''m painting, but when I photograph it the colors look completely different - much more dull and greenish.', '2025-06-18 14:00:00+00'),
('31000000-0000-0000-0000-000000000002', 'assistant', 'Color shifts between painting and photography are usually lighting issues. What''s your studio setup - natural and artificial light sources?', '2025-06-18 14:05:00+00'),
('31000000-0000-0000-0000-000000000002', 'user', 'North-facing window but a huge oak tree blocks most light. Just using a random desk lamp for this sunset piece.', '2025-06-19 16:30:00+00'),
('31000000-0000-0000-0000-000000000002', 'assistant', 'That oak tree is filtering light inconsistently, making your sunset colors appear different than they are. Try this combo: 40-watt daylight LED at 45 degrees, plus 60-watt warm LED as fill. This compensates for the oak''s green filtering.', '2025-06-19 16:35:00+00'),
('31000000-0000-0000-0000-000000000002', 'user', 'Much better color accuracy! But I notice when I work on this landscape in the evening, the colors still shift compared to morning sessions.', '2025-06-20 16:40:00+00'),
('31000000-0000-0000-0000-000000000002', 'assistant', 'Oak shadows change throughout the day, affecting your color perception. Paint color-critical work like this sunset between 10 AM-2 PM when shadows are consistent. For evenings, bump the warm LED to 75 watts after 4 PM.', '2025-06-20 16:45:00+00');

-- Chat 3: Stormy Seascape - Purple Cloud Breakthrough
INSERT INTO solo_ai_messages (chat_id, role, content, created_at) VALUES
('31000000-0000-0000-0000-000000000003', 'user', 'Working on this stormy seascape but can''t get the right purple-gray for these threatening clouds. Either too blue or too brown.', '2025-06-16 09:30:00+00'),
('31000000-0000-0000-0000-000000000003', 'assistant', 'Storm clouds are tricky - they need that ominous purple-gray balance. What colors are you mixing for this seascape currently?', '2025-06-16 09:35:00+00'),
('31000000-0000-0000-0000-000000000003', 'user', 'Ultramarine blue with burnt umber for the storm clouds, but it''s muddy. Adding red makes it too warm for the threatening mood.', '2025-06-17 11:15:00+00'),
('31000000-0000-0000-0000-000000000003', 'assistant', 'For dramatic storm clouds in seascapes, try starting with dioxazine purple as base, then add payne''s gray and a touch of raw umber. Much cleaner than mixing from primaries.', '2025-06-17 11:20:00+00'),
('31000000-0000-0000-0000-000000000003', 'user', 'Perfect storm cloud color! Found the ratio: 2 parts dioxazine purple, 1 part payne''s gray, half part raw umber. Exactly the threatening mood I wanted for this seascape!', '2025-06-18 10:45:00+00'),
('31000000-0000-0000-0000-000000000003', 'assistant', 'Excellent! That 2:1:0.5 ratio is your signature ''Thundercloud Purple.'' Perfect for dramatic seascapes. Add tiny burnt sienna for sunset storms, or more payne''s gray for winter ocean scenes.', '2025-06-18 11:20:00+00');

-- Chat 4: Portrait Drawing - Left-Handed Smudging Issues
INSERT INTO solo_ai_messages (chat_id, role, content, created_at) VALUES
('31000000-0000-0000-0000-000000000004', 'user', 'Working on this portrait but charcoal keeps smudging. Being left-handed, my hand drags across the woman''s hair and ruins the detail work.', '2025-06-13 13:15:00+00'),
('31000000-0000-0000-0000-000000000004', 'assistant', 'Left-handed charcoal portrait challenges! Do you work flat or on easel? Are you resting your wrist on the paper while drawing her features?', '2025-06-13 13:20:00+00'),
('31000000-0000-0000-0000-000000000004', 'user', 'Work flat, and yes I rest my wrist - old injury makes it weak. Without support my hand shakes too much for the fine facial details.', '2025-06-14 15:30:00+00'),
('31000000-0000-0000-0000-000000000004', 'assistant', 'Let''s work with your wrist needs for portrait work. Try the ''Anchor Point Method'' - fold paper towel into small square, use as barrier between wrist and drawing. Complete the woman''s face in sections before moving the towel.', '2025-06-14 15:35:00+00'),
('31000000-0000-0000-0000-000000000004', 'user', 'Anchor Point Method helps with the portrait! Still some smudging when moving between facial features though.', '2025-06-16 10:20:00+00'),
('31000000-0000-0000-0000-000000000004', 'assistant', 'For detailed portraits, fold the towel thicker for better barrier. Also spray workable fixative on completed sections like the eyes before moving to the nose area. This protects your portrait work while keeping the wrist support you need.', '2025-06-16 10:30:00+00');

-- Chat 5: Coffee Shop Portrait Series (Emma/Barista Chronicles)
INSERT INTO solo_ai_messages (chat_id, role, content, created_at) VALUES
('31000000-0000-0000-0000-000000000005', 'user', 'I want to start a portrait series of the baristas at my local coffee shop. I go there every morning and I think it would be a fun project.', '2025-06-04 08:00:00+00'),
('31000000-0000-0000-0000-000000000005', 'assistant', 'What a wonderful project idea! Portrait series can really help develop your skills. What''s your plan - are you thinking of painting them from life, or working from photos? And how many portraits are you envisioning?', '2025-06-04 08:05:00+00'),
('31000000-0000-0000-0000-000000000005', 'user', 'I''m thinking photos to start with, since they''re always busy. Maybe 6-8 portraits total. I want to call it my ''Barista Chronicles'' series. Emma, the morning shift manager, said she''d love to be first!', '2025-06-05 09:30:00+00'),
('31000000-0000-0000-0000-000000000005', 'assistant', '''Barista Chronicles'' is a perfect title! Starting with Emma is smart - having an enthusiastic first subject helps set the tone. For consistency across your series, establish a standard format: similar lighting, same canvas size, and consistent background approach. What medium are you planning to use?', '2025-06-05 09:35:00+00'),
('31000000-0000-0000-0000-000000000005', 'user', 'I finished Emma #1 in acrylics! But I''m not happy with the skin tones - they look too orange. Emma has this beautiful olive complexion that I just couldn''t capture right.', '2025-06-08 14:20:00+00'),
('31000000-0000-0000-0000-000000000005', 'assistant', 'Olive skin tones are challenging in acrylics! The key is avoiding the orange trap. For Emma #2, try this approach: start with a cool undertone using raw umber mixed with a tiny bit of green, then build up with warm tones. Emma''s olive complexion probably has subtle green undertones that need to be honored in your base layer.', '2025-06-08 14:25:00+00'),
('31000000-0000-0000-0000-000000000005', 'user', 'Emma #2 is so much better! The cool undertone approach worked perfectly. She was thrilled when I showed her the difference. Now I''m ready to start Emma #3 - I want to capture her mid-laugh expression this time.', '2025-06-13 16:45:00+00'),
('31000000-0000-0000-0000-000000000005', 'assistant', 'Fantastic progress in your Barista Chronicles! Emma #3 with the laughing expression will be a great addition to show her personality. For capturing laughter in portraits, focus on the eyes as much as the mouth - genuine laughter creates specific crinkles around the eyes. Since you''ve mastered her skin tones in Emma #2, you can focus on the expression dynamics in #3.', '2025-06-13 16:50:00+00'),
('31000000-0000-0000-0000-000000000005', 'user', 'Emma #3 turned out amazing! The laugh lines around her eyes really brought it to life. The coffee shop owner wants to display all three Emma portraits together as a triptych. Should I start on the next barista now?', '2025-06-18 16:30:00+00'),
('31000000-0000-0000-0000-000000000005', 'assistant', 'How exciting that they want to display your Emma triptych! That''s a testament to your skill development through the series. Before starting the next barista, consider what you learned from Emma''s three portraits - the skin tone technique, the expression work, the personality capture. These insights will make your next subject even stronger in your Barista Chronicles series.', '2025-06-18 17:00:00+00');

-- Display summary
SELECT 'Historical synthetic data inserted successfully!' as status;
SELECT 'Next step: Generate embeddings for these messages using the embedding script' as next_action; 