insert into cart (user_id, product_id)
values ($1, $2)
returning *;