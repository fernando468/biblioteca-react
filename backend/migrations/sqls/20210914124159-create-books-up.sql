/* Replace with your SQL commands */
create table books (
  id serial primary key,

  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  deleted_at timestamp DEFAULT null,

  "title" varchar(255) not null,
  "yearOfPublication" int not null,
  "publisher" varchar(100) not null,
  "edtion" varchar(30) not null,
  "authors" text not null,
  "volume" varchar(30) not null,
  "isbn" varchar(18) not null,
  "cdd" varchar(20) not null,
  "cod" int not null
);
