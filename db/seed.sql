drop table if exists cart;
drop table if exists photos;
drop table if exists products;
drop table if exists users;
drop table if exists orders;

create table users (
  user_id serial primary key,
  email varchar(100),
  password text,
  name varchar(25),
  address varchar(250),
  points int
);

create table products (
  product_id serial primary key,
  name varchar (300),
  price money,
  img varchar(3000),
  description text,
  category text
);

create table cart (
  cart_id serial primary key,
  user_id int references users(user_id),
  product_id int references products(product_id)
);

create table photos (
  photo_id serial primary key,
  product_id int references products(product_id),
  extra_img varchar(3000)
);

create table orders (
  order_id serial primary key,
  user_id int references users(user_id),
  product_id int references products(product_id),
  order_date bigint
);
