import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://emsttaxdrobqywfxjsyf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc3R0YXhkcm9icXl3Znhqc3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMDkwNjIsImV4cCI6MjA0NTY4NTA2Mn0.IfnQXUvCW3wjgL3IIAUcCQXFPMSwT23j5I3k9AH97J0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase