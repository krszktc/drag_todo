import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppHeader } from "./components/AppHeader/AppHeader";
import AppMenu from "./components/AppMenu/AppMenu";
import ToDo from "./components/ToDo/ToDo";

import "react-toastify/dist/ReactToastify.css";


export default function App() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader />
        <AppMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/project/:projectId" element={<ToDo />} />
          </Routes>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
    </>
  )
}
