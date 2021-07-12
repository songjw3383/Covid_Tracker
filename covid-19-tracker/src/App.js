import './App.css';
import { MenuItem, FormControl,Select,Card,CardContent } from "@material-ui/core"
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from "./Map";

//https://disease.sh/v3/covid-19/countries -> Getting Countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  useEffect(() => {
    // async -> send a req, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country, // ex) United States, United Kingdom
            value: country.countryInfo.iso2 // ex) UK,USA, FR
          }));

          setCountries(countries);
      })
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
            <div className="app__header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown ">
              <Select onChange={onCountryChange} variant="outlined" value={country}>
                <MenuItem value="worldwide">Wordwide</MenuItem>
                {
                  countries.map(country => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
                <InfoBox title="Coronavirus" cases={123} total={2000}/>
                <InfoBox title="Recovered" cases={123} />
                <InfoBox title="Deaths" cases={123} />
          </div>
          <Map />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>

            <h3>Worldwide new cases</h3>
          </CardContent>
        </Card>

      </div>
  );
}

export default App;
