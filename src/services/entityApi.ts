import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  CreateRowRequest,
  CreateRowResponse,
  UpdateRowResponse,
} from "../types/entityTypes";

export const entityApi = createApi({
  reducerPath: "entityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://185.244.172.108:8081/v1/outlay-rows",
  }),
  endpoints: (builder) => ({
    // Создание сущности
    createEntity: builder.mutation<{ id: string }, void>({
      query: () => ({
        url: "/entity/create",
        method: "POST",
      }),
    }),

    // Получение списка строк
    getTreeRows: builder.query<any[], string>({
      query: (eID) => `/entity/${eID}/row/list`,
    }),

    // Создание строки
    createRowInEntity: builder.mutation<
      CreateRowResponse,
      { eID: string; rowData: CreateRowRequest }
    >({
      query: ({ eID, rowData }) => ({
        url: `/entity/${eID}/row/create`,
        method: "POST",
        body: rowData,
      }),
    }),

    // Обновление строки
    updateRow: builder.mutation<
      UpdateRowResponse,
      { eID: string; rID: string; updatedData: object }
    >({
      query: ({ eID, rID, updatedData }) => ({
        url: `/entity/${eID}/row/${rID}/update`,
        method: "POST",
        body: updatedData,
      }),
    }),

    // Удаление строки
    deleteRow: builder.mutation<any, { eID: string; rID: string }>({
      query: ({ eID, rID }) => ({
        url: `/entity/${eID}/row/${rID}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateEntityMutation,
  useGetTreeRowsQuery,
  useCreateRowInEntityMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = entityApi;
