import weatherAPIlogo from "../assets/weatherapi-logo.webp";

const Footer = () => {
  return (
    <footer className="flex items-center gap-3 text-white italic">
      Powered by
      <a
        href="https://www.weatherapi.com/"
        title="Free Weather API"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={weatherAPIlogo}
          alt="Weather data by WeatherAPI.com"
          draggable="false"
          loading="lazy"
        />
      </a>
    </footer>
  );
};

export default Footer;
