# Project Name
ArtCritique AI: Solo Tutor

## Project Description
An ephemeral, low-stakes mobile application for art students and hobbyists to build confidence. This project focuses on adding a **private, AI-powered "Solo Tutor"** to the existing app. This feature provides a one-on-one chat interface where a user can get personalized guidance on their art. The tutor uses a Retrieval-Augmented Generation (RAG) system to learn from the user's private chat history, offering contextual, evolving feedback that acts as a dedicated art coach.

## Target Audience
- **Primary Persona (Alex):** A busy working professional (30s) new to art. He uses the existing **Class Feed** for low-stakes peer interaction and the new **Solo Tutor** for private, in-depth learning, asking questions, and building confidence without judgment.

## Desired Features
### Core App Structure & Navigation
- [ ] A new "Solo" tab will be added to the main tab bar in `app/(tabs)/_layout.tsx`.
- [ ] This tab will navigate to a new `app/(tabs)/solo.tsx` screen, which will host the AI chat interface.

### AI-Powered Solo Tutor (New Feature)
- [ ] **Chat Interface:**
    - [ ] The "Solo Feed" will be a single, continuous chat log.
    - [ ] Users can initiate conversation by sending a text-only message or by uploading an image with an accompanying text prompt.
    - [ ] A loading indicator will be displayed while the AI is generating a response.
- [ ] **Multimodal AI Interaction:**
    - [ ] The AI tutor will use a multimodal model like **OpenAI's GPT-4o** to analyze user-uploaded images.
    - [ ] **Image Upload Workflow:** When a user uploads an image, the app will first upload the file to Supabase Storage. This is a standard industry practice that provides a secure, permanent URL for the media file, which is then used in the API call to the AI.

### Backend & RAG Implementation
- [ ] **Database Schema (Supabase):**
    - [ ] A new Supabase migration will be created to add the following tables. The `pgvector` extension must be enabled in Supabase to support the `vector` type.

      ```sql
      -- Table to act as a container for each conversation thread
      CREATE TABLE solo_ai_chats (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          title TEXT, -- A user-definable title for the chat, e.g., "Hand Study Feedback"
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Table to store every individual message within a chat
      CREATE TABLE solo_ai_messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          chat_id UUID NOT NULL REFERENCES solo_ai_chats(id) ON DELETE CASCADE,
          role TEXT NOT NULL CHECK (role IN ('user', 'assistant')), -- Distinguishes who sent the message
          content TEXT NOT NULL, -- The text of the message
          image_url TEXT, -- Optional URL for an image associated with the message
          embedding vector(1536), -- Stores the text embedding for RAG. Dimension 1536 matches 'text-embedding-3-small'
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ```
- [ ] **Prompt Engineering Strategy:**
    - [ ] A detailed **System Prompt** will be designed to instruct the AI on its persona ('Canvas', a supportive tutor). It will also instruct the AI to use specific art terminology (e.g., 'composition', 'shading', 'perspective') to ensure its responses are not only helpful to the user but also generate rich text content that is ideal for creating powerful embeddings for RAG.
- [ ] **Supabase Edge Function (`get-ai-response`):**
    - [ ] This function will contain the complete, self-contained RAG logic:
        1.  **Receive Request:** The function is triggered with the user's new prompt, the `chat_id`, and an optional `image_url`.
        2.  **Generate Query Embedding:** Call the **OpenAI `text-embedding-3-small` model** to convert the user's new text prompt into a vector embedding.
        3.  **Retrieve Relevant History (Long-Term Memory):** Use the newly generated embedding to perform a vector similarity search within the `solo_ai_messages` table. This search will query the embeddings of **both past user questions and past AI answers**, ensuring the most contextually relevant information is found.
        4.  **Retrieve Recent Conversation (Short-Term Memory):** Fetch the last 4-6 messages from the current `chat_id` to maintain the immediate conversational flow.
        5.  **Augment the Prompt:** Construct a final, enhanced prompt for the LLM. This prompt will include the user's current question, the *retrieved historical messages*, and the *recent conversation messages*.
        6.  **Generate Response (Multimodal Step):** Send the augmented prompt (and the `image_url`, if provided) to the **OpenAI `GPT-4o` API**.
        7.  **Persist Both Sides of the Conversation:** After receiving the AI's response, the function will perform two `INSERT` operations into the `solo_ai_messages` table:
            - **First, save the user's message:** Create a row with `role: 'user'`, the user's text, and a newly generated embedding for that text.
            - **Second, save the AI's response:** Create a row with `role: 'assistant'`, the AI's response text, and another newly generated embedding for the AI's response. This ensures the AI's advice becomes part of its long-term memory. This includes calling the `text-embedding-3-small` model again to create and store a new embedding for each message.

### Synthetic Demo Data
- [ ] A new `seed.sql` script will be created to populate the Solo Tutor with a rich, **five-chat history** for a demo user ("Alex").
- [ ] The synthetic chats will cover a range of topics (e.g., hand proportions, perspective, color theory, composition) and will be structured to build on each other, allowing a demo to compellingly showcase the RAG system's "memory."
- [ ] The seed script must include pre-computed embeddings for the synthetic messages.

## Design Requests
- [ ] **Tab Bar:** The bottom tab bar will contain three items: "Class Feed," "Camera," and "Solo Feed."
- [ ] **Solo Tutor Chat UI:**
    - [ ] The chat interface should reuse existing components (`GlassMorphismCard`, `ThemedText`).
    - [ ] Chat bubbles for the user and AI should be clearly distinguishable (e.g., right-aligned for the user, left-aligned for the AI).
    - [ ] When an image is part of a message, it should be displayed in a card format within the chat log, **not** as a full-screen background.
- [ ] **Chat Input Area:**
    - [ ] The text input field at the bottom of the screen will be contained within a glass morphism card.
    - [ ] This card will also feature a distinct, tappable icon to **upload a picture** from the user's gallery. The "take a picture" option will be omitted from the chat UI to keep it clean.

## Other Notes
- **Technology Stack Clarification:** Embeddings will be **created** by the `OpenAI text-embedding-3-small` model. They will be **stored and searched** within Supabase using the `pgvector` extension.
- **Future RAG Enhancements:** While the MVP uses text-based RAG, the architecture is designed to potentially incorporate multimodal embedding models like CLIP in the future.
- **Error Handling:** The chat UI must gracefully handle potential API errors from OpenAI or the Edge Function, displaying a user-friendly message.