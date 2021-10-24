import { useHistory } from "react-router";

export default function Search() {
  const history = useHistory();
  function handleSubmit(e) {
    const searchQuery = e.target.search.value.trim();
    history.push(`/city/${searchQuery}`);
  }
  async function createCitiesList() {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search/city=Dn?format=json&addressdetails=[0|1]&accept-language=en&limit=50`
        // `https://nominatim.openstreetmap.org/search/Be?format=json&addressdetails=1&limit=1&polygon_svg=1`
      );
      if (response.ok) {
        const citiesList = await response.json();
        // console.log(citiesList);
      } else console.warn(`Unknown error ===>>> ${response.status}`);
    } catch (error) {
      console.warn(error);
    }
  }
  createCitiesList()
  return (
    <div>
      <form onSubmit={handleSubmit} className="searchForm">
        <input
          type="search"
          name="search"
          required
          placeholder="'Mexico' or 'London,GB'"
          className="searchInput"
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}
