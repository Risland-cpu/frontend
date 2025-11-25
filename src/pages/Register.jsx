import { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../config/Constant";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Register() {
  const [form, setForm] = useState({ nama: "", email: "", password: "" });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, form);
      setStatus(`User ${res.data.data.nama} berhasil dibuat`);
    } catch (err) {
      setStatus("Gagal mengirim data");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
        Form Pendaftaran
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
        <Input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          required
        />
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Button type="submit" variant="primary" isSending={isSending}>
          {isSending ? "Mengirim..." : "Kirim"}
        </Button>
      </form>
      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
      )}
      <div className="text-center mt-4">
        <p className="text-sm">
          Sudah punya akun?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
