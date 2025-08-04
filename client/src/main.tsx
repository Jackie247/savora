import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Finances from "./pages/Finances/Finances.tsx";
import "./index.css";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/finances" element={<Finances />} />
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
