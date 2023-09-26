class Scatterplot {
  constructor(data1) {
    const background = d3.select('#vis')
      .append('svg')
      .attr('width', '500px')
      .attr('height', '250px');

    // Inserting circles
    background.selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('r', '8px')
      .attr('cx', function (element) {
        return 20 + 450 * element['accuracy'];
      })
      .attr('cy', function (element) {
        return element['trial'] * 50;
      })
      .attr('fill', 'green')
      .attr('fill-opacity', 0.5);

    // Using linear scale
    let axisStartPosition = d3.scaleLinear()
      .range([0, 450])
      .domain([0, 1]);

    // Insert 6 black x axes
    background.selectAll('line')
      .data([0, 0.2, 0.4, 0.6, 0.8, 1.0])
      .enter()
      .append('line')
      .attr('x1', accuracy => {
        return axisStartPosition(accuracy);
      })
      .attr('x2', accuracy => {
        return axisStartPosition(accuracy);
      })
      .attr('y1', 0)
      .attr('y2', 250)
      .attr('stroke', 'black');

    // Labels on the left side of each circle row
    background.selectAll('.trial-label-left')
      .data([1, 2, 3, 4])
      .enter()
      .append('text')
      .attr('class', 'trial-label-left')
      .attr('x', -10) // Adjusted the x position to the left
      .attr('y', trial => trial * 50)
      .text(trial => "Trial " + trial);


    let averageOfTrial1 = getSumOfAccuracy(separateTrial(data1)[0]);
    let averageOfTrial2 = getSumOfAccuracy(separateTrial(data1)[1]);
    let averageOfTrial3 = getSumOfAccuracy(separateTrial(data1)[2]);
    let averageOfTrial4 = getSumOfAccuracy(separateTrial(data1)[3]);


    // Labels on the right side of each circle row
    background.selectAll('.trial-label-right')
      .data([averageOfTrial1, averageOfTrial2, averageOfTrial3, averageOfTrial4])
      .enter()
      .append('text')
      .attr('class', 'trial-label-right')
      .attr('x', 470) // Adjusted the x position to the right
      .attr('y', trial => trial * 100)
      .text(trial => trial);

    // Other labels (Accuracy, Trial/Accuracy Scatterplot, Mean accuracy per trial)
    background.append('text')
      .attr('x', 0)
      .attr('y', 235) // Adjusted the y position for "Accuracy"
      .text('Accuracy');

    background.append('text')
      .attr('x', 0)
      .attr('y', 10)
      .text('Trial/Accuracy Scatterplot');

    background.append('text')
      .attr('x', 300)
      .attr('y', 10)
      .text('Mean accuracy per trial');


    function separateTrial(myData) {
      let trial1 = [];
      let trial2 = [];
      let trial3 = [];
      let trial4 = [];
      for (let i = 0; i < data1.length; i++) {
        if (data1[i].trial == 1) {
          trial1.push(data1[i]);
        } else if (data1[i].trial == 2) {
          trial2.push(data1[i]);
        } else if (data1[i].trial == 3) {
          trial3.push(data1[i]);
        } else if (data1[i].trial == 4) {
          trial4.push(data1[i]);
        }
      }
      return [trial1, trial2, trial3, trial4]
    }

    console.log(separateTrial(data1))

    function getSumOfAccuracy(trial) {
      let sum1 = 0;
      for (let i = 0; i < trial.length; i++) {
        sum1 += parseFloat(trial[i].accuracy);
      }
      return d3.format(".2f")(sum1 / trial.length);
    }

    console.log(getSumOfAccuracy(separateTrial(data1)[3]))
  }
}