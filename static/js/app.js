// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Set up a variable to hold the data for use later
var sample_data = {}

function init() {
    d3.json(url).then((data) => {
      // Save the data for use later
      sample_data = data
      // Create the drop down from the names in the data
      let dropDown = d3.select("#selDataset")
      data.names.forEach((id) => {
        dropDown.append("option").text(id).property("value", id)
      })

      barChart(data.names[0], data)
      bubbleChart(data.names[0], data)
      metaData(data.names[0], data)
    }
  )
}

function getSampleInfo(sample_name, data) {
    // Retrieve all sample data
    let samples = data. samples 

    // Find the sample with the correct sample sample_name
    let sample = samples.find(item => item.id == sample_name)

    // Return the otu_ids, sample_values, otu_labels
    return [sample.otu_ids, sample.sample_values, sample.otu_labels]
}

function metaData(sample_name, data){ 
    let metadata = data.metadata.find(item => item.id == sample_name)
    d3.select("#sample-metadata").html("")

    // Use Object.entries to add each key/value pair to the panel
    Object.entries(metadata).forEach(([key,value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
    })
}

function barChart(sample_name, data) {
    let sample_info = getSampleInfo(sample_name, data)

    // Set top ten items to display in descending order
    let yticks = sample_info[0].slice(0,10).map(id => `OTU ${id}`).reverse()
    let xticks = sample_info[1].slice(0,10).reverse()
    let labels = sample_info[2].slice(0,10).reverse()

    // Set up the trace for the bar chart
    let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h"
        }

    // Setup the layout
    let layout = {
        title: "Top 10 OTUs Present"
        }

    // Call Plotly to plot the bar chart
    Plotly.newPlot("bar", [trace], layout)

}

function optionChanged(value) { 
    // Call all functions 
    barChart(value, sample_data)
    bubbleChart(value, sample_data)
    metaData(value, sample_data)
}

function bubbleChart(sample_name, data) { 
    let sample_info = getSampleInfo(sample_name, data)
   
    // Set up the trace for the bubble chart
    let trace = {
        x: sample_info[0],
        y: sample_info[1],
        text: sample_info[2],
        mode: "markers", 
        marker: {
            size: sample_info[1],
            color: sample_info[0], 
            colorscale: 'YlGnBu'
        }
    
        }
    // Set up the layout
    let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        }

    // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", [trace], layout)
}

// Call the initialize function
init()
