import React from "react";

import { ChildRowProps } from "../../types/ChildRowProps";

import tableLevelIcon from "../../assets/icons/table-level-icon.svg";
import tableLevelDelIcon from "../../assets/icons/table-level-del-icon.svg";

const ChildRow: React.FC<ChildRowProps> = ({
  childRow,
  editingRowId,
  onDeleteRow,
  onDoubleClick,
  onKeyDown,
}) => {
  return (
    <tr
      key={childRow.id}
      className="workspace__table-row workspace__table-row--nested"
      onDoubleClick={() => onDoubleClick(childRow.id)}
    >
      <td className="workspace__table-cell">
        <div className="workspace__table-interaction">
          <button disabled>
            <img src={tableLevelIcon} alt="table-level-icon" />
          </button>
          <button
            onClick={() => onDeleteRow(childRow.id)}
            disabled={editingRowId !== null}
          >
            <img src={tableLevelDelIcon} alt="table-level-del-icon" />
          </button>
        </div>
      </td>
      <td className="workspace__table-cell">
        {editingRowId === childRow.id ? (
          <input
            type="text"
            defaultValue={childRow.rowName}
            onKeyDown={(e) => onKeyDown(e, childRow.id)}
          />
        ) : (
          childRow.rowName
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === childRow.id ? (
          <input
            type="number"
            defaultValue={childRow.salary}
            onKeyDown={(e) => onKeyDown(e, childRow.id)}
          />
        ) : (
          childRow.salary
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === childRow.id ? (
          <input
            type="number"
            defaultValue={childRow.equipmentCosts}
            onKeyDown={(e) => onKeyDown(e, childRow.id)}
          />
        ) : (
          childRow.equipmentCosts
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === childRow.id ? (
          <input
            type="number"
            defaultValue={childRow.overheads}
            onKeyDown={(e) => onKeyDown(e, childRow.id)}
          />
        ) : (
          childRow.overheads
        )}
      </td>
      <td className="workspace__table-cell">
        {editingRowId === childRow.id ? (
          <input
            type="number"
            defaultValue={childRow.estimatedProfit}
            onKeyDown={(e) => onKeyDown(e, childRow.id)}
          />
        ) : (
          childRow.estimatedProfit
        )}
      </td>
    </tr>
  );
};

export default ChildRow;
