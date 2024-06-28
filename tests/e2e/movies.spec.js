import { test } from '../support/index';
import { exterminio } from '../fixture/movies.json';

import { executeSQL } from '../support/database';

test('Deve poder cadastrar um novo filme', async ({ page }) => {
  const movie = exterminio;
  await executeSQL(`DELETE from movies WHERE title = '${movie.title}'`);

  await page.login.visit();

  await page.login.submit('admin@zombieplus.com', 'pwd123');
  await page.movies.isLoggedIn();

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year
  );

  await page.toast.containText('Cadastro realizado com sucesso!');
});
