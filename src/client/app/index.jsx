import React from 'react';
import { render } from 'react-dom';

// console compile command to change React to old javascript
// ./node_modules/.bin/webpack -d 

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sample: []
        }

    }


    addToList() {

        let added_city = JSON.stringify(this.state.data.current_observation.display_location.city);
        let added_temperature = JSON.stringify(this.state.data.current_observation.temp_c);

        this.state.sample.push({ saved_city: added_city, saved_temperature: added_temperature });

        this.setState(this.state);
    }

    sendRequestToserver() {

        let personal_key = "c536e12bab1df978"

        let input_city = document.getElementById('textdata').value;

          fetch('http://api.wunderground.com/api/'+personal_key+'/conditions/q/' + input_city + '.json') 
            .then((resp) => {
                return resp.json();
            })
            .then((response) => {
               
                console.log(JSON.stringify(response, undefined, '\t'));
                this.state.data = response;
               
                document.getElementById('city').innerHTML = JSON.stringify(this.state.data.current_observation.display_location.city);
                document.getElementById('temperature').innerHTML = JSON.stringify(this.state.data.current_observation.temp_c);
                document.getElementById('inputdatatext').innerHTML = document.getElementById('textdata').value;

            })

    }


    render() {
        return <div>
            <h1>React weather program !</h1>
            <table border="2">
                <th>City</th> <th>Temperature (celsius)</th> <th></th>
                <tr>
                    <td><p id="city"> no data </p> </td>
                    <td><p id="temperature">no data </p></td>
                    <td><button onClick={() => this.addToList()}> Add to list </button> </td>
                </tr>
            </table>
            <br /> Enter city name <input type="text" id="textdata" /> <button onClick={() => this.sendRequestToserver()} > Ask weather </button>

            <br /><br /><br />

            List of saved cities

            <table border="2">
                {this.state.sample.map((val, index) =>
                    <tr>
                        <td> {val.saved_city} </td>
                        <td> {val.saved_temperature} </td>
                    </tr>)
                }
            </table>

        </div>;
    }

}
render(<App />, document.getElementById('app'));

