import { useState } from "react";
import "../pages/LoginPage.css";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="login-container">
      <div className="login-body">
        {!isRegister ? (
          <>
            <h2>Login</h2>
            <form>
              <div>
                <p>Digite seu email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div>
                <p>Digite sua senha</p>
                <input
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <button className="enterAccount" type="submit">
                Entrar
              </button>

              <div className="forgot">
                <a href="#">Esqueceu a senha?</a>
              </div>

              <div className="notAccount">
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
            <form>
              <div>
                <p>Digite seu nome</p>
                <input
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              <div>
                <p>Digite seu email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div>
                <p>Crie sua senha</p>
                <input
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <div>
                <p>Confirme sua senha</p>
                <input
                  type="password"
                  name="confirmSenha"
                  placeholder="Repita sua senha"
                  required
                />
              </div>
              <button className="enterAccount" type="submit">
                Cadastrar
              </button>

              <div className="backLogin">
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
  );
};

export default LoginPage;
