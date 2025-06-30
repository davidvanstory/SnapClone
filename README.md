Mention - UI design.md
reset login for hello@example.com










Juni - AI-Powered Art Companion
Juni is a personalized AI tutor for visual artists. This mobile app helps artists get contextual, actionable feedback on their artwork using advanced AI and Retrieval-Augmented Generation (RAG) techniques. And join communities of other artists to share their work and get inspired. 

Overview
Juni is designed to support artists through intelligent, conversational feedback. It helps users improve their skills, track progress, and feel seen lower the barrier to sharing art. 
Users can capture an image of their work, engage with Juni, a tailored AI assistant, and optionally join community-driven classes for more human feedback.

Why Now?
People increasingly seek rapid feedback loops and digital tools to accelerate learning. Juni allows artists to tap into cutting-edge AI in a clean mobile-first experience to share their art and improve. 


Key Features
1. Image Capture and Sharing
Instantly photograph your art and be able to share it with Juni or a Community

2. Contextual Memory via Vector Search
Juni recalls previous critiques using a vector database, offering a continuous and personalized learning experience.

3. Conversational AI Feedback
Ask Juni questions like "How can I improve this shading?" or "What's a better composition for this piece?" and get helpful, nuanced replies.

4. Community Classrooms (Work in Progress)
Join virtual critique classes, receive peer feedback, and share your work in a low stakes setting. 

5. Onboarding & Onramp
A gentle introduction to Juni helps new users understand how to use the app and start receiving useful feedback right away.

6. Seamless user experience
Each page has been designed with simple, subtle calls to action or nudges about how to get the most out of the app. 


Alex - Persona
- Alex, who wants to improve as an illustrator takes a photo of his charcoal sketch and asks Juni how to improve facial proportions.
- Juni responds with tailored suggestions and remembers Alex’s past works, offering continuity and growth tracking.
- Alex joins a community class, shares his progress, and receives feedback from peers and the AI alike.
- He reviews his critique history and reflects on how his work has improved over time.


Screenshots
Look at the Screenshots folder in the repo to see images



AI + RAG Architecture
- Uses OpenAI's GPT-4o for conversational interaction.
- Stores critique sessions in a vector database (e.g. Supabase + pgvector) to retrieve past feedback with semantic similarity.Text-embedding-3-large used to vectorize prior conversations
- Synthetic database created to showcase RAG function, contains prior conversations with unique/non public info that isn't part of GPT-4o's latent knowledge. 
- 

Testing Focus
- Prioritizing reliability and feedback quality of the AI tutor. Ran a RAG eval and examined similarity scores to test RAG function. 
- UI usability checks to ensure the app is intuitive for both new and returning users.


To test the RAG:

Imaginary Technique
Q - what was the technique I used for painting those apples again?
- the user and AI made up a technique called the Crossflow technique for getting smooth painting in still lifes. It has a 4:2:1 rhythm for light, medium, hard pressure with tiny crosshatch motions

Injury Adaptation
- Q - I’m trying to set up the anchor technique but have forgotten it, remind me?
- The user is a leftie and was struggling with not smudging their work, because they have an old wrist injury and now it shakes without support. The user and AI came up with a way to manage this call the Anchor Technique where they stabilize with a folded paper towel which is a barrier between wrist and drawinf. 

Project Idea
- Q - Can you remind me about some key points from the Barista Chronicles?
- The user has been telling the AI about their project idea called the Barista Chronicles where they have been drawing Emma, who is the morning shift manager in a coffe shop. They drawn her 3 times now. #1 was acrylics but the skin tones were off, #2 they got Emmas olive complexion just right. #3 They did a piece where she was mid laugh and got her laugh lines around the eyes really well. 

Studio Setup
- Q - What was it thats blocking my light in front of my window?
- The user talks about the challenge of having a big oak tree block the north facing window which blocks the light in his studio so when he photographs his work it looks more dull than when he paints it. The AI suggested a 75 watt LED after 4pm. 


Tech Stack
React Native + Expo
Supabase (database, auth, storage)
gpt4o, text-embeddings-3-large (AI and RAG)
pgvector (vector embeddings, similarity search)

Getting Started
1. Clone the repo - https://github.com/davidvanstory/SnapClone
2. Installs dependencies - npm install
3. Set up environment variables (e.g. OpenAI key, Supabase URL, etc.)
4. Run locally - expo start


