import React from "react";
import { BsGrid1X2Fill, BsUpload, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from "react-icons/bs";
import BisTShirt from '@meronex/icons/bi/BisTShirt';
import GiShirt from '@meronex/icons/gi/GiShirt';
import GrRedhat from '@meronex/icons/gr/GrRedhat';
import GiTrousers from '@meronex/icons/gi/GiTrousers';
import GiArmoredPants from '@meronex/icons/gi/GiArmoredPants';
import { Link } from "react-router-dom";

function Sidebar({ openSideBarToggle, OpenSidebar }) {
      return (
            <aside id="sidebar" className={openSideBarToggle ? "sidebar-responsive" : ""}>
                  <div className="sidebar-title">
                        <div className="sidebar-brand">
                              <img src="/mtumbalogo.jpg" alt="Icon" className="brand-icon" />
                              ANDREW'S COLLECTION
                        </div>

                        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
                  </div>
                  <ul className="sidebar-list">
                        {/* <li className="sidebar-list-item">
                              <a href="/">
                                    <BsGrid1X2Fill className="icon" /> SHOPKEEPER
                              </a>
                        </li>
                        <li className="sidebar-list-item">
                              <a href="/UploadProduct">
                                    <BsUpload className="icon" /> Upload Products
                              </a>
                        </li> */}
                        <li className="sidebar-list-item">
                              <a href="/AllProducts">
                                    <BsFillGrid3X3GapFill className="icon" /> All Products
                              </a>
                              
                        </li>
                        <li className="sidebar-list-item">
                              <a href="/Tracks">
                                    <GiTrousers className="icon" /> Tracks
                              </a>
                        </li>
                        <li className="sidebar-list-item">
                              <a href="/Pensi">
                                    <GiArmoredPants className="icon" /> Pensi
                              </a>
                        </li>
                        <li className="sidebar-list-item">
                              <a href="/Tshirts">
                                    <BisTShirt className="icon" /> T-shirts
                              </a>
                        </li>
                        <li className="sidebar-list-item">
                              <a href="/Sweta">
                                    <GiShirt className="icon" /> Masweta
                              </a>
                        </li>
                        <li className="sidebar-list-item">
                              <a href="/Kofia">
                                    <GrRedhat className="icon" /> Kofia
                              </a>
                        </li>
                  </ul>
            </aside>
      )
}

export default Sidebar