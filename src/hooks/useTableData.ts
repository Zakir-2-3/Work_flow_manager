import { useState, useEffect } from "react";
import {
  useCreateEntityMutation,
  useGetTreeRowsQuery,
  useCreateRowInEntityMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} from "../services/entityApi";

import { Row, RowData, UpdateRowData } from "../types/RowData";

export const useTableData = () => {
  const [entityId, setEntityId] = useState<string | null>(null);
  const [createEntity] = useCreateEntityMutation();
  const { data: entityRows = [], refetch } = useGetTreeRowsQuery(entityId!, {
    skip: !entityId,
  });
  const [createRowInEntity] = useCreateRowInEntityMutation();
  const [updateRow] = useUpdateRowMutation();
  const [deleteRow] = useDeleteRowMutation();

  useEffect(() => {
    const fetchEntityId = async () => {
      const storedEntityId = localStorage.getItem("entityId");
      if (storedEntityId) {
        setEntityId(storedEntityId);
      } else {
        try {
          const newEntityId = await createEntity().unwrap();
          localStorage.setItem("entityId", newEntityId.id);
          setEntityId(newEntityId.id);
        } catch (error) {
          console.error("Ошибка при создании entity:", error);
        }
      }
    };

    fetchEntityId();
  }, [createEntity]);

  const handleAddRow = async (rowData: RowData): Promise<void> => {
    if (!entityId) {
      console.error("entityId не найден");
      return;
    }

    try {
      const requestBody = {
        rowName: rowData.rowName,
        parentId: rowData.parentId || null,
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

      await createRowInEntity({
        eID: entityId,
        rowData: requestBody,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Ошибка при добавлении строки:", error);
    }
  };

  const calculateParentRow = (
    parentRow: Row,
    childRow: Row,
    newChildData: Partial<Row>
  ) => {
    const oldChildData = parentRow.child?.find(
      (child: Row) => child.id === childRow.id
    );

    return {
      ...parentRow,
      salary:
        parentRow.salary -
        (oldChildData?.salary || 0) +
        (newChildData.salary || 0),
      equipmentCosts:
        parentRow.equipmentCosts -
        (oldChildData?.equipmentCosts || 0) +
        (newChildData.equipmentCosts || 0),
      overheads:
        parentRow.overheads -
        (oldChildData?.overheads || 0) +
        (newChildData.overheads || 0),
      estimatedProfit:
        parentRow.estimatedProfit -
        (oldChildData?.estimatedProfit || 0) +
        (newChildData.estimatedProfit || 0),
    };
  };

  const handleUpdateRow = async (rID: string, updatedData: UpdateRowData) => {
    if (!entityId) {
      console.error("entityId не найден");
      return;
    }

    try {
      // Поиск строки в entityRows (включая дочерние)
      let rowToUpdate: Row | undefined;
      let parentRow: Row | undefined;

      for (const row of entityRows) {
        if (row.id === rID) {
          rowToUpdate = row; // Нашли родительскую строку
          break;
        }
        if (row.child) {
          const childRow = row.child?.find((child: Row) => child.id === rID);
          if (childRow) {
            rowToUpdate = childRow; // Нашли дочернюю строку
            parentRow = row; // Сохраняем родительскую строку
            break;
          }
        }
      }

      if (!rowToUpdate) {
        console.error("Строка для обновления не найдена");
        return;
      }

      const requestBody = {
        rowName: updatedData.rowName,
        salary: updatedData.salary || 0,
        equipmentCosts: updatedData.equipmentCosts || 0,
        overheads: updatedData.overheads || 0,
        estimatedProfit: updatedData.estimatedProfit || 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      };

      // Обновляем строку
      await updateRow({
        eID: entityId,
        rID,
        updatedData: requestBody,
      }).unwrap();

      // Если это дочерняя строка, обновляем родительскую
      if (parentRow) {
        const updatedParentRow = calculateParentRow(
          parentRow,
          rowToUpdate,
          updatedData
        );
        await updateRow({
          eID: entityId,
          rID: parentRow.id,
          updatedData: updatedParentRow,
        }).unwrap();
      }

      console.log("Строка успешно обновлена");
      refetch(); // Обновляем данные с сервера
    } catch (error) {
      console.error("Ошибка при обновлении строки:", error);
    }
  };

  const handleDeleteRow = async (rID: string) => {
    if (!entityId) return;

    try {
      await deleteRow({ eID: entityId, rID }).unwrap();
      refetch();
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
    }
  };

  return {
    entityId,
    entityRows,
    handleAddRow,
    handleUpdateRow,
    handleDeleteRow,
    refetch,
  };
};
