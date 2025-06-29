
To access the RAG features - must use account:
hello@example.com
123456
Synthetic data is attached to this user. 



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


Alex - User Story
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


Getting Started
1. Clone the repo - https://github.com/davidvanstory/SnapClone
2. Installs dependencies - npm install
3. Set up environment variables (e.g. OpenAI key, Supabase URL, etc.)
4. Run locally - expo start


Tech Stack
React Native + Expo
Shadcn
Supabase (database, auth, storage)
gpt4o, text-embeddings-3-large (AI and RAG)
pgvector (vector embeddings, similarity search)
