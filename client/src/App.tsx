import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Expenses from "./pages/Expenses/Expenses.tsx";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route
				path="/expenses"
				element={
					<>
						<SignedIn>
							<Expenses />
						</SignedIn>
						<SignedOut>
							<RedirectToSignIn></RedirectToSignIn>
						</SignedOut>
					</>
				}
			/>
			{/* <Route path="/" element={<Options />} /> */}
			{/* <Route path="/" element={<Help />} /> */}
		</Routes>
	);
};

export default App;
