import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { Toast } from '../pages/component';

let loginPage;
let toast;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
  toast = new Toast(page);
});

test('Deve logar como administrador', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('admin@zombieplus.com', 'pwd123');
  await loginPage.isLoggedIn();
});

test('Não deve logar com a senha incorreta', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('admin@zombieplus.com', 'abc123');

  const message =
    'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
  await toast.haveText(message);
});

test('Não deve logar quando o email não é preenchido', async ({ page }) => {
  await loginPage.visit();

  await loginPage.submit('', 'abc123');
});
