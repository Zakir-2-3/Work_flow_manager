import { FC, useState } from "react";

import { EmptyStateRowProps } from "../../types/EmptyStateRowProps";

import tableLevelIcon from "../../assets/icons/table-level-icon.svg";
import tableLevelDelIcon from "../../assets/icons/table-level-del-icon.svg";

const EmptyStateRow: FC<EmptyStateRowProps> = ({
  onRowAdded,
  onAddNestedRow,
  isEditing,
}) => {
  const [rowName, setRowName] = useState("");
  const [salary, setSalary] = useState<string | number>("");
  const [equipmentCosts, setEquipmentCosts] = useState<string | number>("");
  const [overheads, setOverheads] = useState<string | number>("");
  const [estimatedProfit, setEstimatedProfit] = useState<string | number>("");

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && rowName.trim() !== "") {
      try {
        const rowData = {
          rowName,
          parentId: null,
          salary: salary === "" ? 0 : Number(salary), // Заменяем пустую строку на 0
          equipmentCosts: equipmentCosts === "" ? 0 : Number(equipmentCosts),
          overheads: overheads === "" ? 0 : Number(overheads),
          estimatedProfit: estimatedProfit === "" ? 0 : Number(estimatedProfit),
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,
        };
        await onRowAdded(rowData);

        // Очищаем поля после успешного создания
        setRowName("");
        setSalary("");
        setEquipmentCosts("");
        setOverheads("");
        setEstimatedProfit("");
      } catch (error) {
        console.error("Ошибка при добавлении строки:", error);
      }
    }
  };

  return (
    <tr className="workspace__table-row workspace__table-row--nested workspace__table-row-default">
      <td className="workspace__table-cell">
        <div className="workspace__table-interaction">
          <button onClick={onAddNestedRow} disabled={isEditing}>
            <img src={tableLevelIcon} alt="table-level-icon" />
          </button>
          <button disabled={isEditing}>
            <img src={tableLevelDelIcon} alt="table-level-del-icon" />
          </button>
        </div>
      </td>
      <td className="workspace__table-cell">
        <input
          type="text"
          className="workspace__table-cell-input"
          value={rowName}
          onChange={(e) => setRowName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите название..."
        />
      </td>
      <td className="workspace__table-cell">
        <input
          type="number"
          className="workspace__table-cell-input"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0"
        />
      </td>
      <td className="workspace__table-cell">
        <input
          type="number"
          className="workspace__table-cell-input"
          value={equipmentCosts}
          onChange={(e) => setEquipmentCosts(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0"
        />
      </td>
      <td className="workspace__table-cell">
        <input
          type="number"
          className="workspace__table-cell-input"
          value={overheads}
          onChange={(e) => setOverheads(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0"
        />
      </td>
      <td className="workspace__table-cell">
        <input
          type="number"
          className="workspace__table-cell-input"
          value={estimatedProfit}
          onChange={(e) => setEstimatedProfit(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0"
        />
      </td>
    </tr>
  );
};

export default EmptyStateRow;
