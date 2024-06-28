import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { Toast } from '../pages/component';
import { MoviesPage } from '../pages/moviesPage';
import { LandingPage } from '../pages/landingPage';

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;

    context['landing'] = new LandingPage(page);
    context['login'] = new LoginPage(page);
    context['movies'] = new MoviesPage(page);
    context['toast'] = new Toast(page);

    await use(context);
  },
});

export { test, expect };
