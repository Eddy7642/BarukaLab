USE [BarukaLabDB];
GO

-- Selezioni
SELECT * FROM ProductCategories;
SELECT * FROM Offers;
SELECT * FROM Products;
SELECT * FROM Users;
SELECT * FROM Reviews;
SELECT * FROM Carts;
SELECT * FROM CartItems;
SELECT * FROM Orders;
SELECT * FROM Payments;

-- Cancellazione
DELETE FROM Users WHERE UserId = 3;
DELETE FROM Reviews WHERE ReviewId=7;


-- Aggiornamento in Carts
UPDATE Carts
SET Ordered = 'true',
    OrderedOn = (SELECT OrderedOn FROM Carts WHERE CartId = 1)
WHERE CartId = 1;



-- Inserimento in Users
INSERT INTO Users (FirstName, LastName, Address, Mobile, Email, Password, CreatedAt, ModifiedAt) 
VALUES ('Mario', 'Rossi', 'Via Roma 1, Milano', '3331234567', 'mario.rossi@example.com', 'password123', GETDATE(), GETDATE());
