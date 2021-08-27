import "./Navbar.css";
import React, { useState, useEffect } from 'react';
let Navbar = () => {
  let [paralength,setParaLength]  = useState(20);

  useEffect(()=>{
    console.log(paralength)
  },[paralength]);
  return (
  <div className="Navbar">
  <div className="Heading">TypeTester</div>
  <div className="tools">
      <div className="home"><i className="material-icons-round"> home </i></div>
      <div className="setting-btn"><i className="material-icons-round"> settings </i></div>
      <div className="account"><i className="material-icons-round"> person </i></div>
  </div>
  <div className="count-of-words">
      <h4>Words</h4>
      <div className="set-count">
      <div className="word-count active-count">10</div>
      <div className="word-count">20</div>
      <div className="word-count">50</div>
      <div className="word-count">100</div>
      <div className="word-count"><i className="material-icons-round"> handyman </i></div>
  </div>
</div>
</div>
  );
};
export default Navbar;
