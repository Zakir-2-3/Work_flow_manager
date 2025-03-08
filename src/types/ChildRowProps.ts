import { Row } from "./RowData";

export interface ChildRowProps {
  childRow: Row;
  editingRowId: string | null;
  onDeleteRow: (rowId: string) => void;
  onDoubleClick: (rowId: string) => void;
  onKeyDown: (e: React.KeyboardEvent, rowId: string) => void;
}
