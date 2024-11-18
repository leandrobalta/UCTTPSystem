const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl font-medium text-gray-600">Página não encontrada</p>
        <p className="mt-4 text-gray-600">O endereço que você procurou não foi encontrado neste servidor.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
