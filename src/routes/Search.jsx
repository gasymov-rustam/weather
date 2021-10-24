import { useHistory } from "react-router";

export default function Search() {
  const history = useHistory();
  function handleSubmit(e) {
    // e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    history.push(`/city/${searchQuery}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="searchForm">
        <input type="search" name="search" required placeholder="'Mexico' or 'London,GB'" className="searchInput"/>
        <button type="submit" className="searchBtn">Search</button>
      </form>
    </div>
  );
}
