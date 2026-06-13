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

import BorrowRecords from "./pages/BorrowRecord";
import PublicRoute from "./components/loginRoute";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={
  <PublicRoute>
    <Login />
  </PublicRoute>

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

        <Route path="/borrow-records" element={<BorrowRecords />} />

</Routes>



</BrowserRouter>

);

}

export default App;