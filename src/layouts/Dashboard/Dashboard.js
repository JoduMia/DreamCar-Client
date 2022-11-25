import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../../components/shared/Header/Navbar'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-slate-100 shadow text-base-content">
            <li><Link to='/dashboard/sellers'>All sellers</Link></li>
            <li><Link to='/dashboard/buyers'>All Buyers</Link></li>
            <li><Link to='/dashboard/mybuyers'>My Buyers</Link></li>
            <li><Link to='/dashboard/myproduct'>My Products</Link></li>
            <li><Link to='/dashboard/myorder'>My Order</Link></li>
            <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
          </ul>

        </div>
      </div>

    </div>
  )
}

export default Dashboard