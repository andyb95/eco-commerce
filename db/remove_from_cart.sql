delete from cart
where user_id = $1 
and product_id = $2;