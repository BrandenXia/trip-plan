import {NavbarMenu, NavbarMenuItem} from "@/src/components/NavbarMenu";
import {
  FileReaderButton,
  NewTableButton,
  ResultEvaluateButton,
  ResultExportButton
} from "@/src/components/NavbarFunctions";

export default function Navbar() {
  return (
    <div
      className={"bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 " +
        "backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-sm"}>
      <nav className="navbar bg-base-200">
        <a className="btn btn-ghost normal-case text-xl">Trip Plan</a>
        <div className="flex-1">
          <NavbarMenu title="文件">
            <NavbarMenuItem>
              <NewTableButton>
                新建
              </NewTableButton>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <FileReaderButton>
                导入
              </FileReaderButton>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <ResultExportButton>
                导出
              </ResultExportButton>
            </NavbarMenuItem>
          </NavbarMenu>
        </div>
        <div className="flex-none">
          <ResultEvaluateButton className="btn btn-outline btn-neutral">
            Evaluate
          </ResultEvaluateButton>
        </div>
      </nav>
    </div>
  )
}