import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { getBigCoinsPrice } from "./Redux/actions/currencyActions";
import "./styles/global.scss";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBigCoinsPrice());
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getBigCoinsPrice());
    }, 30000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
