insert into photos (product_id, extra_img)
values ($1, $2)
returning *;