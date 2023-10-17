import {create} from "zustand";

interface TableColumn {
  time: Date | null;
  place: string;
  driveTime: string;
  distance: string;
}

interface TableState {
  tableData: TableColumn[];
  addTableData: (data: TableColumn) => void;
  removeTableData: (index: number) => void;
  setTableColumn: (index: number, key: keyof TableColumn, value: TableColumn[typeof key]) => void;
  setTableData: (data: TableColumn[]) => void;
}

export const useTableStore = create<TableState>()((set) => ({
  tableData: [],
  addTableData: (data) => set((state) => ({tableData: [...state.tableData, data]})),
  removeTableData: (index) => set((state) => ({tableData: state.tableData.filter((_, i) => i !== index)})),
  setTableColumn: (index, key, value) => set((state) => ({
    tableData: state.tableData.map((data, i) => i === index ? {...data, [key]: value} : data)
  })),
  setTableData: (data) => set({tableData: data})
}))