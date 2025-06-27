/**
 * Solo Tutor Demo Data Embedding Generator
 * 
 * This script generates pre-computed embeddings for realistic solo tutor demo conversations.
 * It creates 5 diverse chats covering different art topics with realistic conversation flow
 * that demonstrates the RAG system's memory capabilities.
 * 
 * Usage: OPENAI_API_KEY=your_key node scripts/generate_solo_embeddings.mjs
 * 
 * The output SQL can be copied directly into a migration file.
 */

import { config } from 'dotenv';

// Load environment variables
config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

// Suppress all console output except the final SQL
const originalLog = console.log;
console.log = () => {};

/**
 * Generate embedding using OpenAI text-embedding-3-small
 */
async function generateEmbedding(text) {
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;
    
    return embedding;
  } catch (error) {
    console.error('❌ Embedding generation failed:', error);
    throw error;
  }
}

/**
 * Demo conversations covering diverse art topics with realistic flow
 * Each chat demonstrates different aspects that should trigger RAG memory
 */
const DEMO_CONVERSATIONS = [
  {
    chatId: '20000000-0000-0000-0000-000000000001',
    title: 'Hand Drawing Fundamentals',
    messages: [
      {
        role: 'user',
        content: "I'm really struggling with drawing hands. They always look weird and disproportionate. Can you help me understand the basic structure?",
        daysAgo: 5
      },
      {
        role: 'assistant', 
        content: "Hands are challenging for every artist! Let's break them down into basic shapes. Think of the palm as a square, and the fingers as cylinders. The key proportions: the middle finger is usually about the same length as the palm. Start by sketching the overall gesture first, then add details. Practice drawing your own hand in different positions - it's the best reference you'll ever have!",
        daysAgo: 5
      },
      {
        role: 'user',
        content: "That makes sense! I tried the cylinder approach and it's helping. But I'm still having trouble with the thumb placement. Where exactly should it attach?",
        daysAgo: 4
      },
      {
        role: 'assistant',
        content: "Great progress! The thumb is tricky because it's on a different plane. It attaches about halfway down the side of the palm, not at the wrist. Think of it as coming out at a 45-degree angle. The thumb has only two segments (unlike fingers with three), and its tip usually reaches to about the middle joint of the index finger. Try drawing hands making different gestures - pointing, grasping, relaxed - to see how the thumb moves independently.",
        daysAgo: 4
      }
    ]
  },
  {
    chatId: '20000000-0000-0000-0000-000000000002', 
    title: 'Color Theory Deep Dive',
    messages: [
      {
        role: 'user',
        content: "I've been working on a sunset landscape, but my colors look muddy and flat. I know about warm and cool colors, but how do I make them actually work together?",
        daysAgo: 3
      },
      {
        role: 'assistant',
        content: "Muddy colors often happen when we mix too many pigments or use colors that are too similar in value. For sunsets, try limiting your palette to just 3-4 colors plus white. Use pure, saturated oranges and reds near the sun, then gradually shift to cooler purples and blues as you move away. The key is contrast - both in temperature (warm vs cool) and value (light vs dark). What medium are you working in?",
        daysAgo: 3
      },
      {
        role: 'user',
        content: "I'm using acrylics. I think you're right about too many colors - I was mixing everything trying to get the 'perfect' shade. Should I stick to colors straight from the tube more?",
        daysAgo: 2
      },
      {
        role: 'assistant',
        content: "Exactly! With acrylics, you can definitely use colors straight from the tube, especially for vibrant sunsets. Try this: use cadmium orange and cadmium red near the sun, then mix in a touch of quinacridone violet as you move up. For the sky, ultramarine blue mixed with just a hint of that violet. The magic happens in the transitions - blend while the paint is still wet, or use glazing techniques. Remember: it's better to have bold, clean colors than muddy 'realistic' ones!",
        daysAgo: 2
      }
    ]
  },
  {
    chatId: '20000000-0000-0000-0000-000000000003',
    title: 'Perspective Mastery',
    messages: [
      {
        role: 'user', 
        content: "I'm trying to draw a street scene with buildings, but everything looks flat. I know about one-point perspective, but when I try to apply it, something still feels off.",
        daysAgo: 6
      },
      {
        role: 'assistant',
        content: "Street scenes are perfect for practicing perspective! The 'flat' feeling usually comes from inconsistent vanishing points or eye level. First, establish your horizon line (eye level) - this stays consistent throughout your drawing. For a street scene, try two-point perspective: vertical lines stay vertical, but all horizontal lines converge to two vanishing points on your horizon line. Make sure your buildings get smaller as they recede, and don't forget about the street itself - it follows the same perspective rules!",
        daysAgo: 6
      },
      {
        role: 'user',
        content: "Ah, I think I was putting my vanishing points too close together! When I spread them out more, it looks much more natural. But now I'm confused about where to put people and cars in the scene.",
        daysAgo: 1
      },
      {
        role: 'assistant',
        content: "Perfect observation! Wide vanishing points create more natural-looking perspective. For people and cars, they follow the same rules: their eye level should match your horizon line (assuming they're standing on the same ground plane). A person's head will be at the horizon line regardless of where they are in the scene, but their feet will be lower as they get farther away. Cars work the same way - their rooflines converge toward the vanishing points just like building tops. Try sketching simple stick figures first to get the proportions right!",
        daysAgo: 1
      }
    ]
  },
  {
    chatId: '20000000-0000-0000-0000-000000000004',
    title: 'Composition & Visual Flow',
    messages: [
      {
        role: 'user',
        content: "My drawings have all the right elements, but they feel boring and static. How do I make them more dynamic and interesting to look at?",
        daysAgo: 7
      },
      {
        role: 'assistant',
        content: "You're thinking about composition - one of the most important aspects of art! Dynamic compositions use principles like the rule of thirds, leading lines, and visual weight. Try placing your main subject off-center, use diagonal lines to create movement, and vary your shapes and sizes. Think about where the viewer's eye enters your drawing and how it moves through the piece. Asymmetrical balance often feels more dynamic than perfect symmetry. What type of subjects are you drawing?",
        daysAgo: 7
      },
      {
        role: 'user',
        content: "Mostly still life setups - fruit, bottles, that kind of thing. I usually just arrange them in a line and draw what I see.",
        daysAgo: 6
      },
      {
        role: 'assistant',
        content: "Still life is perfect for practicing composition! Instead of lining objects up, try creating depth by overlapping them and placing them at different distances. Use odd numbers of objects (3 or 5 works better than 2 or 4), vary their heights and sizes, and create triangular arrangements. Add a dramatic light source from one side to create strong shadows - this adds visual interest and helps define form. Consider the negative space around your objects too - it's just as important as the objects themselves!",
        daysAgo: 6
      }
    ]
  },
  {
    chatId: '20000000-0000-0000-0000-000000000005',
    title: 'Light & Shadow Studies',
    messages: [
      {
        role: 'user',
        content: "I can draw the outlines of things pretty well, but when I try to add shading, everything looks flat and wrong. How do I understand where shadows should go?",
        daysAgo: 4
      },
      {
        role: 'assistant',
        content: "Understanding light is crucial for creating form! Start by identifying your light source - where is the light coming from? Then look for five basic elements: highlight (brightest point), light tone (areas facing the light), shadow tone (areas turning away from light), reflected light (bounced light in shadow areas), and cast shadow (shadow the object throws). Practice with simple shapes like spheres and cubes first. The key is observing how light wraps around form, not just adding random dark areas!",
        daysAgo: 4
      },
      {
        role: 'user',
        content: "That five-element breakdown is really helpful! I've been practicing with an apple under a desk lamp. I'm starting to see the reflected light you mentioned - it's subtle but makes a huge difference.",
        daysAgo: 3
      },
      {
        role: 'assistant',
        content: "Excellent! You're developing your observational skills. That reflected light is what separates beginner shading from professional-looking form. It prevents objects from looking like flat cutouts. As you get more comfortable, try moving your light source to different positions - side light, back light, top light - each creates completely different moods and challenges. Also experiment with multiple light sources, but start simple. The apple exercise is perfect - organic forms like fruit teach you how light flows over curved surfaces!",
        daysAgo: 3
      }
    ]
  }
];

