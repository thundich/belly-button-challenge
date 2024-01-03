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

      barChart(data.names[0], data)
      bubbleChart(data.names[0], data)
    }
  )
}

function barChart(sample_name, data) {
    // Retrieve all sample data
    let samples = data.samples;

    // Find the sample with the correct sample_name
    let sample = samples.find(item => item.id == sample_name);

    // Get the otu_ids, otu_lables, and sample_values
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    let sample_values = sample.sample_values;

    // Set top ten items to display in descending order
    let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let xticks = sample_values.slice(0,10).reverse();
    let labels = otu_labels.slice(0,10).reverse();

    // Set up the trace for the bar chart
    let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h"
        };

    // Setup the layout
    let layout = {
        title: "Top 10 OTUs Present"
        };

    // Call Plotly to plot the bar chart
    Plotly.newPlot("bar", [trace], layout)

}

function optionChanged(value) { 
    // Call all functions 
    barChart(value, sample_data);
    bubbleChart(value, sample_data)
}

function bubbleChart(sample_name, data) { 
    // Retrieve all sample data
    let samples = data.samples;

    // Find the sample with the correct sample_name
    let sample = samples.find(item => item.id == sample_name);

    // Get the otu_ids, otu_lables, and sample_values
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    let sample_values = sample.sample_values;

    // Set up the trace for the bubble chart
    let trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers", 
        marker: {
            size: sample_values,
            color: otu_ids, 
            colorscale: 'YlGnBu'
        }
    
        };
    // Set up the layout
    let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        };

    // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", [trace], layout)
}

// Call the initialize function
init();
