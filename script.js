
var color = [
    'rgb(255,0,0)', 'rgb(255,255,0)','rgb(0,0,100)','rgb(255,0,189)','rgb(102,0,51)','rgb(0,255,255)','rgb(175,175,175)'
];

var x = [];
var y = [];
var helpA = [];
var helpB = [];
var helpC = [];
var helpD = [];
var helpE = [];
var helpFx = [];
var helpFn = [];

window.onresize = function (){
    loadBarGraph();
    loadMyGraph();
    loadPieGraph();
};

var body = document.getElementById('myBody');
body.onload = function kresliGraf(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        // Request finished and response
        // is ready and Status is "OK"
        if (this.readyState == 4 && this.status == 200) {
            empDetails(this);
        }
    };

    // employee.xml is the external xml file
    xmlhttp.open("GET", "z03.xml", true);
    xmlhttp.send();
};

function empDetails(xml) {
    var xmlDoc = xml.responseXML;

    var zaznam = xmlDoc.getElementsByTagName("zaznam");


    for (var i = 0; i < zaznam.length; i++) {
        var hodnotenie = zaznam[i].getElementsByTagName("hodnotenie");

        x[i] = zaznam[i].childNodes[1].childNodes[0].nodeValue;
        helpA[i] = hodnotenie[0].getElementsByTagName('A')[0].childNodes[0].nodeValue;
        helpB[i] = hodnotenie[0].getElementsByTagName('B')[0].childNodes[0].nodeValue;
        helpC[i] = hodnotenie[0].getElementsByTagName('C')[0].childNodes[0].nodeValue;
        helpD[i] = hodnotenie[0].getElementsByTagName('D')[0].childNodes[0].nodeValue;
        helpE[i] = hodnotenie[0].getElementsByTagName('E')[0].childNodes[0].nodeValue;
        helpFx[i] = hodnotenie[0].getElementsByTagName('FX')[0].childNodes[0].nodeValue;
        helpFn[i] = hodnotenie[0].getElementsByTagName('FN')[0].childNodes[0].nodeValue;

    }
    y[0] = helpA;
    y[1] = helpB;
    y[2] = helpC;
    y[3] = helpD;
    y[4] = helpE;
    y[5] = helpFn;
    y[6] = helpFx;

    loadBarGraph();
    loadMyGraph();
    loadPieGraph();

}

function loadBarGraph() {


    var trace1 = {
        x: x,
        y: y[0],
        type: 'bar',
        name: 'A',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(255,0,0)',
            opacity: 0.7,
        },
    };

    var trace2 = {
        x: x,
        y: y[1],
        type: 'bar',
        name: 'B',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(255,255,0)',
            opacity: 0.7,
        }
    };
    var trace3 = {
        x: x,
        y: y[2],
        type: 'bar',
        name: 'C',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(0,0,100)',
            opacity: 0.7,
        }
    };

    var trace4 = {
        x: x,
        y: y[3],
        type: 'bar',
        name: 'D',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(255,0,189)',
            opacity: 0.7,
        }
    };
    var trace5 = {
        x: x,
        y: y[4],
        type: 'bar',
        name: 'E',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(102,0,51)',
            opacity: 0.7,
        }
    };
    var trace6 = {
        x: x,
        y: y[5],
        type: 'bar',
        name: 'FX',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(0,255,255)',
            opacity: 0.7,
        }
    };
    var trace7 = {
        x: x,
        y: y[6],
        type: 'bar',
        name: 'FN',
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1.5
            },
            color: 'rgb(175,175,175)',
            opacity: 0.7,
        }
    };


    var layoutBar = {

        barmode: 'group',
        xaxis: {
            title: {
                text: 'Akademické roky'
            }
        },
        yaxis: {
            title: {
                text: 'Počet žiakov'
            }
        },
    };

    var dataBar = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

    if(screen.width <= 768){
        dataBar = changeAxis(dataBar);
        layoutBar.xaxis.title = 'Počet žiakov';
        layoutBar.yaxis.title = 'Akademické roky';
        layoutBar.yaxis.tickangle = -60;
        layoutBar.yaxis.ticklen = 10;
    }

    Plotly.newPlot('myDiv', dataBar, layoutBar);
}

function changeAxis(dataBar){
    for(var i = 0; i < dataBar.length; i++){
        var tmp = dataBar[i].x;
        dataBar[i].x = dataBar[i].y;
        dataBar[i].y = tmp;
        dataBar[i].orientation = 'h';
    }

    return dataBar;
}
function loadMyGraph(){

    var traceFX = {
        x: x,
        y: y[5],
        name: 'FX',
        mode: 'lines+markers',
        type: 'scatter',
        marker: {
            color: 'rgb(0,255,255)',
            opacity: 0.7,
        }
    };

    var traceFN = {
        x: x,
        y: y[6],
        name: 'FN',
        mode: 'lines+markers',
        type: 'scatter',
        marker: {
            color: 'rgb(175,175,175)',
            opacity: 0.7,
        }
    };
    var layout = {

        xaxis: {
            title: {
                text: 'Akademické roky'
            }
        },
        yaxis: {
            title: {
                text: 'Počet žiakov'
            }
        },
    };

    var data = [traceFX, traceFN];

    Plotly.newPlot('myDivGraph', data, layout);
}

function loadPieGraph() {
    var dataPie1 = [{
        type: "pie",
        values: [y[0][0], y[1][0], y[2][0], y[3][0], y[4][0], y[5][0], y[6][0]],
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        marker: {
            colors: color
        },
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: x[0]
    }];

    var dataPie2 = [{
        type: "pie",
        values: [y[0][1], y[1][1], y[2][1], y[3][1], y[4][1], y[5][1], y[6][1]],
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        marker: {
            colors: color
        },
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: x[1]
    }];


    var dataPie3 = [{
        type: "pie",
        values: [y[0][2], y[1][2], y[2][2], y[3][2], y[4][2], y[5][2], y[6][2]],
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        marker: {
            colors: color
        },
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: x[2]
    }];

    var dataPie4 = [{
        type: "pie",
        values: [y[0][3], y[1][3], y[2][3], y[3][3], y[4][3], y[5][3], y[6][3]],
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        marker: {
            colors: color
        },
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: x[3]
    }];

    var dataPie5 = [{
        type: "pie",
        values: [y[0][4], y[1][4], y[2][4], y[3][4], y[4][4], y[5][4], y[6][4]],
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        marker: {
            colors: color
        },
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: x[4]
    }];

    var dataPie6 = [{
        type: "pie",
        values: [y[0][5], y[1][5], y[2][5], y[3][5], y[4][5], y[5][5], y[6][5]],
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        marker: {
            colors: color
        },
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: x[5]
    }];

    var layoutPie = {
        autosize: true,
        showlegend: false
    };

    Plotly.newPlot('myDivPie1', dataPie1, layoutPie);
    Plotly.newPlot('myDivPie2', dataPie2, layoutPie);
    Plotly.newPlot('myDivPie3', dataPie3, layoutPie);
    Plotly.newPlot('myDivPie4', dataPie4, layoutPie);
    Plotly.newPlot('myDivPie5', dataPie5, layoutPie);
    Plotly.newPlot('myDivPie6', dataPie6, layoutPie);

}

