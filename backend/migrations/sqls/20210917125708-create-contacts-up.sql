/* Replace with your SQL commands */
create table contacts (
  id serial primary key,

  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  deleted_at timestamp DEFAULT null,

  "id_student" int4 not null,
  "name" varchar(255) not null,
  "phone" varchar(11) not null,
  "relation" varchar(15) not null,

  constraint contacts_student_fk foreign key (id_student) references students(id)
);
