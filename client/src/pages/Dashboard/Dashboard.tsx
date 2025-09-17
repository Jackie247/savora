import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { useEffect } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import Header from "../../components/Header";
import useAuthStore from "../../store/auth.store";
import SummaryBox from "./SummaryBox";
import MobileHeader from "../../components/MobileHeader";
import Carousel from "../../components/Carousel";

function Dashboard() {
	const user = useUser();
	const authStore = useAuthStore();
	// console.log("Clerk user data is", user.user);
	// console.log(`Current user ID is ${authStore.currentUserId}`);

	const handleInitialLoad = async () => {
		if (user.isLoaded && user.isSignedIn) {
			try {
				const email = user.user.primaryEmailAddress?.emailAddress;
				const clerkId = user.user.id;
				if (!email) {
					return;
				}
				const userFound = await authStore.findUser(email);

				if (!userFound) {
					await authStore.addUser(email, clerkId);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		handleInitialLoad();
	}, [user.isLoaded, user.isSignedIn, user.user?.id]);

	return (
		<>
			<ClerkLoaded>
				<div className="flex flex-col min-h-screen">
					<div className="block md:hidden">
						<MobileHeader />
					</div>
					<div className="hidden md:block">
						<Header />
					</div>
					<SignedIn>
						<div className="flex-1 bg-gray-50">
							<section className="my-8 grid grid-cols-2 justify-items-center">
								<button className="flex bg-white border border-gray-100 shadow-sm rounded-sm w-3/4 p-1 justify-center">
									This month
								</button>
								<button className="flex bg-white border border-gray-100 shadow-sm rounded-sm w-3/4 p-1 justify-center">
									Last month
								</button>
							</section>
							<section className="my-8">
								<Carousel>
									<SummaryBox header="Balance" number="9450" />
									<SummaryBox header="Income" number="9450" />
									<SummaryBox header="Expenses" number="3792" />
								</Carousel>
							</section>
							<section className="my-8 flex flex-col ">
								<table>
									<tr>
										<th>Description</th>
										<th>Method</th>
										<th>Date</th>
										<th>Amount</th>
									</tr>
									<tr>
										<td>Netflix</td>
										<td>Direct Debit</td>
										<td>18/9/2025</td>
										<td>£19.99</td>
									</tr>
								</table>
							</section>
						</div>
					</SignedIn>
				</div>
			</ClerkLoaded>
			<ClerkLoading>Loading...</ClerkLoading>
		</>
	);
}

export default Dashboard;
