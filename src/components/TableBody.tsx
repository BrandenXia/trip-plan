"use client";

import {useTableStore} from "@/src/store/TableStore";
import {toDateString, toTimeString} from "@/src/utils/DateUtils";
import React from "react";

export default function TableBody() {
  const tableData = useTableStore(state => state.tableData)
  const setTableColumn = useTableStore(state => state.setTableColumn)

  function handleDateChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    setTableColumn(index, "time", new Date(event.target.value + " " + toTimeString(tableData[index].time)))
  }

  function handleTimeChange(index:number, event: React.ChangeEvent<HTMLInputElement>) {
    setTableColumn(index, "time", new Date(toDateString(tableData[index].time) + " " + event.target.value))
  }

  function handlePlaceChange(index:number, event: React.ChangeEvent<HTMLInputElement>) {
    setTableColumn(index, "place", event.target.value)
  }

  return (
    <tbody>
    {tableData.map((row, index) => (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>
          <input
            type="date"
            value={toDateString(row.time)}
            min={toDateString(new Date())}
            onChange={(event) => handleDateChange(index, event)}
          />
        </td>
        <td>
          <input
            type="time"
            value={toTimeString(row.time)}
            min={toTimeString(new Date())}
            onChange={(event) => handleTimeChange(index, event)}
          />
        </td>
        <td className="p-0">
          <input
            className="p-3 w-full"
            type="text"
            value={row.place}
            onChange={(event) => handlePlaceChange(index, event)}
          />
        </td>
        <td>{row.driveTime}</td>
        <td>{row.distance}</td>
      </tr>
    ))}
    </tbody>
  )
}