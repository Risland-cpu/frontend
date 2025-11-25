import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../config/Constant";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, form);
      const { accessToken } = res.data;
      const dataLogin = { accessToken, email: form.email };

      localStorage.setItem("user", JSON.stringify(dataLogin));
      setUser(dataLogin);
      setStatus("Login berhasil!");
      navigate("/");
    } catch (err) {
      setStatus("Email atau password salah");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
        Form Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
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
        {status && (
          <p className="text-sm text-center text-gray-700">{status}</p>
        )}
        <div className="text-center mt-4">
          <p className="text-sm">
            Belum punya akun?
            <Link to="/register" className="text-blue-600 hover:underline ml-1">
              Registrasi disini
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
