import ReactWeather, { useOpenWeather } from 'react-open-weather';

const Weather = ({lat, lng, name}) => {

    const { data, isLoading, errorMessage } = useOpenWeather({
      key: '407e0c98dcdfe95ec44823dfc8ab8c0a',
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