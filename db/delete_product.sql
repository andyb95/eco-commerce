delete from photos
where product_id = $1;

delete from products
where product_id = $1;