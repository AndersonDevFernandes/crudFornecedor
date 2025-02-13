import { useState, useEffect } from "react";
import "./Style.css";

const App = () => {
  const [form, setForm] = useState({
    cnpj: "",
    nome: "",
    telefone1: "",
    telefone2: "",
    email: "",
    endereco: "",
  });

  const [searchCnpj, setSearchCnpj] = useState("");
  const [fornecedor, setFornecedor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar dados do local storage quando o componente for montado
  useEffect(() => {
    const savedForm = localStorage.getItem("form");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  // Atualizar os dados do formulário e salvar no local storage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    localStorage.setItem("form", JSON.stringify(updatedForm));
  };

  // Cadastrar fornecedor
  const handleSubmit = (e) => {
    e.preventDefault();
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
    fornecedores.push(form);
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    alert("Fornecedor cadastrado com sucesso!");
    setForm({
      cnpj: "",
      nome: "",
      telefone1: "",
      telefone2: "",
      email: "",
      endereco: "",
    });
    localStorage.removeItem("form");
  };

  // Buscar fornecedor
  const handleSearch = () => {
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
    const foundFornecedor = fornecedores.find((f) => f.cnpj === searchCnpj);
    if (foundFornecedor) {
      setFornecedor(foundFornecedor);
      setIsModalOpen(true);
    } else {
      alert("Fornecedor não encontrado.");
      setFornecedor(null);
    }
  };

  // Deletar fornecedor
  const handleDelete = () => {
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
    const updatedFornecedores = fornecedores.filter(
      (f) => f.cnpj !== fornecedor.cnpj
    );
    localStorage.setItem("fornecedores", JSON.stringify(updatedFornecedores));
    alert("Fornecedor deletado com sucesso!");
    setFornecedor(null);
    setIsModalOpen(false);
  };

  return (
    <div className="main1">
      <p className="main2">Cadastro de Fornecedores</p>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          type="number"
          name="cnpj"
          value={form.cnpj}
          onChange={handleInputChange}
          placeholder="CNPJ (apenas números)"
          required
          pattern="\d{14}"
        />
        <input
          className="input"
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleInputChange}
          placeholder="Nome"
          required
        />
        <input
          className="input"
          type="number"
          name="telefone1"
          value={form.telefone1}
          onChange={handleInputChange}
          placeholder="Telefone 1"
          required
          pattern="\d+"
        />
        <input
          className="input"
          type="number"
          name="telefone2"
          value={form.telefone2}
          onChange={handleInputChange}
          placeholder="Telefone 2 (opcional)"
          pattern="\d+"
        />
        <input
          className="input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          className="input"
          type="text"
          name="endereco"
          value={form.endereco}
          onChange={handleInputChange}
          placeholder="Endereço"
          required
        />
        <button className="button" type="submit">
          Cadastrar
        </button>
      </form>

      {/* Busca de Fornecedor */}
      <div className="main1">
        <p className="main2">Buscar Fornecedor</p>
        <input
          className="input"
          type="text"
          value={searchCnpj}
          onChange={(e) => setSearchCnpj(e.target.value)}
          placeholder="CNPJ (apenas números)"
          pattern="\d{14}"
        />
        <button className="button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Modal de Detalhes do Fornecedor */}
      {isModalOpen && fornecedor && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h3>Detalhes do Fornecedor:</h3>
            <p>
              <b>CNPJ:</b> {fornecedor.cnpj}
            </p>
            <p>
              <b>Nome:</b> {fornecedor.nome}
            </p>
            <p>
              <b>Telefone 1:</b> {fornecedor.telefone1}
            </p>
            <p>
              <b>Telefone 2:</b> {fornecedor.telefone2}
            </p>
            <p>
              <b>Email:</b> {fornecedor.email}
            </p>
            <p>
              <b>Endereço:</b> {fornecedor.endereco}
            </p>
            <button className="button" onClick={handleDelete}>
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
