import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { Toast } from '../pages/component';
import { MoviesPage } from '../pages/moviesPage';
import { LandingPage } from '../pages/landingPage';

const test = base.extend({page: async ({page}, use) => {
    await use ({
        ...page,
        landing: new LandingPage(page),
        login: new LoginPage(page),
        movies: new MoviesPage(page),
        toast: new Toast(page)
    })
}})

export { test, expect }
