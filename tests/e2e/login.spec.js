import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Toast } from '../pages/component';
import { MoviesPage } from '../pages/moviesPage';

let loginPage;
let toast;
let moviesPage;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
  toast = new Toast(page);
  moviesPage = new MoviesPage(page);
});

test('Deve logar como administrador', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('admin@zombieplus.com', 'pwd123');
  await moviesPage.isLoggedIn();
});

test('Não deve logar com a senha incorreta', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('admin@zombieplus.com', 'abc123');

  const message =
    'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
  await toast.haveText(message);
});

test('Não deve logar quando o email é inválido', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('www.admin.com', 'abc123');

  await loginPage.alertHaveText('Email incorreto');
});

test('Não deve logar quando o email não é preenchido', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('', 'abc123');

  await loginPage.alertHaveText('Campo obrigatório');
});

test('Não deve logar quando a senha não é preenchida', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('admin@admin.com', '');

  await loginPage.alertHaveText('Campo obrigatório');
});

test('Não deve logar quando nenhum campo é preenchido', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('', '');

  await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});
