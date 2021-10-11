import { Application } from '../declarations';
import users from './users/users.service';
import profiles from './profiles/profiles.service';
import students from './students/students.service';
import books from './books/books.service';
import loans from './loans/loans.service';
import contacts from './contacts/contacts.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(profiles);
  app.configure(students);
  app.configure(books);
  app.configure(loans);
  app.configure(contacts);
}
