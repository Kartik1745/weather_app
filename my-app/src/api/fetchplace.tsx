const fetchPlace = async (text: string) => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1Ijoia2FydGlrMTI5OCIsImEiOiJjbHV6ZXNyaGIxNjY5MnFvNXV1ZGtodThlIn0.lea8PSCOQM59JsniM3AN9Q&autocomplete=true&types=place`
    );

    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve places" };
  }
};

export default fetchPlace;