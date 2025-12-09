import {
	ClerkLoaded,
	ClerkLoading,
	SignedIn,
	SignedOut,
	useUser,
} from "@clerk/clerk-react";
import { Bell } from "lucide-react";
import { useEffect } from "react";
import NetflixLogo from "../../assets/icons/netflix-logo.svg?react";
import SalaryLogo from "../../assets/icons/salary-logo.svg?react";
import SpotifyLogo from "../../assets/icons/spotify-logo.svg?react";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import MobileHeader from "../../components/MobileHeader";
import useAuthStore from "../../store/auth.store";
import useTableStore from "../../store/table.store";
import SummaryBox from "./SummaryBox";
import TransactionRow from "./TransactionRow";

function Dashboard() {
	const user = useUser();
	const authStore = useAuthStore();
	// console.log("Clerk user data is", user.user);
	// console.log(`Current user ID is ${authStore.currentUserId}`);
	const { expensesTotal, getRows, calculateAllExpenses } = useTableStore();
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
		getRows(authStore.currentUserId);
		calculateAllExpenses();
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
							<section className="p-6 bg-secondary [clip-path:ellipse(120%_60%_at_50%_0%)]">
								<div className="flex flex-col">
									<span className="text-accent-text">Welcome back,</span>
									<div className="flex justify-between">
										<span className="text-2xl text-white">Jackie Yu</span>
										<button type="button" className="text-white">
											<Bell />
										</button>
									</div>
								</div>
								<div className="h-60"></div>
							</section>
							<div className="relative z-10 -mt-60 flex justify-center">
								<SummaryBox
									header="Expenses"
									balance={0}
									income={0}
									expenses={expensesTotal}
								/>
							</div>
							<section className="p-6 flex flex-col">
								<div className="flex justify-between">
									<h3>Transactions History</h3>
									<span className="text-xs self-center text-gray-500">See all</span>
								</div>

								<article>
									<TransactionRow
										title="Netflix"
										value="12.99"
										type="expense"
										date="Jan 30, 2025"
										icon={NetflixLogo}
									></TransactionRow>
								</article>

								<article>
									<TransactionRow
										title="Salary"
										value="2149.43"
										type="income"
										date="March 28, 2025"
										icon={SalaryLogo}
									></TransactionRow>
								</article>

								<article>
									<TransactionRow
										title="Spotify"
										value="4.00"
										type="expense"
										date="Jan 30, 2025"
										icon={SpotifyLogo}
									></TransactionRow>
								</article>
							</section>
						</div>
					</SignedIn>
					<SignedOut>
						<div className="flex-1 bg-gray-50">
							<div className="px-6 my-4">
								<h1 className="text-xl text-gray-600">
									Hello, welcome to Savora!
								</h1>
							</div>

							<section className="px-6 my-4 flex justify-items-center">
								<button className="bg-white border border-gray-100 shadow-sm rounded-sm  p-1 justify-center">
									This month
								</button>
								<button className=" bg-white border border-gray-100 shadow-sm rounded-sm  p-1 justify-center">
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
							<section className="px-6 my-8 flex flex-col ">
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
					</SignedOut>
				</div>
			</ClerkLoaded>
			<ClerkLoading>Loading...</ClerkLoading>
		</>
	);
}

export default Dashboard;
