import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/Constant";
import { AuthContext } from "../../context/AuthContext";
import Table from "../../../components/Table";
import Button from "../../../components/Button";

function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api`);
      const dataWithNo = res.data.data.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setPeserta(dataWithNo);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (peserta) => {
    const konfirmasi = confirm(`Hapus ${peserta.nama_siswa}?`);
    if (!konfirmasi) return;
    try {
      await axios.delete(`${baseUrl}/api/${peserta.id}`);
      fetchData();
      Swal.fire("Berhasil", "Peserta telah dihapus", "success");
    } catch (err) {
      console.log(err);

      alert("Gagal menghapus data");
    }
  };

  const columns = [
    { header: "No.", accessor: "no" },
    { header: "Kode", accessor: "kode_siswa" },
    { header: "Nama", accessor: "nama_siswa" },
    { header: "Alamat", accessor: "alamat_siswa" },
    { header: "Tanggal lahir", accessor: "tgl_lahir" },
    { header: "Jurusan", accessor: "jurusan" },
    {
      header: "Aksi",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/peserta/view/${row.id}`)}
          >
            View
          </Button>
          <Button
            variant="success"
            onClick={() => navigate(`/peserta/edit/${row.id}`)}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4">
      <h2 className="text-2xl font-semibold mb-4 text-lime-700">
        Data Peserta
      </h2>
      <div className="mb-4">
        <Button onClick={() => navigate("/peserta/tambah")}>
          + Tambah Peserta
        </Button>
      </div>
      {loading ? <p>Loading...</p> : <Table columns={columns} data={peserta} />}
    </div>
  );
}

export default DataPeserta;
