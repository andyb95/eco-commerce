insert into products (name, price, img, description, category)
values($1, $2, $3, $4, $5)
returning *;
