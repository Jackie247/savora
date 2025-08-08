// types/table.ts
export type TableType = "fixedPayments" | "investments" | "credit";

export interface TableRowData {
	// stores the base schema for a table row
	id: string;
	name?: string;
	value?: number;
	day?: number;
};


export interface NewRow extends Partial<Omit<TableRowData, 'id'>> {
	// For creating new rows (all fields optional except id)
}

// Props for TableRow component
export interface TableRowComponentProps {
	// extends the table row schema by adding functions that can manipulate the row
	row: TableRowData,
	onEdit: () => void;
  	onDelete: () => void;
};

export interface TableComponentProps {
	tableName: TableType,
};


