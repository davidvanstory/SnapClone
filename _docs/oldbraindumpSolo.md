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
    - [ ] The AI tutor must be able to analyze user-uploaded images. This will be implemented using a multimodal model like **OpenAI's GPT-4o**.
    - [ ] **Image Upload Workflow:** When a user uploads an image in the chat, the app will first upload the file to Supabase Storage. This is a standard industry practice that provides a secure, permanent URL for the media file, which is then used for the API call.

### Backend & RAG Implementation
- [ ] **Database Schema (Supabase):**
    - [ ] Create a new Supabase migration to add two tables:
        - [ ] **`solo_ai_chats`**: Acts as a container for each conversation thread (Columns: `id`, `user_id`, `created_at`, `title`).
        - [ ] **`solo_ai_messages`**: Stores every message bubble (Columns: `id`, `chat_id`, `role`, `content`, `image_url` (nullable), `embedding`).
    - [ ] The `solo_ai_messages.embedding` column will be of type `vector` and will utilize the `pgvector` extension.
- [ ] **RAG on Textual Analysis (MVP Strategy):**
    - [ ] For the MVP, RAG will be performed on the **text content** of the conversation (user prompts and the AI's textual analysis of images). Image data itself will not be converted into vectors for retrieval.
    - [ ] When an image is analyzed, the AI's rich textual feedback is converted to a text embedding and stored for future retrieval.
- [ ] **Supabase Edge Function (`get-ai-response`):**
    - [ ] This function will contain the complete, self-contained RAG logic:
        1.  **Receive Request:** The function is triggered with the user's new prompt, the `chat_id`, and an optional `image_url`.
        2.  **Generate Query Embedding:** Create a text embedding from the user's new text prompt.
        3.  **Retrieve Relevant History (Long-Term Memory):** Perform a vector similarity search on the `solo_ai_messages` table to find the most relevant historical messages from the user's entire chat history.
        4.  **Retrieve Recent Conversation (Short-Term Memory):** Fetch the last 4-6 messages from the current `chat_id` to maintain the immediate conversational flow.
        5.  **Augment the Prompt:** Construct a final, enhanced prompt for the LLM. This prompt will include the user's current question, the *retrieved historical messages*, and the *recent conversation messages*.
        6.  **Generate Response (Multimodal Step):** Send the augmented prompt (and the `image_url`, if provided) to the OpenAI GPT-4o API. The model will use the text context to inform its analysis of the image.
        7.  **Persist Conversation:** After receiving the AI's response, save both the user's message and the AI's response as new rows in the `solo_ai_messages` table. This includes generating and storing a new text embedding for each message to make them retrievable in the future.

### Synthetic Demo Data
- [ ] A new `seed.sql` script will be created to populate the Solo Tutor with a rich, **five-chat history** for a demo user ("Alex").
- [ ] The synthetic chats will cover a range of topics (e.g., hand proportions, perspective basics, color theory, composition) and will be structured to build on each other, allowing a demo to compellingly showcase the RAG system's "memory" and personalization.
- [ ] The seed script must include pre-computed embeddings for the synthetic messages.

## Design Requests
- [ ] **Tab Bar:** The bottom tab bar will contain three items: "Class Feed," "Camera," and "Solo Feed," maintaining consistency with the current app structure.
- [ ] **Solo Tutor Chat UI:**
    - [ ] The chat interface should reuse existing components (`GlassMorphismCard`, `ThemedText`).
    - [ ] Chat bubbles for the user and AI should be clearly distinguishable (e.g., right-aligned for the user, left-aligned for the AI).
    - [ ] When an image is part of a message, it should be displayed in a card format within the chat log, **not** as a full-screen background.
- [ ] **Chat Input Area:**
    - [ ] The text input field at the bottom of the screen will be contained within a glass morphism card.
    - [ ] This card will also feature distinct, tappable icons for **"Take a Picture"** and **"Upload a Picture"**.

## Other Notes
- **Key Technical Decision:** The entire backend, including the vector database, will be handled by **Supabase** and its `pgvector` extension.
- **Future RAG Enhancements:** While the MVP uses text-based RAG, the architecture is designed to potentially incorporate multimodal embedding models like CLIP in the future for more advanced image-based retrieval.
- **Error Handling:** The chat UI must gracefully handle potential API errors from OpenAI or the Edge Function, displaying a user-friendly message.