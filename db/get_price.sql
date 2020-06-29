select sum(price)
from products p
join cart c on p.product_id = c.product_id
where user_id = $1;