import { useState } from "react";
import styles from "./LoginPage.module.css"; // nome correto

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBody}>
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
