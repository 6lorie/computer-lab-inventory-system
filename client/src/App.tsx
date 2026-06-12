import Login
from "./pages/Login";

import Dashboard
from "./pages/Dashboard";

import Equipment from "./pages/Equipment";
import Reports from "./pages/Reports";

import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={
<Login />
}
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>


 <Route
          path="/equipment"
          element={
            <ProtectedRoute>
              <Equipment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

</Routes>

</BrowserRouter>

);

}

export default App;