alter table orders add column payment_method varchar(255);

update orders set payment_method = 'COD' where payment_method is null;
