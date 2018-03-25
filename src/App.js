import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      initRule:1,
      jsonInput:{"onSocialmedia":true,"platform": "Facebook", "Frequency": "Daily", "firstused": "2010", "lastused":"yesterday" }
  }
  console.log(this.state);

}

isJson=(str)=> {
  try{
    return (JSON.parse(str) && !!str)
  }
  catch(e){
    return false;
  }
}

  handleChange=(event)=> {
    var check=this.isJson(event.target.value)
    if(check){
      this.setState({jsonInput: JSON.parse(event.target.value)}, () => {
        console.log(this.state, 'newstate');
      }); 
    }
    else{
      alert("Not a valid json")
      window.location.reload();
    }
   
  }
  startFlow=(id)=> {
    var jsonObj= this.state.jsonInput;
    var func1=(document.getElementById(`body${id}`).value);
    let func= eval(`(${func1})`);
    var trueid=document.getElementById(`trueid${id}`).value;
    var falseid=document.getElementById(`falseid${id}`).value;
    const funcResult = func(jsonObj);
    let nextRule = null;
    if (funcResult === true) {
        alert(`Rule ${id} has been Passed`);
        nextRule = trueid;
    } else {
        alert(`Rule ${id} has been Failed`);
        var div = document.getElementById(`rule${id}`);
        div.style.backgroundColor = 'red';
        nextRule = falseid;
    }
    if(nextRule==="")
    {
      alert("Flow has been Completed")
    }
    else{
    this.startFlow(parseInt(nextRule));
    }

  }

  submit=()=> {
    alert("Flow has been Started")
    this.startFlow(this.state.initRule)
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flow Engine</h1>
        </header>
        
        <div className="json-data">
        <label>Incoming JSON data</label>
        <input  className="json-data" type="textarea" id="inputData" onBlur={this.handleChange}  defaultValue={JSON.stringify(this.state.jsonInput)} />
        </div>


        <hr/>
            <div  className="Rule">
              <div type="button" data-toggle="collapse" data-target="#collapse1"  id="rule1"  className="Rule-heading">
                <label>Rule 1 Are you on social media?</label>
              </div>
              <div id="collapse1" className="collapse Rule-body">
                <label>Rule Body</label>
                <input className="Body-func" type="textarea" id="body1" defaultValue="function(obj){return obj.onSocialmedia;}"/>
                <div className="Rule-block">
                  <div className="Rule-result">
                    <label>Next Rule Id if Passed</label>
                    <input type="number" defaultValue="2" id="trueid1" min="1" max="4"  />
                  </div>
                  <div className="Rule-result">
                    <label>Next Rule Id if Failed</label>
                    <input type="number" id="falseid1" defaultValue="2" min="1" max="4" />
                  </div>
                </div>
              </div>
            </div>

            <hr/>
            <div className="Rule">
              <div type="button" data-toggle="collapse" data-target="#collapse2" id="rule2" className="Rule-heading">
                <label>Rule 2 Which platform do you use?</label>
              </div>
              <div id="collapse2"  className="collapse Rule-body">
                <label>Body</label>
                <input className="Body-func" type="textarea" id="body2"  defaultValue="function(obj){return obj.platform=='twitter';}"/>
              
              <div className="Rule-block">
                <div className="Rule-result">
                  <label>Next Rule Id if Passed</label>
                  <input type="number" defaultValue="3" min="1" max="4" id="trueid2" />
                </div>
                <div className="Rule-result"> 
                  <label>Next Rule Id if Failed</label>
                  <input type="number" defaultValue="3" min="1" max="4" id="falseid2"  />
                </div>
              </div>
              </div>
            </div>
            <hr/>
            <div className="Rule">
              <div  type="button" data-toggle="collapse" data-target="#collapse3" id="rule3"  className="Rule-heading">
                <label>Rule 3 How frequently do you use it? </label>
              </div>
              <div id="collapse3" className="collapse Rule-body">
                <label>Body</label>
                <input className="Body-func" type="textarea" id="body3"   defaultValue="function(obj){return obj.Frequency=='Daily';}"/>
               <div className="Rule-block">
                <div className="Rule-result">
                  <label>Next Rule Id if Passed</label>
                  <input type="number" defaultValue="4" min="1" max="4" id="trueid3"  />
                </div>
                <div className="Rule-result">
                  <label>Next Rule Id if Failed</label>
                  <input type="number" defaultValue="4" min="1" max="4" id="falseid3"  />
                </div>
              </div>
              </div>
            </div>
            <hr/>
            <div className="Rule">
              <div type="button" data-toggle="collapse" data-target="#collapse4" id="rule4"  className="Rule-heading">
                <label>Rule 4  When was the First time you used it? </label>
              </div>
              <div id="collapse4" className="collapse Rule-body">
                <label>Body</label>
                <input className="Body-func" type="textarea" id="body4" defaultValue="function(obj){return obj.firstused=='today';}"/>
               <div className="Rule-block">
                <div className="Rule-result">
                  <label>Next Rule Id if Passed</label>
                  <input type="number" min="1" max="4" id="trueid4" />
                </div>
                <div className="Rule-result">
                  <label>Next Rule Id if Failed</label>
                  <input type="number" min="1" max="4" id="falseid4"/>
                </div>
                </div>
              </div>
            </div>
        <div>
    <button className="btn btn-primary" onClick={this.submit}>Submit</button>
    </div>
      
      </div>
    );
  }
}

export default App;
