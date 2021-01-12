insert into orders (user_id, product_id, order_date)
values ($1, $2, $3);
delete from cart
where cart_id = $4;