var amp;
var cislo = document.getElementById('cislo');

class MySettings extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");

        const tglSlider = wrapper.appendChild(document.createElement("input"));
        tglSlider.setAttribute("type","checkbox");
        tglSlider.setAttribute("id","sliderCheck");
        tglSlider.setAttribute("checked","true");

        const tglSliderLabel = wrapper.appendChild(document.createElement("label"));
        tglSliderLabel.setAttribute("for","tglSlider");
        tglSliderLabel.innerHTML = "Slider";

        const slider = wrapper.appendChild(document.createElement("input"));
        slider.setAttribute("class", "slider");
        let min = this.getAttribute("min");
        let max = this.getAttribute("max");
        slider.setAttribute("type", "range");
        slider.setAttribute("step", "1");
        slider.setAttribute("value", min);
        slider.setAttribute("min", min);
        slider.setAttribute("max", max);


        const tglinNum = wrapper.appendChild(document.createElement("input"));
        tglinNum.setAttribute("type","checkbox");
        tglinNum.setAttribute("id","inNumCheck");
        tglinNum.setAttribute("checked","true");

        const tglinNumLabel = wrapper.appendChild(document.createElement("label"));
        tglinNumLabel.setAttribute("for","tglinNum");
        tglinNumLabel.innerHTML = "Číslo";

        const inNum = wrapper.appendChild(document.createElement("input"));
        inNum.setAttribute("class", "inNum");
        inNum.setAttribute("type", "number");
        inNum.setAttribute("value", min);
        inNum.setAttribute("min", min);
        inNum.setAttribute("max", max);


        const style = document.createElement("style");
        style.textContent = `
        
        #sliderInfo{
            position: absolute;
            color: red;
            left:44%;
            font-size: large;
        }
        
        .wrapper{
            display: grid;
            grid: auto / 15% 35% 50%;
            width: 250px;
            margin-left: auto;
            margin-right: auto;
        }
        
        #sliderCheck, #inNumCheck{
            width: 20px;
        }
        .inNum{
            width: 100px;
        }

        input[type=range] {
          height: 20px;
          -webkit-appearance: none;
          width: 105px;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 5px;
          cursor: pointer;
          animate: 0.2s;
          box-shadow: 0px 0px 1px #000000;
          border-radius: 5px;
          border: 1px solid #CDD4D3;
        }
        input[type=range]::-webkit-slider-thumb {
          box-shadow: 0px 0px 1px #000000;
          border: 1px solid #C7C7C7;
          height: 20px;
          width: 30px;
          border-radius: 2px;
          background: #F7F7F7;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -8.5px;
        }

        `;

        amp = min;

        this.shadowRoot.append(style, wrapper);

        this.inputChange = (event) => {
            const customEvent = new CustomEvent('update',{
                bubbles:true,
                composed:true,
            });
            amp = event.target.value;
            if(amp > 10){
                amp = 10;
                inNum.value = 10;
            } else if(amp < 1){
                amp = 1;
                inNum.value = 1;
            }
            var pos = window.outerWidth * 0.498;

            let newVal = event.target.value;

            cislo.style.left = pos + parseInt(newVal)*8 + 'px'; //Set range left position
            cislo.innerHTML = newVal; //Set range text equal to input position
            slider.value = amp;
            this.dispatchEvent(customEvent);
        };

        this.sliderChange = (event) => {
            const customEvent = new CustomEvent('update',{
                bubbles:true,
                composed:true,
            });

            var pos = window.outerWidth * 0.498;

            let newVal = event.target.value;

            cislo.style.left = pos + parseInt(newVal)*8 + 'px'; //Set range left position
            cislo.innerHTML = newVal; //Set range text equal to input position


            amp = event.target.value;
            inNum.value = amp;
            this.dispatchEvent(customEvent);
        };

        this.tglSliderChange = () => {
            const customEvent = new CustomEvent('click',{
                bubbles:true,
                composed:true,
            });

            if(slider.style.visibility === "hidden"){
                slider.style.visibility = "visible";
                cislo.style.visibility = "visible";
            } else{
                slider.style.visibility = "hidden";
                cislo.style.visibility = "hidden";
            }
            this.dispatchEvent(customEvent);
        };

        this.tglinNumChange = () => {
            const customEvent = new CustomEvent('click',{
                bubbles:true,
                composed:true,
            });

            if(inNum.style.visibility === "hidden"){
                inNum.style.visibility = "visible";
            } else{
                inNum.style.visibility = "hidden";
            }
            this.dispatchEvent(customEvent);
        };


        inNum.addEventListener("change",this.inputChange);
        slider.addEventListener("change",this.sliderChange);
        tglSlider.addEventListener("change",this.tglSliderChange);
        tglinNum.addEventListener("change",this.tglinNumChange);

    }
}

customElements.define('my-settings',MySettings);


var kresli = true;
var zmenMod = document.getElementById("zmena");

var traceSin = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Sínus',
    visible: true
};

var traceCos = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Kosínus',
    line:{
        color:'rgb(255,165,0)'
    },
    visible: true
};

var data=[traceSin, traceCos];



zmenMod.onclick = function stop()
{
    kresli = false;
    update();

};

var source = new EventSource("http://old.iolab.sk/evaluation/sse/sse.php");
source.onmessage = function(event) {
    console.log(event.data);
};

source.addEventListener("message", function()
{
    update();
});


var sin = document.getElementById('sin');
sin.onchange = function toogleSin()
{
    traceSin.visible = !traceSin.visible;
    Plotly.newPlot('graph', data);
};

var cos = document.getElementById('cos');
cos.onchange = function toogleCos() {
    traceCos.visible = !traceCos.visible;
    Plotly.newPlot('graph', data);
};

function update(){
    if (!kresli) {
        return;
    }

    const web = JSON.parse(event.data);
    traceSin.x.push(web.x);
    traceSin.y.push(amp * web.y1);
    traceCos.x.push(web.x);
    traceCos.y.push(amp * web.y2);
    data = [traceSin,traceCos];
    Plotly.newPlot('graph', data);
}

window.onresize = function () {
    Plotly.newPlot('graph', data);
};

window.onload = function () {
    Plotly.newPlot('graph', data);
};

