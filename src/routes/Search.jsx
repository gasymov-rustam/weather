import { useHistory } from "react-router";
// import { useState } from "react";
// import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default function Search() {
  // const [city, setCity] = useState('')
  // const provider = new OpenStreetMapProvider();

  const history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    history.push(`/city/${searchQuery}`);
  }
  // (async function () {
  //   const results = await provider.search({ query: city });
  //   // console.log(results);

  // })()
  // async function createCitiesList(city) {
  //   try {
  //     const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete/apikey=4jqOySF2dyahzmPXLiLW4wlqhpeVUKX7&q=tel`
  //       // `https://nominatim.openstreetmap.org/search/city=${city}?format=json&addressdetails=[0|1]&accept-language=en&limit=50`
  //       // `https://nominatim.openstreetmap.org/search/Be?format=json&addressdetails=1&limit=1&polygon_svg=1`
  //     );
  //     if (response.ok) {
  //       const citiesList = await response.json();
  //       // console.log(citiesList);
  //     } else console.warn(`Unknown error ===>>> ${response.status}`);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }
  // createCitiesList(city)
  // console.log(city);
  return (
    <div>
      <form onSubmit={handleSubmit} className="searchForm">
        <input
          type="search"
          name="search"
          required
          placeholder="'Mexico' or 'London,GB'"
          className="searchInput"
          // onChange={(e)=>setCity(e.target.value)}
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}
