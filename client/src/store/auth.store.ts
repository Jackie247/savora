import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
	currentUserId: number;
	userExists: boolean;
	addUser: (email: string | undefined, clerkID: string) => void;
	findUser: (email: string) => Promise<boolean>;
}

const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			currentUserId: 0, // default value but should get overwritten on dashboard load
			userExists: false,
			addUser: async (email: string | undefined, clerkId: string) => {
				try {
					fetch("/api/user/addUser", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, clerkId }),
					});
				} catch (error) {
					console.log(error);
				}
			},
			findUser: async (email: string): Promise<boolean> => {
				console.log("in find user");
				try {
					const response = await fetch("/api/user/findUser", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email }),
					});

					if (!response.ok) {
						throw new Error(
							`Failed to find user with email ${email}: ${response.status}`,
						);
					}

					const data = await response.json();

					// Add these debug logs
					console.log("findUser API response:", data);
					console.log("data.id:", data.id);
					console.log("typeof data.id:", typeof data.id);

					if (data) {
						console.log("Setting currentUserId to:", data.id);
						set({ currentUserId: Number(data.id), userExists: true });

						// Verify it was actually set
						const currentState = get();
						console.log(
							"After set - currentUserId is now:",
							currentState.currentUserId,
						);
					}
					return !!data;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
		}),
		{
			name: "user-id-storage",
		},
	),
);

export default useAuthStore;
