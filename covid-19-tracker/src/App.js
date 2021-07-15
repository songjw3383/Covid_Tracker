import './App.css';
import { MenuItem, FormControl,Select,Card,CardContent} from "@material-ui/core"
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStat, sortData } from './util';
import LineGraph from "./LineGraph"
import "leaflet/dist/leaflet.css"

//https://disease.sh/v3/covid-19/countries -> Getting Countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

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
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
      })
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =  
    countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
      .then((response) => response.json())
      .then(data => {
        setCountry(countryCode);

      // All of the data from the country response
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4);
    })
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
                <InfoBox isRed active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
                <InfoBox active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
                <InfoBox isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            />
        </div>
        
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType}/>
          </CardContent>
        </Card>

      </div>
  );
}

export default App;
