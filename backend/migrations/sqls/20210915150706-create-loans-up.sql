/* Replace with your SQL commands */
create table loans (
  id serial primary key,

  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  deleted_at timestamp DEFAULT null,

  "id_student" int4 not null,
  "id_book" int4 not null,
  "startDate" date not null,
  "endDate" date not null,


  constraint loans_student_fk foreign key (id_student) references students(id),
  constraint loans_book_if foreign key (id_book) references books(id)
);
