import { test as base, expect } from '@playwright/test';

import { Login } from './actions/login';
import { Popup } from './actions/component';
import { Movies } from './actions/movies';
import { Leads } from './actions/leads';
import { Api } from './api/index';

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;

    context['leads'] = new Leads(page);
    context['login'] = new Login(page);
    context['movies'] = new Movies(page);
    context['popup'] = new Popup(page);

    await use(context);
  },
  request: async ({ request }, use) => {
    const context = request;
    context['api'] = new Api(request);
    await context['api'].setToken()

    await use(context);
  }

});

export { test, expect };
