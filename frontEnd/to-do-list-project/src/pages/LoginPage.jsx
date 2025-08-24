import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApi, fetchTodos, registerUser } from "../services/api";
import styles from "./LoginPage.module.css"; // nome correto

const LoginPage = ({ setApi }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassorwd] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await registerUser(name, email, password);
      setIsRegister(false); // volta pro login
      setEmail("");
      setPassorwd("");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const apiInstance = createApi(email, password);
      await fetchTodos(apiInstance); // testa autenticação

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Falha ao fazer login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBody}>
          {!isRegister ? (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <p>Digite seu email</p>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <p>Digite sua senha</p>
                  <input
                    type="password"
                    name="senha"
                    value={password}
                    placeholder="Digite sua senha"
                    onChange={(e) => setPassorwd(e.target.value)}
                    required
                  />
                </div>
                <button className={styles.enterAccount} type="submit">
                  Entrar
                </button>

                <div className={styles.forgot}>
                  <a href="#">Esqueceu a senha?</a>
                </div>

                <div className={styles.notAccount}>
                  <span>Não possui conta? </span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(true);
                    }}
                  >
                    Cadastre-se
                  </a>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2>Cadastro</h2>
              <form onSubmit={handleRegister}>
                <div>
                  <p>Digite seu nome</p>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <p>Digite seu email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <p>Crie sua senha</p>
                  <input
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassorwd(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <p>Confirme sua senha</p>
                  <input
                    type="password"
                    name="confirmSenha"
                    placeholder="Repita sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button className={styles.enterAccount} type="submit">
                  Cadastrar
                </button>

                <div className={styles.backLogin}>
                  <span>Já possui conta? </span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(false);
                    }}
                  >
                    Voltar para Login
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
