export interface AddChildRowProps {
  onSave: (rowData: {
    rowName: string;
    salary: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
  }) => void;
  onCancel: () => void;
  isEditing: boolean;
}
