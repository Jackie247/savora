import type { TableType } from "../../../../types/table.types.ts";

const convertToTitle = (tab: TableType) => {
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
