import { useEffect, useState } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import { getFloodData } from "./utils";

function App() {
  const [pieData, setPieData] = useState("");

  async function getAndProcessFloodData() {
    // get data from Environment Agency Real Time flood-monitoring API
    const floodData = await getFloodData();
    // process data
    const locations = [];
    const processedData = [];
    for (let i = 0; i < floodData.items.length; i++) {
      if (!locations.includes(floodData.items[i].eaAreaName)) {
        locations.push(floodData.items[i].eaAreaName);
        processedData.push({
          location: floodData.items[i].eaAreaName,
          number: 1,
        });
      } else {
        const targetIndex = processedData.findIndex(
          (x) => x.location === floodData.items[i].eaAreaName
        );
        const newItem = processedData[targetIndex];
        newItem.number = newItem.number + 1;
        processedData[targetIndex] = newItem;
      }
    }
    // sort data by flood number accending
    processedData.sort((p, n) => n.number - p.number);

    setPieData({
      labels: processedData.map((x) => x.location),
      datasets: [
        {
          label: "# of Flood Alerts",
          data: processedData.map((x) => x.number),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 255, 255, 0.2)",
            "rgba(255, 0, 255, 0.2)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(0, 255, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "rgba(128, 128, 128, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 255, 255, 1)",
            "rgba(255, 0, 255, 1)",
            "rgba(255, 0, 0, 1)",
            "rgba(0, 255, 0, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(128, 128, 128, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  useEffect(() => {
    getAndProcessFloodData();
  }, []);

  return (
    <div className="container">
      <h2>UK Flood Warnings</h2>
      <div className="info">
        <p>
          This website shows all the flood warnings currently issued in the UK
          by area. The data is provided for free by the{" "}
          <a
            href="http://environment.data.gov.uk/flood-monitoring/doc/reference#"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "lightBlue",
              textDecoration: "underline",
            }}
          >
            Environment Agency flood and river level real-time data API (Beta)
          </a>
          .
        </p>
      </div>
      {pieData ? <PieChart data={pieData} /> : null}
    </div>
  );
}

export default App;
