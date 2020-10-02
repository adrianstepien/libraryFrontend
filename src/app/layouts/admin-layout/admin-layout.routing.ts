import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { BookBrowserComponent } from '../../book-browser/book-browser.component';
import { TypographyComponent } from '../../typography/typography.component';
import { BookListComponent } from '../../book-list/book-list.component';
import { BookComponent } from '../../book-list/books/book.component';
import { GoogleBookComponent } from '../../tables/googleBooksDetails/googleBook.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'book-browser',          component: BookBrowserComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'book-list',      component: BookListComponent },
    { path: 'book/:id',       component: BookComponent },
    { path: 'googleBook',     component: GoogleBookComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
