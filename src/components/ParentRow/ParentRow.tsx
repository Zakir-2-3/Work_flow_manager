import React from "react";

import { ParentRowProps } from "../../types/ParentRowProps";

import tableLevelIcon from "../../assets/icons/table-level-icon.svg";
import tableLevelDelIcon from "../../assets/icons/table-level-del-icon.svg";

const ParentRow: React.FC<ParentRowProps> = ({
  row,
  editingRowId,
  onAddNestedRow,
  onDeleteRow,
  onDoubleClick,
  onKeyDown,
}) => {
  return (
    <tr
      className="workspace__table-row"
      onDoubleClick={() => onDoubleClick(row.id)}
    >
      <td className="workspace__table-cell">
        <div className="workspace__table-interaction">
          <button
            onClick={() => onAddNestedRow(row.id)}
            disabled={editingRowId !== null}
          >
            <img src={tableLevelIcon} alt="table-level-icon" />
          </button>
          <button
            onClick={() => onDeleteRow(row.id)}
            disabled={editingRowId !== null}
          >
            <img src={tableLevelDelIcon} alt="table-level-del-icon" />
          </button>
        </div>
      </td>
      <td className="workspace__table-cell">
        {editingRowId === row.id ? (
          <input
            type="text"
            defaultValue={row.rowName}
            onKeyDown={(e) => onKeyDown(e, row.id)}
          />
        ) : (
          row.rowName
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === row.id ? (
          <input
            type="number"
            defaultValue={row.salary}
            onKeyDown={(e) => onKeyDown(e, row.id)}
          />
        ) : (
          row.salary
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === row.id ? (
          <input
            type="number"
            defaultValue={row.equipmentCosts}
            onKeyDown={(e) => onKeyDown(e, row.id)}
          />
        ) : (
          row.equipmentCosts
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === row.id ? (
          <input
            type="number"
            defaultValue={row.overheads}
            onKeyDown={(e) => onKeyDown(e, row.id)}
          />
        ) : (
          row.overheads
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === row.id ? (
          <input
            type="number"
            defaultValue={row.estimatedProfit}
            onKeyDown={(e) => onKeyDown(e, row.id)}
          />
        ) : (
          row.estimatedProfit
        )}
      </td>
    </tr>
  );
};

export default ParentRow;
