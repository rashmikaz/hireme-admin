import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-content-bg">
      <Sidebar />
      <Topbar />
      <main className="ml-[280px] pt-[68px] p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
