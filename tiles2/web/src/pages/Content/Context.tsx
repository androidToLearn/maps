import UpLine from "../../components/UpLine/UpLine";
import { Outlet } from "react-router-dom";

export default function Content() {  
  return (
    <div>
      <UpLine />
      <Outlet />
    </div>
  );
}
