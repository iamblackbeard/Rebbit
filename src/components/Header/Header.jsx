import React from "react";

export default function Header({ additionalClass }) {
  return (
    <header
      className={`bg-primary shadow  text-white fixed w-full z-50 top-0 left-0  p-4 ${additionalClass} `}
    >
      <div>Rebbit</div>
    </header>
  );
}
