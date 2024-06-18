// @ts-check
import { test, expect } from '@playwright/test';
import { Toast } from '../pages/component';
const { LandingPage } = require('../pages/landingPage');

let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(
    'Adroaldo Jesualdo',
    'adroaldo@jesualdo.com'
  );

  const message =
    'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';

  await toast.haveText(message);
});

test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(
    'Adroaldo Jesualdo',
    'adroaldo.jesualdo.com'
  );

  await landingPage.alertHaveText('Email incorreto');
});

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'adroaldo@jesualdo.com');

  await landingPage.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Adroaldo Jesualdo', '');

  await landingPage.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({
  page,
}) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});
