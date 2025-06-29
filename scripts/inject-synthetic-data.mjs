/**
 * Inject Synthetic Data into RAG System
 * 
 * This script helps you add new synthetic conversations to your RAG database.
 * It handles formatting, vectorization, and database insertion.
 * 
 * Usage: OPENAI_API_KEY=your_key node scripts/inject-synthetic-data.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Generate embedding using OpenAI text-embedding-3-small
 */
async function generateEmbedding(text) {
  console.log(`📊 Generating embedding for text (${text.length} chars)...`);
  
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
    
    console.log(`✅ Generated embedding (dimension: ${embedding.length})`);
    return embedding;
  } catch (error) {
    console.error('❌ Embedding generation failed:', error);
    throw error;
  }
}

/**
 * TEMPLATE: Define your new conversations here
 * 
 * Format:
 * - chatId: Use format '30000000-0000-0000-0000-00000000000X' (starting with 3 for new data)
 * - title: Descriptive title for the conversation topic
 * - messages: Array of {role, content, daysAgo} objects
 * - role: 'user' or 'assistant'
 * - content: The message text (this gets vectorized)
 * - daysAgo: How many days ago this message was sent (for realistic timestamps)
 */
const NEW_CONVERSATIONS = [
  // 1. PERSONAL TECHNIQUE DEVELOPMENT
  {
    chatId: '31000000-0000-0000-0000-000000000001',
    title: 'Apple Still Life - Crossflow Technique (Historical)',
    messages: [
      {
        role: 'user',
        content: "Working on this apple painting but my brushstrokes in the mid-tones are streaky and uneven. The red areas look choppy.",
        daysAgo: 7
      },
      {
        role: 'assistant',
        content: "For smooth apple surfaces, try consistent pressure and better paint loading - remove excess paint before each stroke, especially in those red transition areas.",
        daysAgo: 7
      },
      {
        role: 'user',
        content: "Better but still inconsistent. The left apple looks smooth, the right one choppy. Same brush, same paint.",
        daysAgo: 6
      },
      {
        role: 'assistant',
        content: "Let's develop something custom for your apple work - I'll call it the 'Crossflow Technique.' Light pressure for 4 counts, medium for 2, then light for 1, with tiny crosshatch motions. This 4:2:1 rhythm should help those red mid-tones blend smoothly.",
        daysAgo: 6
      },
      {
        role: 'user',
        content: "The Crossflow Technique transformed my apple painting! The 4:2:1 rhythm gives such smooth transitions in the red areas.",
        daysAgo: 5
      },
      {
        role: 'assistant',
        content: "Perfect! Use Crossflow for those apple mid-tones and any blending. For highlights and fine details, stick to light pressure. Your slight tremor actually helps create natural apple skin texture with the crosshatch motion.",
        daysAgo: 5
      }
    ]
  },

  // 2. PERSONAL STUDIO SETUP & WORKFLOW
  {
    chatId: '31000000-0000-0000-0000-000000000002',
    title: 'Sunset Landscape - Color Accuracy Issues (Historical)',
    messages: [
      {
        role: 'user',
        content: "This sunset landscape looks vibrant while I'm painting, but when I photograph it the colors look completely different - much more dull and greenish.",
        daysAgo: 11
      },
      {
        role: 'assistant',
        content: "Color shifts between painting and photography are usually lighting issues. What's your studio setup - natural and artificial light sources?",
        daysAgo: 11
      },
      {
        role: 'user',
        content: "North-facing window but a huge oak tree blocks most light. Just using a random desk lamp for this sunset piece.",
        daysAgo: 10
      },
      {
        role: 'assistant',
        content: "That oak tree is filtering light inconsistently, making your sunset colors appear different than they are. Try this combo: 40-watt daylight LED at 45 degrees, plus 60-watt warm LED as fill. This compensates for the oak's green filtering.",
        daysAgo: 10
      },
      {
        role: 'user',
        content: "Much better color accuracy! But I notice when I work on this landscape in the evening, the colors still shift compared to morning sessions.",
        daysAgo: 9
      },
      {
        role: 'assistant',
        content: "Oak shadows change throughout the day, affecting your color perception. Paint color-critical work like this sunset between 10 AM-2 PM when shadows are consistent. For evenings, bump the warm LED to 75 watts after 4 PM.",
        daysAgo: 9
      }
    ]
  },

  // 3. PERSONAL COLOR MIXING DISCOVERY
  {
    chatId: '31000000-0000-0000-0000-000000000003',
    title: 'Stormy Seascape - Purple Cloud Breakthrough (Historical)',
    messages: [
      {
        role: 'user',
        content: "Working on this stormy seascape but can't get the right purple-gray for these threatening clouds. Either too blue or too brown.",
        daysAgo: 13
      },
      {
        role: 'assistant',
        content: "Storm clouds are tricky - they need that ominous purple-gray balance. What colors are you mixing for this seascape currently?",
        daysAgo: 13
      },
      {
        role: 'user',
        content: "Ultramarine blue with burnt umber for the storm clouds, but it's muddy. Adding red makes it too warm for the threatening mood.",
        daysAgo: 12
      },
      {
        role: 'assistant',
        content: "For dramatic storm clouds in seascapes, try starting with dioxazine purple as base, then add payne's gray and a touch of raw umber. Much cleaner than mixing from primaries.",
        daysAgo: 12
      },
      {
        role: 'user',
        content: "Perfect storm cloud color! Found the ratio: 2 parts dioxazine purple, 1 part payne's gray, half part raw umber. Exactly the threatening mood I wanted for this seascape!",
        daysAgo: 11
      },
      {
        role: 'assistant',
        content: "Excellent! That 2:1:0.5 ratio is your signature 'Thundercloud Purple.' Perfect for dramatic seascapes. Add tiny burnt sienna for sunset storms, or more payne's gray for winter ocean scenes.",
        daysAgo: 11
      }
    ]
  },

  // 4. PERSONAL ARTISTIC CHALLENGE & SOLUTION
  {
    chatId: '31000000-0000-0000-0000-000000000004',
    title: 'Portrait Drawing - Left-Handed Smudging Issues (Historical)',
    messages: [
      {
        role: 'user',
        content: "Working on this portrait but charcoal keeps smudging. Being left-handed, my hand drags across the woman's hair and ruins the detail work.",
        daysAgo: 16
      },
      {
        role: 'assistant',
        content: "Left-handed charcoal portrait challenges! Do you work flat or on easel? Are you resting your wrist on the paper while drawing her features?",
        daysAgo: 16
      },
      {
        role: 'user',
        content: "Work flat, and yes I rest my wrist - old injury makes it weak. Without support my hand shakes too much for the fine facial details.",
        daysAgo: 15
      },
      {
        role: 'assistant',
        content: "Let's work with your wrist needs for portrait work. Try the 'Anchor Point Method' - fold paper towel into small square, use as barrier between wrist and drawing. Complete the woman's face in sections before moving the towel.",
        daysAgo: 15
      },
      {
        role: 'user',
        content: "Anchor Point Method helps with the portrait! Still some smudging when moving between facial features though.",
        daysAgo: 13
      },
      {
        role: 'assistant',
        content: "For detailed portraits, fold the towel thicker for better barrier. Also spray workable fixative on completed sections like the eyes before moving to the nose area. This protects your portrait work while keeping the wrist support you need.",
        daysAgo: 13
      }
    ]
  },

  // 5. PERSONAL ARTISTIC SERIES & PROGRESSION
  {
    chatId: '31000000-0000-0000-0000-000000000005',
    title: 'Coffee Shop Portrait Series (Historical)',
    messages: [
      {
        role: 'user',
        content: "I want to start a portrait series of the baristas at my local coffee shop. I go there every morning and I think it would be a fun project.",
        daysAgo: 26
      },
      {
        role: 'assistant',
        content: "What a wonderful project idea! Portrait series can really help develop your skills. What's your plan - are you thinking of painting them from life, or working from photos? And how many portraits are you envisioning?",
        daysAgo: 26
      },
      {
        role: 'user',
        content: "I'm thinking photos to start with, since they're always busy. Maybe 6-8 portraits total. I want to call it my 'Barista Chronicles' series. Emma, the morning shift manager, said she'd love to be first!",
        daysAgo: 25
      },
      {
        role: 'assistant',
        content: "'Barista Chronicles' is a perfect title! Starting with Emma is smart - having an enthusiastic first subject helps set the tone. For consistency across your series, establish a standard format: similar lighting, same canvas size, and consistent background approach. What medium are you planning to use?",
        daysAgo: 25
      },
      {
        role: 'user',
        content: "I finished Emma #1 in acrylics! But I'm not happy with the skin tones - they look too orange. Emma has this beautiful olive complexion that I just couldn't capture right.",
        daysAgo: 21
      },
      {
        role: 'assistant',
        content: "Olive skin tones are challenging in acrylics! The key is avoiding the orange trap. For Emma #2, try this approach: start with a cool undertone using raw umber mixed with a tiny bit of green, then build up with warm tones. Emma's olive complexion probably has subtle green undertones that need to be honored in your base layer.",
        daysAgo: 21
      },
      {
        role: 'user',
        content: "Emma #2 is so much better! The cool undertone approach worked perfectly. She was thrilled when I showed her the difference. Now I'm ready to start Emma #3 - I want to capture her mid-laugh expression this time.",
        daysAgo: 16
      },
      {
        role: 'assistant',
        content: "Fantastic progress in your Barista Chronicles! Emma #3 with the laughing expression will be a great addition to show her personality. For capturing laughter in portraits, focus on the eyes as much as the mouth - genuine laughter creates specific crinkles around the eyes. Since you've mastered her skin tones in Emma #2, you can focus on the expression dynamics in #3.",
        daysAgo: 16
      },
      {
        role: 'user',
        content: "Emma #3 turned out amazing! The laugh lines around her eyes really brought it to life. The coffee shop owner wants to display all three Emma portraits together as a triptych. Should I start on the next barista now?",
        daysAgo: 11
      },
      {
        role: 'assistant',
        content: "How exciting that they want to display your Emma triptych! That's a testament to your skill development through the series. Before starting the next barista, consider what you learned from Emma's three portraits - the skin tone technique, the expression work, the personality capture. These insights will make your next subject even stronger in your Barista Chronicles series.",
        daysAgo: 11
      }
    ]
  }
];

