/* Replace with your SQL commands */
create table profiles (
  id serial primary key,

  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  deleted_at timestamp DEFAULT null,

  "name" text not null,
  "id_user" int4 not null,

  constraint profiles_user_fk foreign key (id_user) references users(id)
)
