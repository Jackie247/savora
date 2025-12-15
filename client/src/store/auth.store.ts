// src/store/auth.store.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface AuthStore {
	session: Session | null;
	loading: boolean;
	initialized: boolean;
	init: () => Promise<void>;
	unsubscribe?: () => void;
	signOut: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
	session: null,
	loading: true,
	initialized: false,
	unsubscribe: undefined,

	init: async () => {
		if (get().initialized) return; // prevent double init (StrictMode)
		set({ loading: true, initialized: true });

		// initial session from client (local)
		const { data } = await supabase.auth.getSession();
		set((state) => ({
			...state,
			session: data.session,
			loading: false
		}));

		// one global subscription
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(event, session) => {
				// ignore initial emission that may contain `null`
				if (event === "INITIAL_SESSION") return;

				switch (event) {
					case "SIGNED_IN":
					case "TOKEN_REFRESHED":
					case "USER_UPDATED":
						set({ session });
						break;
					case "SIGNED_OUT":
						set({ session: null });
						break;
					default:
						break;
				}
			}
		);

		// store unsubscribe so callers (App) can clean up if needed
		set({
			unsubscribe: () => {
				try {
					subscription.unsubscribe();
				} catch (e) {
					// ignore unsubscribe errors in cleanup
				}
				set({ unsubscribe: undefined });
			},
		});
	},

	signOut: async () => {
		await supabase.auth.signOut();
		// SIGNED_OUT event will update the store
	},
}));

export default useAuthStore;
