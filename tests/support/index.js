import { test as base, expect } from '@playwright/test';

import { Login } from './actions/login';
import { Toast } from './actions/component';
import { Movies } from './actions/movies';
import { Leads } from './actions/leads';

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;

    context['leads'] = new Leads(page);
    context['login'] = new Login(page);
    context['movies'] = new Movies(page);
    context['toast'] = new Toast(page);

    await use(context);
  },
});

export { test, expect };
