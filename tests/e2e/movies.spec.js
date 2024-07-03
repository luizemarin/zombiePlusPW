import { test } from '../support/index';
import { exterminio, resident_evil } from '../fixtures/movies.json';

import { executeSQL } from '../support/database';

test.beforeAll(async () => {
  await executeSQL('DELETE FROM movies');
});

test('Deve poder cadastrar um novo filme', async ({ page }) => {
  const movie = exterminio;
  // await executeSQL(`DELETE from movies WHERE title = '${movie.title}'`);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.create(movie);

  await page.toast.containText('Cadastro realizado com sucesso!');
});

test('Não deve cadastrar quando o título é duplicado', async ({ page }) => {
  const movie = resident_evil;

  // await executeSQL(`DELETE from movies WHERE title = '${movie.title}'`);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.create(movie);
  await page.toast.containText('Cadastro realizado com sucesso!');

  await page.movies.create(movie);

  await page.toast.containText(
    'Este conteúdo já encontra-se cadastrado no catálogo'
  );
});

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({
  page,
}) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.',
  ]);
});
