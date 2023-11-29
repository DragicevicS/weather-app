export const fetchData = async (cityName) => {
  const apiKey = "743de223cc0b4853820165044231005";
  const baseUrl = "https://api.weatherapi.com/v1";
  const forecastDays = 3;

  const forecastPromise = fetch(
    `${baseUrl}/forecast.json?key=${apiKey}&q=${cityName}&days=${forecastDays}`,
    { mode: "cors" }
  );

  const historyPromises = [];
  for (let i = 1; i <= 2; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    let dateString = `${year}-${month}-${day}`;

    historyPromises.push(
      fetch(
        `${baseUrl}/history.json?key=${apiKey}&q=${cityName}&dt=${dateString}`,
        { mode: "cors" }
      )
    );
  }

  try {
    const [forecastResponse, ...historyResponses] = await Promise.all([
      forecastPromise,
      ...historyPromises,
    ]);

    const forecastData = await forecastResponse.json();
    const historyData = await Promise.all(
      historyResponses.map((res) => res.json())
    );

    return [forecastData, ...historyData];
  } catch (error) {
    return null;
  }
};
