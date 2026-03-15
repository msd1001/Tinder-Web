import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Body() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
  // Body is parent route and it has two children route , so where those two children route will render it will render inside Body Route, with help of outlet component ;
}

export default Body;
