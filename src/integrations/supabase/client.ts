// This file is kept for compatibility but is no longer used
// Authentication is now handled with local storage
// Database operations use localStorage instead

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: async () => ({ data: null, error: new Error('Use useAuth hook instead') }),
    signInWithPassword: async () => ({ data: null, error: new Error('Use useAuth hook instead') }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({ order: () => ({ limit: () => ({}) }), data: [], error: null }),
    insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
    update: () => ({ eq: () => ({ data: null, error: null }) }),
    delete: () => ({ eq: () => ({ data: null, error: null }) }),
  }),
  channel: () => ({
    on: () => ({ subscribe: () => {} }),
  }),
  removeChannel: () => {},
};