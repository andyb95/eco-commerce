drop table if exists cart;
drop table if exists photos;
drop table if exists products;
drop table if exists users;

create table users (
  user_id serial primary key,
  email varchar(100),
  password text,
  name varChar(25),
  points int,
);

create table products (
  product_id serial primary key,
  name varchar (300),
  price int,
  img varchar(3000),
  description text
);

create table photos (
  photo_id serial primary key,
  product_id int references products(product_id),
  extra_img varchar(3000)
);

select u.user_id, p.product_id
into cart from users u
join products p on u.user_id = p.product_id;