"use client";

import {useTableStore} from "@/src/store/TableStore";
import {parseCSV, toCSV} from "@/src/utils/FormUtils";
import {parseDate} from "@/src/utils/DateUtils";
import {ButtonHTMLAttributes, useState} from "react";

export function NewTableButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const setTableData = useTableStore(state => state.setTableData)

  const newTable = () => setTableData([])

  return (
    <button {...props} onClick={newTable}>
      {props.children}
    </button>
  )
}

export function FileReaderButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const setTableData = useTableStore(state => state.setTableData)

  const openTable = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = () => {
      if (input.files?.length) {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = () => {
          const text = reader.result as string
          const data = parseCSV(text)
          setTableData(
            data.slice(1).map(row => ({
              time: parseDate(row[0] + " " + row[1]),
              place: row[2],
              driveTime: row[3],
              distance: row[4],
            }))
          )
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <button {...props} onClick={openTable}>
      {props.children}
    </button>
  )
}

export function ResultExportButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const tableData = useTableStore(state => state.tableData)

  const exportTable = () => {
    const data = tableData.map(row => [
      row.time?.toLocaleDateString() ?? "",
      row.time?.toLocaleTimeString() ?? "",
      row.place,
      row.driveTime,
      row.distance,
    ])
    data.unshift(['日期', '时间', '地点', '车程时间', '距离'])
    const csv = toCSV(data)
    const blob = new Blob([csv], {type: 'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trip.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button {...props} onClick={exportTable}>
      {props.children}
    </button>
  )
}

export function ResultEvaluateButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const tableData = useTableStore(state => state.tableData)
  const setTableData = useTableStore(state => state.setTableData)

  const [loading, setLoading] = useState(false)

  const evaluate = () => {
    setLoading(true)

    let data = []

    for (let i = 0; i < tableData.length - 1; i++) {
      data.push({
        origin: tableData[i].place,
        destination: tableData[i + 1].place,
        time: tableData[i].time?.getTime(),
      })
    }

    fetch('/api/googleMap', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(r => r.json())
      .then(res => {
        const newData = tableData.map((row, i) => ({
          ...row,
          driveTime: res[i]?.duration[0] !== res[i]?.duration[1] ? `${res[i]?.duration[0]} - ${res[i]?.duration[1]}` : res[i]?.duration[0],
          distance: res[i]?.distance
        }))
        setTableData(newData)
        setLoading(false)
      })
  }

  return (
    <button {...props} onClick={evaluate}>
      <span className={loading ? "loading loading-spinner" : "hidden"}/>
      {props.children}
    </button>
  )
}