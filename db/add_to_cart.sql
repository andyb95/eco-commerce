insert into cart (user_id, product_id)
values ($1, $2);
select * from cart
where user_id = $1;