import "../scss/loaderPage.scss";
import { useEffect, useState } from "react";
export default function Loader() {
  const [progress, setProgress] = useState<number>(10);
  useEffect(() => {
    setInterval(() => {
      setProgress(progress + 1);
    }, 50);
  }, []);


  return (
    <div className="main">
      <div className="loader"></div>
    </div>
  );
}
