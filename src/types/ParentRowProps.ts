import { Row } from "./RowData";

export interface ParentRowProps {
  row: Row;
  editingRowId: string | null;
  onAddNestedRow: (parentId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onDoubleClick: (rowId: string) => void;
  onKeyDown: (e: React.KeyboardEvent, rowId: string) => void;
}
