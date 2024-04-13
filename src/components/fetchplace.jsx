export const fetchPlace = async (text) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1Ijoia2FydGlrMTI5OCIsImEiOiJjbHV4ZG5xeXUwbjNoMmtxdDc0YTNsOXh5In0.Fx5rXUWnaIdALbJI_XuduQ&cachebuster=1625641871908&autocomplete=true&types=place`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

export default fetchPlace;