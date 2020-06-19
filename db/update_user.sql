update users
set email= $2, name = $3, address = $4
where user_id = $1
returning *;
