update products
set name= $2, price= $3, img = $4, description = $5, category = $6
where product_id = $1
returning *;