import TableBody from "@/src/components/TableBody";

export default function Home() {
  return (
    <div className="overflow-x-auto" style={{height: "calc(100vh - 4rem)"}}>
      <table className="table table-pin-rows bg-base-100">
        <thead>
        <tr>
          <th></th>
          <th>日期</th>
          <th>时间</th>
          <th>地点</th>
          <th>车程时间</th>
          <th>距离</th>
        </tr>
        </thead>
        <TableBody/>
      </table>
    </div>
  )
}
