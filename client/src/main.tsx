import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Expenses from "./pages/Expenses/Expenses.tsx";
import "./index.css";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/expenses" element={<Expenses />} />
					{/* <Route path="/" element={<Options />} /> */}
					{/* <Route path="/" element={<Help />} /> */}
				</Routes>
			</BrowserRouter>
		</StrictMode>,
	);
} else {
	console.log(
		"Root element not found. Ensure there is an element with id 'root' in your HTML file.",
	);
}
