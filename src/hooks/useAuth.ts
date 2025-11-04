import { useEffect, useMemo, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithOtp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session: activeSession }
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      return;
    }

    const loadProfile = async () => {
      const { data } = await supabase.from('profiles').select('id, email, plan').eq('id', session.user.id).single();
      if (data) {
        setProfile(data as Profile);
      }
    };

    loadProfile();
  }, [session?.user?.id]);

  const actions = useMemo(
    () => ({
      signInWithOtp: async (email: string) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
        setLoading(false);
        if (error) throw error;
      },
      signOut: async () => {
        await supabase.auth.signOut();
        setProfile(null);
      }
    }),
    []
  );

  return { session, user: session?.user ?? null, profile, loading, ...actions };
}
