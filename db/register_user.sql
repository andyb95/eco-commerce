insert into users(email, password)
values($1, $2);

select * from users
where email = $1;