import { FC, useState } from "react";

import tableLevelIcon from "../../assets/icons/table-level-icon.svg";
import tableLevelDelIcon from "../../assets/icons/table-level-del-icon.svg";

import { AddChildRowProps } from "../../types/AddChildRowProps";

const AddChildRow: FC<AddChildRowProps> = ({ onSave, onCancel, isEditing }) => {
  const [rowName, setRowName] = useState("");
  const [salary, setSalary] = useState<string | number>("");
  const [equipmentCosts, setEquipmentCosts] = useState<string | number>("");
  const [overheads, setOverheads] = useState<string | number>("");
  const [estimatedProfit, setEstimatedProfit] = useState<string | number>("");

  const handleSave = () => {
    const rowData = {
      rowName,
      salary: salary === "" ? 0 : Number(salary), // Заменяем пустую строку на 0
      equipmentCosts: equipmentCosts === "" ? 0 : Number(equipmentCosts),
      overheads: overheads === "" ? 0 : Number(overheads),
      estimatedProfit: estimatedProfit === "" ? 0 : Number(estimatedProfit),
    };
    onSave(rowData); // Передаем данные в родительский компонент
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && rowName.trim() !== "") {
      handleSave(); // Сохраняем данные при нажатии Enter
    }
  };

  return (
    <tr className="workspace__table-row workspace__table-row--nested">
      <td className="workspace__table-cell">
        <div className="workspace__table-interaction">
          <button onClick={handleSave} disabled={isEditing}>
            <img src={tableLevelIcon} alt="table-level-icon" />
          </button>
          <button onClick={onCancel} disabled={isEditing}>
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

export default AddChildRow;
