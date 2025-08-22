function HomePage() {
	return (
		<body>
			<section id="topbar" className="flex justify-between p-8">
				<div id="logo">
					<span>Savora</span>
				</div>
				<div className="flex">
					<div>image</div>
					<div>account</div>
				</div>
			</section>
			<nav id="navbar" className=""></nav>
			<ul>
				<li>
					<a href="/">Dashboard</a>
				</li>
				<li>
					<a href="/expenses">Expenses</a>
				</li>
				<li>
					<a href="/options">Options</a>
				</li>
				<li>
					<a href="/help">Help</a>
				</li>
			</ul>
			<div>
				<section className="grid grid-cols-4 gap-4">
					<article>Net Worth</article>
					<article>Asset Summary</article>
				</section>
			</div>
		</body>
	);
}

export default HomePage;