/**
 * Generate embeddings for all demo messages and output SQL
 */
async function generateDemoData() {
  const demoUserId = '10000000-0000-0000-0000-000000000001';
  let sqlOutput = `-- Solo Tutor Demo Data with Pre-computed Embeddings
-- This migration adds realistic demo conversations with embeddings for RAG testing
-- Generated by scripts/generate_solo_embeddings.mjs

-- Demo user for testing (password: demo123)
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password, 
  email_confirmed_at, 
  created_at, 
  updated_at,
  raw_user_meta_data
) VALUES (
  '${demoUserId}',
  'demo@example.com',
  '$2a$10$X.XDLhJ5GXKYXxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', -- demo123
  NOW(),
  NOW(),
  NOW(),
  '{"username": "demo_artist"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert demo chats
`;

  for (const chat of DEMO_CONVERSATIONS) {
    // Add chat insert
    sqlOutput += `
INSERT INTO public.solo_ai_chats (id, user_id, title, created_at, updated_at) VALUES (
  '${chat.chatId}',
  '${demoUserId}',
  '${chat.title}',
  NOW() - INTERVAL '${Math.max(...chat.messages.map(m => m.daysAgo))} days',
  NOW() - INTERVAL '${Math.min(...chat.messages.map(m => m.daysAgo))} days'
);
`;

    // Process each message
    for (const message of chat.messages) {
      // Generate embedding
      const embedding = await generateEmbedding(message.content);
      const embeddingStr = '[' + embedding.join(',') + ']';
      
      // Add message insert
      sqlOutput += `
INSERT INTO public.solo_ai_messages (
  id,
  chat_id, 
  role, 
  content, 
  embedding, 
  created_at
) VALUES (
  gen_random_uuid(),
  '${chat.chatId}',
  '${message.role}',
  '${message.content.replace(/'/g, "''")}',
  '${embeddingStr}',
  NOW() - INTERVAL '${message.daysAgo} days'
);`;
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Restore console.log and output only the SQL
  console.log = originalLog;
  console.log(sqlOutput);
  
  return sqlOutput;
}

// Run the generation
generateDemoData().catch(console.error); 