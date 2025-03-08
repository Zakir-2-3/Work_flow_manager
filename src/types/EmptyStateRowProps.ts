import { RowData } from "./RowData";

export interface EmptyStateRowProps {
  isEditing: boolean;
  onRowAdded: (rowData: RowData) => Promise<void>;
  onAddNestedRow: () => void;
}
