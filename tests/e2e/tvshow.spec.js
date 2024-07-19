import { test, request, expect } from '../support/index';
import { create } from '../fixtures/tvshows.json'

import { executeSQL } from '../support/database';

test.beforeAll(async () => {
  await executeSQL('DELETE FROM tvshows');
});

test('Deve poder cadastrar uma nova serie', async ({ page }) => {
  const tvshow = create;
  // await executeSQL(`DELETE from movies WHERE title = '${movie.title}'`);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.tvshow.create(tvshow);

  // await page.popup.haveText(
  //   `A série '${tvshow.title}' foi adicionada ao catálogo.`
  // );
});

test('Deve remover um filme', async ({ page, request }) => {
  const movie = zumbilandia;

  await request.api.postMovie(movie);
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.remove(movie.title);

  await page.popup.haveText('Filme removido com sucesso');
});

test('Não deve cadastrar quando o título é duplicado', async ({
  page,
  request,
}) => {
  const movie = resident_evil;

  // await executeSQL(`DELETE from movies WHERE title = '${movie.title}'`);
  await request.api.postMovie(movie);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.create(movie);

  await page.popup.haveText(
    `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  );
});

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({
  page,
}) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
  ]);
});

test('Deve realizar busca pelo termo zumbi', async ({ page, request }) => {
  const movies = search;

  movies.data.forEach(async (m) => {
    await request.api.postMovie(m);
  });

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.search(movies.input);

  await page.movies.tableHave(movies.outputs);
});
