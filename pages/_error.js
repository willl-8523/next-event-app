const ErrorPage = ({ statusCode }) => {
  let content;

  switch (statusCode) {
    case 404:
      content = 'Page Not Found'
      break;
    case 500:
      content = 'Server: Something went wrong'
      break;
  
    default:
      break;
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Erreur {statusCode} </h1>
      <h3>{content}</h3>
    </div>
  );
};


ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
