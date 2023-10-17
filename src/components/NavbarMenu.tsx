import React from "react";

export function NavbarMenu(props: {
  title: string,
  children: React.ReactNode
}) {
  return (
    <div className="dropdown">
      <span tabIndex={0} className="btn btn-ghost normal-case">{props.title}</span>
      <ul className="shadow menu dropdown-content bg-base-200 rounded-box w-52">
        {props.children}
      </ul>
    </div>
  )
}

export function NavbarMenuItem(props: {children: React.ReactNode}) {
  return (
    <li tabIndex={1}>
      {props.children}
    </li>
  )
}