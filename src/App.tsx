import React, { useState } from "react";

import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import EmptyStateRow from "./components/EmptyStateRow/EmptyStateRow";
import ParentRow from "./components/ParentRow/ParentRow";
import ChildRow from "./components/ChildRow/ChildRow";
import AddChildRow from "./components/AddChildRow/AddChildRow";

import { useTableData } from "./hooks/useTableData";

import { NestedRowData, Row } from "./types/RowData";

import "./styles/App.scss";

function App() {
  const [nestedRows, setNestedRows] = useState<
    { parentId: string; isEditing: boolean }[]
  >([]);
  const {
    entityId,
    entityRows,
    handleAddRow,
    handleUpdateRow,
    handleDeleteRow,
  } = useTableData();
  const [editingRowId, setEditingRowId] = useState<string | null>(null);

  const handleAddNestedRow = (parentId: string) => {
    const parentRow = entityRows.find((row) => row.id === parentId);
    if (parentRow) {
      console.log("Adding nested row for parentId:", parentId);
      setNestedRows((prev) => {
        const newNestedRows = [...prev, { parentId, isEditing: true }];
        console.log("Updated nestedRows:", newNestedRows); // Логирование
        return newNestedRows;
      });
    } else {
      console.log("Parent row not found");
    }
  };

  const handleSaveNestedRow = async (
    parentId: string,
    rowData: NestedRowData
  ) => {
    if (!entityId) {
      console.error("entityId не найден");
      return;
    }

    try {
      const requestBody = {
        rowName: rowData.rowName,
        parentId: parentId ? parseInt(parentId, 10) : null,
        salary: rowData.salary || 0,
        equipmentCosts: rowData.equipmentCosts || 0,
        overheads: rowData.overheads || 0,
        estimatedProfit: rowData.estimatedProfit || 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      };

      await handleAddRow(requestBody);
      setNestedRows((prev) => prev.filter((row) => row.parentId !== parentId));
    } catch (error) {
      console.error("Ошибка при добавлении дочерней строки:", error);
    }
  };

  const handleCancelNestedRow = (parentId: string) => {
    setNestedRows((prev) => prev.filter((row) => row.parentId !== parentId));
  };

  const handleDoubleClick = (rowId: string) => {
    setEditingRowId(rowId); // Переводим строку в режим редактирования
  };

  const handleKeyDown = (e: React.KeyboardEvent, rowId: string) => {
    if (e.key === "Enter") {
      const rowElement = (e.target as HTMLInputElement).closest("tr");
      if (rowElement) {
        const inputs = rowElement.querySelectorAll("input");
        const updatedData = {
          rowName: inputs[0].value,
          salary: parseFloat(inputs[1].value) || 0,
          equipmentCosts: parseFloat(inputs[2].value) || 0,
          overheads: parseFloat(inputs[3].value) || 0,
          estimatedProfit: parseFloat(inputs[4].value) || 0,
        };

        // Вызываем handleUpdateRow с обновленными данными
        handleUpdateRow(rowId, updatedData)
          .then(() => {
            setEditingRowId(null); // Сбрасываем состояние редактирования
          })
          .catch((error) => {
            console.error("Ошибка при обновлении строки:", error);
          });
      }
    }
  };

  return (
    <main className="workspace">
      <Header />
      <Aside />
      <section className="workspace__table">
        <table>
          <thead className="workspace__table-header">
            <tr className="workspace__table-row">
              <th className="workspace__table-cell">Уровень</th>
              <th className="workspace__table-cell">Наименование работ</th>
              <th className="workspace__table-cell">Основная з/п</th>
              <th className="workspace__table-cell">Оборудование</th>
              <th className="workspace__table-cell">Накладные расходы</th>
              <th className="workspace__table-cell">Смежная прибыль</th>
            </tr>
          </thead>
          <tbody className="workspace__table-body">
            {/* Если api пустой */}
            {entityRows.length === 0 ? (
              <EmptyStateRow
                onRowAdded={handleAddRow}
                onAddNestedRow={() => handleAddNestedRow("someParentId")}
                isEditing={editingRowId !== null}
              />
            ) : (
              entityRows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Родительская строка, если есть данные в API */}
                  <ParentRow
                    row={row}
                    editingRowId={editingRowId}
                    onAddNestedRow={handleAddNestedRow}
                    onDeleteRow={handleDeleteRow}
                    onDoubleClick={handleDoubleClick}
                    onKeyDown={handleKeyDown}
                  />
                  {/* Дочерняя строка, если есть данные в API */}
                  {row.child?.map((childRow: Row) => (
                    <ChildRow
                      key={childRow.id}
                      childRow={childRow}
                      editingRowId={editingRowId}
                      onDeleteRow={handleDeleteRow}
                      onDoubleClick={handleDoubleClick}
                      onKeyDown={handleKeyDown}
                    />
                  ))}
                  {/* Добавление дочерних строк */}
                  {nestedRows
                    // Фильтруем строки для текущего родителя
                    .filter((nestedRow) => nestedRow.parentId === row.id)
                    .map((nestedRow, index) => {
                      return (
                        <AddChildRow
                          key={index}
                          onSave={(rowData) =>
                            handleSaveNestedRow(nestedRow.parentId, rowData)
                          }
                          onCancel={() =>
                            handleCancelNestedRow(nestedRow.parentId)
                          }
                          isEditing={editingRowId !== null}
                        />
                      );
                    })}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
