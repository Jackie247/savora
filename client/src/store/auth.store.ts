import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

interface AuthStore {
	session: any | null;
	unsubscribe: (() => void) | null;

	setSession: () => Promise<void>;
	signOut: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()((set, get) => ({
	session: null,
	unsubscribe: null,
	setSession: async () => {
		// Get initial session
		const currentSession = await supabase.auth.getSession();
		console.log(currentSession)
		set({
			session: currentSession.data.session
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			set({
				session: session
			})
		})

		// cleanup function to prevent memory leaks
		set({
			unsubscribe: () => authListener.subscription.unsubscribe(),
		});
	},
	signOut: async () => {
		await supabase.auth.signOut();
		set({ session: null });
	}
}));

export default useAuthStore;