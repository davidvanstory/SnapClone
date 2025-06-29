/**
 * RAG Test Conversations with Unique, Non-Public Information
 * 
 * These conversations contain specific information that GPT-4 cannot know
 * from training data, making them perfect for testing RAG retrieval.
 */

const RAG_TEST_CONVERSATIONS = [
  
  // 1. PERSONAL TECHNIQUE DEVELOPMENT
  {
    chatId: '30000000-0000-0000-0000-000000000001',
    title: 'Apple Still Life - Crossflow Technique',
    artworkDescription: `
    A simple oil painting study of three red apples on a white cloth. The painting shows 
    visible brushwork texture, particularly in the mid-tone areas where the red transitions 
    to shadow. Some areas appear smooth while others show choppy, uneven brushstrokes. 
    The artist is learning to control paint application and brush pressure.
    `,
    ragTestReason: `
    Tests RAG ability to recall:
    - Invented technique name ("Crossflow Technique")
    - Specific numeric ratios (4:2:1 rhythm)
    - Personal breakthrough moment with specific artwork
    - Custom terminology that doesn't exist in training data
    `,
    messages: [
      {
        role: 'user',
        content: "Working on this apple painting but my brushstrokes in the mid-tones are streaky and uneven. The red areas look choppy.",
        daysAgo: 6
      },
      {
        role: 'assistant',
        content: "For smooth apple surfaces, try consistent pressure and better paint loading - remove excess paint before each stroke, especially in those red transition areas.",
        daysAgo: 6
      },
      {
        role: 'user',
        content: "Better but still inconsistent. The left apple looks smooth, the right one choppy. Same brush, same paint.",
        daysAgo: 5
      },
      {
        role: 'assistant',
        content: "Let's develop something custom for your apple work - I'll call it the 'Crossflow Technique.' Light pressure for 4 counts, medium for 2, then light for 1, with tiny crosshatch motions. This 4:2:1 rhythm should help those red mid-tones blend smoothly.",
        daysAgo: 5
      },
      {
        role: 'user',
        content: "The Crossflow Technique transformed my apple painting! The 4:2:1 rhythm gives such smooth transitions in the red areas.",
        daysAgo: 4
      },
      {
        role: 'assistant',
        content: "Perfect! Use Crossflow for those apple mid-tones and any blending. For highlights and fine details, stick to light pressure. Your slight tremor actually helps create natural apple skin texture with the crosshatch motion.",
        daysAgo: 4
      }
    ],
  },

  // 2. PERSONAL STUDIO SETUP & WORKFLOW
  {
    chatId: '30000000-0000-0000-0000-000000000002',
    title: 'Sunset Landscape - Color Accuracy Issues',
    artworkDescription: `
    A landscape painting of a sunset over rolling hills, painted in acrylics. The colors 
    appear vibrant and warm in the painting itself, but when photographed, they look 
    dull and shifted toward green. The sky shows oranges and pinks that don't match 
    the reference photo. The artist is struggling with color consistency between 
    painting and photography due to poor studio lighting conditions.
    `,
    ragTestReason: `
    Tests RAG ability to recall:
    - Specific personal studio constraints (north-facing window blocked by oak tree)
    - Custom lighting setup details (40-watt daylight, 60-watt warm combo)
    - Personal schedule adaptation (morning vs evening painting times)
    - Unique environmental factors that only this user would have
    `,
    messages: [
      {
        role: 'user',
        content: "This sunset landscape looks vibrant while I'm painting, but when I photograph it the colors look completely different - much more dull and greenish.",
        daysAgo: 10
      },
      {
        role: 'assistant',
        content: "Color shifts between painting and photography are usually lighting issues. What's your studio setup - natural and artificial light sources?",
        daysAgo: 10
      },
      {
        role: 'user',
        content: "North-facing window but a huge oak tree blocks most light. Just using a random desk lamp for this sunset piece.",
        daysAgo: 9
      },
      {
        role: 'assistant',
        content: "That oak tree is filtering light inconsistently, making your sunset colors appear different than they are. Try this combo: 40-watt daylight LED at 45 degrees, plus 60-watt warm LED as fill. This compensates for the oak's green filtering.",
        daysAgo: 9
      },
      {
        role: 'user',
        content: "Much better color accuracy! But I notice when I work on this landscape in the evening, the colors still shift compared to morning sessions.",
        daysAgo: 8
      },
      {
        role: 'assistant',
        content: "Oak shadows change throughout the day, affecting your color perception. Paint color-critical work like this sunset between 10 AM-2 PM when shadows are consistent. For evenings, bump the warm LED to 75 watts after 4 PM.",
        daysAgo: 8
      }
    ],

  },

  // 3. PERSONAL COLOR MIXING DISCOVERY
  {
    chatId: '30000000-0000-0000-0000-000000000003',
    title: 'Stormy Seascape - Purple Cloud Breakthrough',
    artworkDescription: `
    A dramatic seascape showing turbulent waves beneath a stormy sky. The main challenge 
    is in the storm clouds, which need a specific purple-gray tone that captures the 
    ominous feeling. Initial attempts resulted in muddy browns or overly blue purples 
    that didn't convey the storm's intensity. The breakthrough comes with finding the 
    perfect storm cloud color that becomes the artist's signature.
    `,
    ragTestReason: `
    Tests RAG ability to recall:
    - Invented color name ("Thundercloud Purple")
    - Specific mixing ratios (2:1:0.5 formula)
    - Personal artistic breakthrough story
    - Custom color theory application unique to this user
    `,
    messages: [
      {
        role: 'user',
        content: "Working on this stormy seascape but can't get the right purple-gray for these threatening clouds. Either too blue or too brown.",
        daysAgo: 12
      },
      {
        role: 'assistant',
        content: "Storm clouds are tricky - they need that ominous purple-gray balance. What colors are you mixing for this seascape currently?",
        daysAgo: 12
      },
      {
        role: 'user',
        content: "Ultramarine blue with burnt umber for the storm clouds, but it's muddy. Adding red makes it too warm for the threatening mood.",
        daysAgo: 11
      },
      {
        role: 'assistant',
        content: "For dramatic storm clouds in seascapes, try starting with dioxazine purple as base, then add payne's gray and a touch of raw umber. Much cleaner than mixing from primaries.",
        daysAgo: 11
      },
      {
        role: 'user',
        content: "Perfect storm cloud color! Found the ratio: 2 parts dioxazine purple, 1 part payne's gray, half part raw umber. Exactly the threatening mood I wanted for this seascape!",
        daysAgo: 10
      },
      {
        role: 'assistant',
        content: "Excellent! That 2:1:0.5 ratio is your signature 'Thundercloud Purple.' Perfect for dramatic seascapes. Add tiny burnt sienna for sunset storms, or more payne's gray for winter ocean scenes.",
        daysAgo: 10
      }
    ],
  },

  // 4. PERSONAL ARTISTIC CHALLENGE & SOLUTION
  {
    chatId: '30000000-0000-0000-0000-000000000004',
    title: 'Portrait Drawing - Left-Handed Smudging Issues',
    artworkDescription: `
    A charcoal portrait of an elderly woman with detailed facial features and subtle 
    shading. The drawing shows evidence of smudging issues, particularly in the 
    hair and background areas where the artist's left hand has dragged across 
    previously drawn sections. Some areas are crisp and clean while others show 
    unintended blending and loss of detail. The artist struggles with hand 
    placement due to both being left-handed and having wrist weakness.
    `,
    ragTestReason: `
    Tests RAG ability to recall:
    - Personal physical characteristic (left-handed with wrist weakness)
    - Custom technique adaptation ("Anchor Point Method")
    - Specific personal story about injury recovery
    - Unique problem-solving approach that wouldn't exist in training data
    `,
    messages: [
      {
        role: 'user',
        content: "Working on this portrait but charcoal keeps smudging. Being left-handed, my hand drags across the woman's hair and ruins the detail work.",
        daysAgo: 15
      },
      {
        role: 'assistant',
        content: "Left-handed charcoal portrait challenges! Do you work flat or on easel? Are you resting your wrist on the paper while drawing her features?",
        daysAgo: 15
      },
      {
        role: 'user',
        content: "Work flat, and yes I rest my wrist - old injury makes it weak. Without support my hand shakes too much for the fine facial details.",
        daysAgo: 14
      },
      {
        role: 'assistant',
        content: "Let's work with your wrist needs for portrait work. Try the 'Anchor Point Method' - fold paper towel into small square, use as barrier between wrist and drawing. Complete the woman's face in sections before moving the towel.",
        daysAgo: 14
      },
      {
        role: 'user',
        content: "Anchor Point Method helps with the portrait! Still some smudging when moving between facial features though.",
        daysAgo: 12
      },
      {
        role: 'assistant',
        content: "For detailed portraits, fold the towel thicker for better barrier. Also spray workable fixative on completed sections like the eyes before moving to the nose area. This protects your portrait work while keeping the wrist support you need.",
        daysAgo: 12
      }
    ],
  }

  // 5. PERSONAL ARTISTIC SERIES & PROGRESSION
  {
    chatId: '30000000-0000-0000-0000-000000000005',
    title: 'Coffee Shop Portrait Series',
    ragTestReason: `
    Tests RAG ability to recall:
    - Specific personal project details ("Barista Chronicles" series)
    - Individual artwork progression (Emma #1, #2, #3 with specific improvements)
    - Personal artistic goals and timeline
    - Unique subject matter and approach that's specific to this user's life
    `,
    messages: [
      {
        role: 'user',
        content: "I want to start a portrait series of the baristas at my local coffee shop. I go there every morning and I think it would be a fun project.",
        daysAgo: 25
      },
      {
        role: 'assistant',
        content: "What a wonderful project idea! Portrait series can really help develop your skills. What's your plan - are you thinking of painting them from life, or working from photos? And how many portraits are you envisioning?",
        daysAgo: 25
      },
      {
        role: 'user',
        content: "I'm thinking photos to start with, since they're always busy. Maybe 6-8 portraits total. I want to call it my 'Barista Chronicles' series. Emma, the morning shift manager, said she'd love to be first!",
        daysAgo: 24
      },
      {
        role: 'assistant',
        content: "'Barista Chronicles' is a perfect title! Starting with Emma is smart - having an enthusiastic first subject helps set the tone. For consistency across your series, establish a standard format: similar lighting, same canvas size, and consistent background approach. What medium are you planning to use?",
        daysAgo: 24
      },
      {
        role: 'user',
        content: "I finished Emma #1 in acrylics! But I'm not happy with the skin tones - they look too orange. Emma has this beautiful olive complexion that I just couldn't capture right.",
        daysAgo: 20
      },
      {
        role: 'assistant',
        content: "Olive skin tones are challenging in acrylics! The key is avoiding the orange trap. For Emma #2, try this approach: start with a cool undertone using raw umber mixed with a tiny bit of green, then build up with warm tones. Emma's olive complexion probably has subtle green undertones that need to be honored in your base layer.",
        daysAgo: 20
      },
      {
        role: 'user',
        content: "Emma #2 is so much better! The cool undertone approach worked perfectly. She was thrilled when I showed her the difference. Now I'm ready to start Emma #3 - I want to capture her mid-laugh expression this time.",
        daysAgo: 15
      },
      {
        role: 'assistant',
        content: "Fantastic progress in your Barista Chronicles! Emma #3 with the laughing expression will be a great addition to show her personality. For capturing laughter in portraits, focus on the eyes as much as the mouth - genuine laughter creates specific crinkles around the eyes. Since you've mastered her skin tones in Emma #2, you can focus on the expression dynamics in #3.",
        daysAgo: 15
      },
      {
        role: 'user',
        content: "Emma #3 turned out amazing! The laugh lines around her eyes really brought it to life. The coffee shop owner wants to display all three Emma portraits together as a triptych. Should I start on the next barista now?",
        daysAgo: 10
      },
      {
        role: 'assistant',
        content: "How exciting that they want to display your Emma triptych! That's a testament to your skill development through the series. Before starting the next barista, consider what you learned from Emma's three portraits - the skin tone technique, the expression work, the personality capture. These insights will make your next subject even stronger in your Barista Chronicles series.",
        daysAgo: 10
      }
    ],
  }
];