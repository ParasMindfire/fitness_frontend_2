import { Home } from "./routes/Home";
import Layout from "./Layouts/Layout";

//App component that sets up the application with necessary routings
function App() {
  return (
      <Layout>
        <Home/>
      </Layout>  
  );
}

export default App;