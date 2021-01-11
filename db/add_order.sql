insert into orders (user_id, product_id, order_date)
values ($1, $2, $3)
returning *;