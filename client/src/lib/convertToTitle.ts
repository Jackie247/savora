const convertToTitle = (tab: string) => {
	switch (tab) {
		case "fixedPayments":
			return "Fixed Payments";
		case "investments":
			return "Investments";
		case "credit":
			return "Credit";
		default:
			return "Table";
	}
};

export default convertToTitle;
