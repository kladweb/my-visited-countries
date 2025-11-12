import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { Header } from "./components/Header/Header.tsx";
import { store } from './store/store';
import { PagesRouter } from "./router/PagesRouter.tsx";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
          <PagesRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
