/* Replace with your SQL commands */
create table students (
  id serial primary key,

  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  deleted_at timestamp DEFAULT null,

  "ra" int not null unique,
  "name" varchar(255) not null,
  "email" varchar(155) not null unique,
  "departament" varchar(255) not null,
  "cpf" varchar(11) unique not null,
  "course" varchar(255) not null,
  "phone" varchar(11) not null,
  "birthday" date not null,

  "zip" varchar(8) not null,
  "street" varchar(255) not null,
  "neighborhood" varchar(80) not null,
  "city" varchar(80) not null,
  "number" varchar(10) not null,
  "state" varchar(15) not null,
  "description" varchar(50) not null
);
