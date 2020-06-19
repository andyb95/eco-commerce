insert into products (name, price, img, description)
values($1, $2, $3, $4)
returning *;
