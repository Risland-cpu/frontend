import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "./Input";
import Button from "./Button";
import { baseUrl } from "../src/config/Constant";
import { AuthContext } from "../src/context/AuthContext";

function Form({ mode = "create" }) {
  const [form, setForm] = useState({ name: "", status: "aktif" });
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isReadOnly = mode === "view";

  const title =
    mode === "create"
      ? "Tambah Peserta"
      : mode === "edit"
      ? "Edit Peserta"
      : "Detail Peserta";

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      axios
        .get(`${baseUrl}/api/${id}`)
        .then((res) => {
          const response = res.data.data;
          setForm(response);
        })
        .catch(() => {
          Swal.fire("Error", "Gagal mengambil data", "error");
          navigate("/peserta");
        });
    }
  }, [id, mode, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await axios.post(`${baseUrl}/api`, form, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      } else if (mode === "edit" && id) {
        await axios.put(`${baseUrl}/api/${id}`, form, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      }
      Swal.fire("Berhasil", "Data peserta disimpan", "success");
      navigate("/peserta");
    } catch (err) {
      Swal.fire(
        "Gagal",
        err.response?.data?.message || "Terjadi kesalahan",
        "error"
      );
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="kode_siswa"
            value={form.kode_siswa}
            onChange={handleChange}
            placeholder="Kode siswa"
            required
            readOnly={isReadOnly}
          />
          <Input
            name="nama_siswa"
            value={form.nama_siswa}
            onChange={handleChange}
            placeholder="Nama siswa"
            required
            readOnly={isReadOnly}
          />
          <Input
            name="alamat_siswa"
            value={form.alamat_siswa}
            onChange={handleChange}
            placeholder="Alamat siswa"
            required
            readOnly={isReadOnly}
          />
          <Input
            name="tgl_lahir"
            // type="date"
            value={form.tgl_lahir}
            onChange={handleChange}
            placeholder="Tgl lahir (dd-mm-yyy)"
            required
            readOnly={isReadOnly}
          />
          <select
            name="jurusan"
            value={form.jurusan}
            onChange={handleChange}
            disabled={isReadOnly}
            className="p-2 border rounded"
          >
            <option value="Informatika">Informatika</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Hukum">Hukum</option>
          </select>

          <div className="flex gap-2 justify-end">
            {!isReadOnly && (
              <Button type="submit" variant="primary">
                Simpan
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/peserta")}
            >
              Kembali
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
