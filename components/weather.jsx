import ReactWeather, { useOpenWeather } from 'react-open-weather';

const Weather = ({lat, lng, name}) => {

    const { data, isLoading, errorMessage } = useOpenWeather({
      key: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
      lat: lat,
      lon: lng,
      lang: 'cs',
      unit: 'metric'
    });
  
    return (
        <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="cs"
        locationLabel= {name}
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />
    );
};

export default Weather