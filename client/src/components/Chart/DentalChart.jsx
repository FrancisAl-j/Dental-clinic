import { toPng } from "html-to-image";
import { useRef } from "react";

const DentalChart = () => {
  const elementRef = useRef(null);

  const htmlToImage = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "dental-chart.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form ref={elementRef}>
        <div className="elements">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Surname" />
        </div>
      </form>
      <button onClick={htmlToImage}>Download</button>
    </div>
  );
};

export default DentalChart;
