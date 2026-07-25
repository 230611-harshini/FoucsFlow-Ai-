import { useState, useEffect, createContext, useContext } from 'react';

interface LocalUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
}

interface LocalSession {
  user: LocalUser;
  access_token: string;
}

interface AuthContextType {
  user: LocalUser | null;
  session: LocalSession | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null; session: LocalSession | null; user: LocalUser | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; session: LocalSession | null; user: LocalUser | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple local storage based auth
const getStoredUsers = (): Record<string, { password: string; fullName: string }> => {
  const stored = localStorage.getItem('focusflow_users');
  return stored ? JSON.parse(stored) : {};
};

const saveUsers = (users: Record<string, { password: string; fullName: string }>) => {
  localStorage.setItem('focusflow_users', JSON.stringify(users));
};

const getStoredSession = (): LocalSession | null => {
  const stored = localStorage.getItem('focusflow_session');
  return stored ? JSON.parse(stored) : null;
};

const saveSession = (session: LocalSession | null) => {
  if (session) {
    localStorage.setItem('focusflow_session', JSON.stringify(session));
  } else {
    localStorage.removeItem('focusflow_session');
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [session, setSession] = useState<LocalSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from storage
    const storedSession = getStoredSession();
    if (storedSession) {
      setSession(storedSession);
      setUser(storedSession.user);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const users = getStoredUsers();
      
      // Check if user already exists
      if (users[email]) {
        return {
          error: new Error('Email already registered'),
          session: null,
          user: null,
        };
      }

      // Validate inputs
      if (!email || !password || password.length < 6) {
        return {
          error: new Error('Email and password (min 6 chars) are required'),
          session: null,
          user: null,
        };
      }

      // Create new user
      const newUser: LocalUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: {
          full_name: fullName || email.split('@')[0],
        },
      };

      // Save user and create session
      users[email] = {
        password,
        fullName: fullName || email.split('@')[0],
      };
      saveUsers(users);

      const newSession: LocalSession = {
        user: newUser,
        access_token: Math.random().toString(36).substr(2),
      };

      saveSession(newSession);
      setSession(newSession);
      setUser(newUser);

      return {
        error: null,
        session: newSession,
        user: newUser,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error('Sign up failed'),
        session: null,
        user: null,
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const users = getStoredUsers();

      // Find user
      const userRecord = users[email];
      if (!userRecord) {
        return {
          error: new Error('Invalid email or password'),
          session: null,
          user: null,
        };
      }

      // Check password
      if (userRecord.password !== password) {
        return {
          error: new Error('Invalid email or password'),
          session: null,
          user: null,
        };
      }

      // Create session
      const newUser: LocalUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: {
          full_name: userRecord.fullName,
        },
      };

      const newSession: LocalSession = {
        user: newUser,
        access_token: Math.random().toString(36).substr(2),
      };

      saveSession(newSession);
      setSession(newSession);
      setUser(newUser);

      return {
        error: null,
        session: newSession,
        user: newUser,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error('Sign in failed'),
        session: null,
        user: null,
      };
    }
  };

  const signInWithGoogle = async () => {
    return { error: new Error('Google sign in is not available in offline mode') };
  };

  const signOut = async () => {
    saveSession(null);
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
