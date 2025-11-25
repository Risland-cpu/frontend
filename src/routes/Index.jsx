import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import Home from "../pages/Home";
import DataPeserta from "../pages/peserta/DataPeserta";
import FormPeserta from "../pages/peserta/FormPeserta";
import NoMatch from "../pages/NoMatch";
import Footer from "../../components/Footer";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peserta" element={<DataPeserta />} />
          <Route
            path="/peserta/tambah"
            element={<FormPeserta mode="create" />}
          />
          <Route
            path="/peserta/edit/:id"
            element={<FormPeserta mode="edit" />}
          />
          <Route
            path="/peserta/view/:id"
            element={<FormPeserta mode="view" />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default MainRoutes;
