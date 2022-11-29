import React from "react";
import keeps from "./assets/keep.png";

import navbar from "../styles/navbar.module.css";
export default function Navbar() {
  return (
    <section className={navbar.navbar}>
      <div className={navbar.logo}>
        <img src={keeps} alt="keeps" />
      </div>
      <div className={navbar.author}>iamNEO</div>
    </section>
  );
}
