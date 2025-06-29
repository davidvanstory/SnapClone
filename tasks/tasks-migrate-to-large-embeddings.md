# Task List: Migrate to Large Embedding Model

**Goal**: Migrate from OpenAI's text-embedding-3-small (1536 dimensions) to text-embedding-3-large (3072 dimensions) for improved RAG accuracy and higher similarity scores.

**Expected Outcome**: RAG system with similarity scores of 0.65-0.80+ instead of current 0.43-0.51, allowing for more selective similarity thresholds.

## Relevant Files

- `supabase/migrations/20250629000001_upgrade_to_large_embeddings.sql` - New migration to update database schema for 3072 dimensions
- `supabase/migrations/20250103000001_create_solo_tables.sql` - Reference for current schema structure (has 2 vector(1536) references)
- `supabase/functions/get-ai-response/index.ts` - Edge function that needs embedding model update for future conversations
- `scripts/inject-synthetic-data.mjs` - Main script to update for demo data regeneration with text-embedding-3-large
- `supabase/migrations/20241218000000_add_solo_demo_data.sql` - Contains 1536-dimension embeddings that will be wiped
- `readme.txt` - Documentation that references text-embedding-3-small (1536 dimensions)
- `scripts/generate_solo_embeddings.mjs` - Legacy script to be deleted (obsolete demo data, wrong user ID)

### Notes

- **FOCUS**: Demo data and future conversations only (no existing user data preservation needed)
- **CRITICAL**: All existing embeddings will be incompatible and must be regenerated
- **Downtime**: RAG system will be temporarily non-functional during migration
- **Cost**: One-time migration cost ~$0.50 for demo data, ongoing costs 6.5x higher per embedding
- **Legacy Cleanup**: Will delete obsolete scripts and demo data with wrong user IDs

## Tasks

- [ ] 1.0 Create Database Migration for Large Embeddings
  - [ ] 1.1 Create new migration file with timestamp `20250629000001_upgrade_to_large_embeddings.sql` # Standard Supabase migration naming
  - [ ] 1.2 Add SQL to alter `solo_ai_messages` table embedding column to `vector(3072)` # Schema change for large model
  - [ ] 1.3 Drop existing vector index on embedding column # Index incompatible with new dimensions
  - [ ] 1.4 Update `search_similar_messages` function to handle 3072-dimension vectors # Function parameter update
  - [ ] 1.5 Create new vector index optimized for 3072 dimensions # Performance for RAG searches
  - [ ] 1.6 Add SQL to set all existing embeddings to NULL (will be regenerated) # Clear incompatible 1536-dim data

- [ ] 2.0 Update Application Code for Large Model
  - [ ] 2.1 Update Edge Function to use `text-embedding-3-large` model for future conversations # All new messages use large model
  - [ ] 2.2 Update embedding dimension constants from 1536 to 3072 # Match new vector dimensions
  - [ ] 2.3 Adjust similarity threshold from 0.43 to 0.6 (higher accuracy expected) # Large model gives better scores
  - [ ] 2.4 Add logging for new embedding model usage # Track model usage in logs
  - [ ] 2.5 Update error handling for larger embedding responses # Handle 3072-dim API responses
  - [ ] 2.6 Update `scripts/inject-synthetic-data.mjs` to use large model + yesterday timestamps # Demo data protection from deletion
  - [ ] 2.7 Delete obsolete `scripts/generate_solo_embeddings.mjs` (wrong user ID, outdated data) # Remove legacy script
  - [ ] 2.8 Update documentation in `readme.txt` to reflect new model # Keep docs current

- [ ] 3.0 Clean Database and Regenerate Demo Data
  - [ ] 3.1 Delete all conversations from today (clean testing environment) # Remove today's test data for clean slate
  - [ ] 3.2 Clear existing demo data from database (all conversations for target user) # Remove old 1536-dim demo data
  - [ ] 3.3 Run updated `scripts/inject-synthetic-data.mjs` to regenerate demo data # Create new 3072-dim demo data
  - [ ] 3.4 Verify demo conversations have 3072-dimension embeddings # Confirm migration worked
  - [ ] 3.5 Test RAG queries against new demo data for similarity scores # Validate RAG functionality

- [ ] 4.0 Execute Database Migration
  - [ ] 4.1 Apply database migration to update schema to 3072 dimensions # Run the SQL migration
  - [ ] 4.2 Verify migration applied successfully (schema and function updated) # Check schema changes
  - [ ] 4.3 Confirm all existing embeddings are now NULL (incompatible dimensions wiped) # Verify cleanup
  - [ ] 4.4 Test Edge Function with new schema (should handle 3072-dimension embeddings) # Test compatibility

- [ ] 5.0 Validate and Test RAG System Performance
  - [ ] 5.1 Test RAG queries via curl/MCP to verify higher similarity scores (expect 0.65-0.80+) # Confirm improved accuracy
  - [ ] 5.2 Test mobile app RAG functionality end-to-end with demo data # Full system test
  - [ ] 5.3 Verify new conversations generate and store 3072-dimension embeddings # Future conversation test
  - [ ] 5.4 Test edge cases and error handling with large embeddings # Robustness testing
  - [ ] 5.5 Monitor system performance and embedding generation costs # Track performance impact
  - [ ] 5.6 Verify all hardcoded 1536 references have been updated to 3072 # Code cleanup verification
  - [ ] 5.7 Clean up old migration file with 1536-dimension embeddings if needed # Remove obsolete data 