update users
set name = $2, email= $3, password = $4, address = $5
where user_id = $1
returning *;
