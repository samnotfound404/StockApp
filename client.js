import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bdpcgxpjmagdsgylrhus.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcGNneHBqbWFnZHNneWxyaHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyODQyMTYsImV4cCI6MjA0NTg2MDIxNn0.vOFUQ-5fmPsc3cNk0wqtTzuZF9fTNql3Sb6J0Ecv1kc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase