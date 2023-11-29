import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <header>
        <h1 className="mt-5 text-4xl font-bold text-white">
          Weather App&trade;
        </h1>
      </header>
      <Main />
      <Footer />
    </>
  );
};

export default App;
