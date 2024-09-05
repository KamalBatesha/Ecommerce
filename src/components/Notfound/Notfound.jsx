import React, { useEffect, useState } from "react";
import Style from "./Notfound.module.css";
import img from "../../404.png";

export default function Notfound() {
  return (
    <div>
      <img src={img} className="w-100" />
    </div>
  );
}
