// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Set up a variable to hold the data for use later
var sample_data = {}

function init() {
    d3.json(url).then((data) => {
      // Save the data for use later
      sample_data = data;
      // Create the drop down from the names in the data
      let dropDown = d3.select("#selDataset");
      data.names.forEach((id) => {
        dropDown.append("option").text(id).property("value", id)
      })
    }
  )
}

function barChart(sample_name, data) {

}

// Call the initialize function
init();
