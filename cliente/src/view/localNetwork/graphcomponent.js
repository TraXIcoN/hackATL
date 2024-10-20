import React from "react";
import { Graph } from "react-d3-graph";
import config from "./config";
import data from "./data";

const GraphComponent = () => {
  return (
    <div>
      <h2>Marvel Character Network</h2>
      <Graph
        id="graph"
        data={data}
        config={config}
        onClickNode={(nodeId) => {
          console.log(`Clicked node ${nodeId}`);
        }}
        onClickLink={(source, target) => {
          console.log(`Clicked link between ${source} and ${target}`);
        }}
      />
    </div>
  );
};

export default GraphComponent;
