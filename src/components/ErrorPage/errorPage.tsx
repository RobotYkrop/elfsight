import { useRouteError } from 'react-router-dom';

import { PageError } from '../../types/types';

export default function ErrorPage() {
  const error = useRouteError();
  const typeError = error as PageError;
  console.error(typeError);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{typeError.statusText || typeError.message}</i>
      </p>
    </div>
  );
}
