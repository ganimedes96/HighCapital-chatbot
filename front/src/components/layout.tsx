import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home (Meus Bots)</Link>
            </li>
            <li>
              <Link to="/create-bot">Criar Novo Bot</Link>
            </li>
            {/* Adicione outros links conforme necessário, talvez um para 'Sobre' */}
          </ul>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        {/* Onde o conteúdo das rotas aninhadas (Home, CreateBot, Chatbot) será renderizado */}
        <Outlet />
      </main>

      <footer>
        <p style={{ textAlign: 'center', marginTop: '40px' }}>&copy; HighCapital Desafio Técnico 2025</p>
      </footer>
    </>
  );
}

