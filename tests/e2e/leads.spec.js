import { test, expect } from '../support/index';
import { faker } from '@faker-js/faker';
import {executeSQL} from "../support/database";

test.beforeAll(async () => {
  await executeSQL('DELETE FROM leads');
});

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(randomName, randomEmail);

  const message =
    'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.';

  await page.popup.haveText(message);
});

test('Não deve cadastrar quando o e-mail já existe', async ({
  page,
  request,
}) => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: randomName,
      email: randomEmail,
    },
  });

  expect(newLead.ok()).toBeTruthy();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(randomName, randomEmail);

  const message =
    'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.';

  await page.popup.haveText(message);
});

test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Adroaldo Jesualdo', 'adroaldo.jesualdo.com');

  await page.leads.alertHaveText('Email incorreto');
});

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', 'adroaldo@jesualdo.com');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Adroaldo Jesualdo', '');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({
  page,
}) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', '');

  await page.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});