/**
 * Inject conversations into the database
 */
async function injectSyntheticData() {
  const targetUserId = '7e20cbba-83c2-4297-90a6-0ac94aabb814';
  
  console.log('🚀 Injecting Synthetic Data into RAG System');
  console.log('===========================================');
  console.log(`👤 Target User: ${targetUserId}`);
  console.log(`📊 Conversations to add: ${NEW_CONVERSATIONS.length}`);
  console.log('');

  try {
    for (const [chatIndex, conversation] of NEW_CONVERSATIONS.entries()) {
      console.log(`💬 Processing Chat ${chatIndex + 1}: "${conversation.title}"`);
      console.log(`   Chat ID: ${conversation.chatId}`);
      console.log(`   Messages: ${conversation.messages.length}`);
      
      // Step 1: Create the chat
      console.log('   🔄 Creating chat...');
      const { data: chatData, error: chatError } = await supabase
        .from('solo_ai_chats')
        .insert({
          id: conversation.chatId,
          user_id: targetUserId,
          title: conversation.title,
          created_at: new Date(Date.now() - Math.max(...conversation.messages.map(m => m.daysAgo)) * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - Math.min(...conversation.messages.map(m => m.daysAgo)) * 24 * 60 * 60 * 1000).toISOString()
        })
        .select();

      if (chatError) {
        console.error(`   ❌ Error creating chat: ${chatError.message}`);
        continue;
      }
      console.log('   ✅ Chat created');

      // Step 2: Process each message
      for (const [msgIndex, message] of conversation.messages.entries()) {
        console.log(`   📝 Processing message ${msgIndex + 1}/${conversation.messages.length} (${message.role})`);
        console.log(`      Content preview: "${message.content.substring(0, 60)}..."`);
        
        // Generate embedding
        const embedding = await generateEmbedding(message.content);
        
        // Insert message
        const messageTimestamp = new Date(Date.now() - message.daysAgo * 24 * 60 * 60 * 1000).toISOString();
        
        const { data: messageData, error: messageError } = await supabase
          .from('solo_ai_messages')
          .insert({
            chat_id: conversation.chatId,
            role: message.role,
            content: message.content,
            embedding: embedding,
            created_at: messageTimestamp
          })
          .select();

        if (messageError) {
          console.error(`   ❌ Error inserting message: ${messageError.message}`);
          continue;
        }
        
        console.log(`   ✅ Message saved with ID: ${messageData[0].id}`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log(`   🎉 Chat "${conversation.title}" completed successfully`);
      console.log('');
    }

    // Verification
    console.log('🔍 Verifying injection...');
    const { data: userChats, error: verifyError } = await supabase
      .from('solo_ai_chats')
      .select('id, title, created_at')
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false });

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError);
      return;
    }

    console.log(`✅ User now has ${userChats.length} total chats:`);
    userChats.forEach((chat, index) => {
      const isNew = NEW_CONVERSATIONS.some(newChat => newChat.chatId === chat.id);
      console.log(`   ${index + 1}. ${chat.title} ${isNew ? '🆕' : ''}`);
    });

    console.log('');
    console.log('🎉 Synthetic Data Injection Complete!');
    console.log('');
    console.log('🧪 To test RAG with new data:');
    console.log('1. Send a message about digital painting or color temperature');
    console.log('2. Check Supabase logs for vector similarity results');
    console.log('3. Look for AI responses that reference the new conversations');
    console.log('');
    console.log('📊 Dashboard: https://supabase.com/dashboard/project/pexynmalkvcxlfiktjdd/functions');

  } catch (error) {
    console.error('❌ Injection failed:', error);
  }
}

// Instructions for the user
console.log('📋 INSTRUCTIONS:');
console.log('================');
console.log('');
console.log('1. 📝 Edit the NEW_CONVERSATIONS array above to add your sample conversations');
console.log('2. 🔧 Follow the template format for each conversation');
console.log('3. 🚀 Run this script to inject the data: node scripts/inject-synthetic-data.mjs');
console.log('');
console.log('💡 Tips:');
console.log('- Use unique chat IDs starting with "30000000-0000-0000-0000-00000000000X"');
console.log('- Include both user and assistant messages for realistic conversations');
console.log('- Use specific, technical content that differs from general LLM knowledge');
console.log('- Vary the daysAgo values for realistic timestamps');
console.log('');
console.log('❓ Ready to inject? Uncomment the line below and run the script:');
console.log('');

// Uncomment this line when you're ready to inject the data:
injectSyntheticData();

export { generateEmbedding, injectSyntheticData };
