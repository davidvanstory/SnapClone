-- Add onboarding tracking field to users table
-- This field tracks whether a user has completed the first-time onboarding flow

ALTER TABLE users 
ADD COLUMN has_seen_onboarding BOOLEAN NOT NULL DEFAULT FALSE;

-- Add comment for documentation
COMMENT ON COLUMN users.has_seen_onboarding IS 'Tracks whether user has completed first-time onboarding flow';

-- Create index for efficient queries (optional but recommended for large user bases)
CREATE INDEX idx_users_onboarding ON users(has_seen_onboarding) WHERE has_seen_onboarding = FALSE; 