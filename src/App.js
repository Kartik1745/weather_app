import logo from './logo.svg';
// import './App.css';
import Search from './components/search';
import { useState } from 'react';
import fetchPlace from './components/fetchplace';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/dropdown-menu"


function App() {

  // const [city, setCity] = useState("");
  // const [completeCity, setCompleteCity] = useState([]);
  // const [error, setError] = useState("");

  // const handleChange = async (e) => {
  //   setCity(e.target.value);
  //   if (!city) return;

  //   const res = await fetchPlace(city);
  //   !completeCity.includes(e.target.value) &&
  //     res.features &&
  //     setCompleteCity(res.features.map((place) => place.place_name));
  //   res.error ? setError(res.error) : setError("");
  // };

  return (
    // <form>
    //   <div className="pt-12">
    //     <div className="placesAutocomplete__inputWrap">
    //       <label htmlFor="city" className="label">
    //         Your city
    //         {error && (
    //           <span className="inputError">{error}</span>
    //         )}
    //       </label>
    //       <input
    //         list="places"
    //         type="text"
    //         id="city"
    //         name="city"
    //         onChange={handleChange}
    //         value={city}
    //         required
    //         pattern={completeCity.join("|")}
    //         autoComplete="off"
    //       />
    //       <datalist id="places">
    //         {completeCity.map((city, i) => (
    //           <option key={i}>{city}</option>
    //         ))}
    //       </datalist>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </div>
    // </form>
    <div>
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
</DropdownMenu>

    </div>
  );
}

export default App;
