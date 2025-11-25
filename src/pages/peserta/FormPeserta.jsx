import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../config/Constant";
import { AuthContext } from "../../context/AuthContext";
import Form from "../../../components/Form";

function FormPeserta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [mode, setMode] = useState("create");

  useEffect(() => {
    if (location.pathname.includes("/view/")) {
      setMode("view");
    } else if (id) {
      setMode("edit");
    } else {
      setMode("create");
    }

    if (id) {
      fetchPeserta();
    }
  }, [id, location.pathname]);

  const fetchPeserta = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/${id}`);
      setData(res.data.data);
    } catch (err) {
      Swal.fire("Gagal", "Data tidak ditemukan", "error");
      navigate("/peserta");
    }
  };

  const handleSubmit = async (formData) => {
    console.log(formData);

    try {
      if (mode === "edit") {
        await axios.put(`${baseUrl}/api/${id}`, formData);
      } else {
        await axios.post(`${baseUrl}/api`, formData);
      }

      Swal.fire("Sukses", "Data berhasil disimpan", "success");
      navigate("/peserta");
    } catch (err) {
      console.log(err.message);

      Swal.fire("Gagal", err?.response?.data?.message || "Error", "error");
    }
  };

  return (
    <div className="p-6">
      <Form
        data={data}
        mode={mode}
        onSubmit={handleSubmit}
        onClose={() => navigate("/peserta")}
      />
    </div>
  );
}

export default FormPeserta;
