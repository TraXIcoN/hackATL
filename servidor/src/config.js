const config = {
  height: 400,
  width: 800,
  node: {
    color: "lightblue",
    size: 300,
    highlightStrokeColor: "blue",
    highlightColor: "lightgreen",
    labelProperty: "name", // Use the name property for labels
  },
  link: {
    highlightColor: "lightblue",
  },
  directed: true,
  automaticRearrangeAfterDropNode: true,
  collapsible: true,
};

module.exports = config;
