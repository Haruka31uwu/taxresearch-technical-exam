import ClientsPage from './pages/ClientsPage';
import {SpinnerProvider} from './components/commons/SpinnerContext';
function App() {

  return (
    <div className="App">
      <SpinnerProvider >
      <ClientsPage />
      </SpinnerProvider>
    </div>
  );
}


export default App;
