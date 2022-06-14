import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tgudrycpfzttxzcdwpym.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndWRyeWNwZnp0dHh6Y2R3cHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM5NDgzODQsImV4cCI6MTk2OTUyNDM4NH0.VOBxjXrgRnUb8jIScbcKh_KDvCnYhxXpAlyPMGzwKMI"
);
