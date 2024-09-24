import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CharacterResult } from "../types/character";
import app from "../api/axiosConfig";
import toast from "react-hot-toast";

const FilteredPosts = () => {
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const navigate = useNavigate();
  const location = useLocation();
  const firstRender = useRef<boolean>(true); // Track the initial render

  const genderOptions = [
    { label: "female", value: "female" },
    { label: "male", value: "male" },
    { label: "genderless", value: "genderless" },
    { label: "unknown", value: "unknown" }
  ];

  const statusOptions = [
    { label: "alive", value: "alive" },
    { label: "dead", value: "dead" },
    { label: "unknown", value: "unknown" }
  ];


  // 1st useEffect: On component mount, load filters from URL and set them in state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialGenderFilters = queryParams.get("gender")
      ? queryParams.get("gender")!.split(",")
      : [];

    const initialStatusFilter = queryParams.get("status") || "";

    setGenderFilters(initialGenderFilters);
    setStatusFilter(initialStatusFilter);
    fetchFilteredData(queryParams.toString());
  }, []);

    // 2nd useEffect: Update URL and fetch data when filters change (skip first mount)
    useEffect(() => {
        if(!firstRender.current){
         
        const queryParams = new URLSearchParams(location.search);
        // Add gender filters
        if (genderFilters.length > 0) {
          queryParams.set("gender", genderFilters.join(","));
        } else {
          queryParams.delete("gender");
        }
        
        // Add status filter
        if (statusFilter) {
          queryParams.set("status", statusFilter);
        } else {
          queryParams.delete("status");
        }
        // Update the URL and fetch filtered data only if the URL has changed
        const newQueryString = queryParams.toString();
        if (location.search !== `?${newQueryString}`) {
          navigate({ search: newQueryString }, { replace: true });
          fetchFilteredData(newQueryString);
        }
        }
        }, [genderFilters, statusFilter]);

// fetch function
  const fetchFilteredData = async (queryString: string) => {
    setLoading(true);
    try {
      const response = await app.get(`/character?${queryString}`);
      if (response.data && response.data.results) {
        setCharacters(response.data.results);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      toast.error("Failed to fetch characters. Please try again.");
    } finally {
      setLoading(false)
    }
  };

//   handle Checkbox Change
  const handleCheckboxChange = (value: string) => {
    firstRender.current=false;
    setGenderFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  //   handle radio buttons Change
  const handleRadioChange = (value: string) => {
    firstRender.current=false;
    setStatusFilter(value);
  };

  return (
    <div>
      <h1>Filtered Characters</h1>

      {/* Checkbox Filters */}
      <div>
        <h3>Filter by Gender:</h3>
        {genderOptions.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              checked={genderFilters.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Radio Button Filters */}
      <div>
        <h3>Filter by Status:</h3>
        {statusOptions.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="status"
              value={option.value}
              checked={statusFilter === option.value}
              onChange={() => handleRadioChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Display Loading State */}
      {loading && <p style={{color:"yellow"}}>Loading characters...</p>}

      {/* Display Characters */}
      <div>
        <h2>Characters</h2>
        <ul>
          {!loading && characters.length > 0 ? (
            characters.map((character) => (
              <li key={character.id}>
                <strong>{character.name}</strong> - {character.status} - {character.gender}
              </li>
            ))
          ) : (
            <p>No characters found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilteredPosts;
