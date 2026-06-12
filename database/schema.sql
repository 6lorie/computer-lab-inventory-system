/* ============================
   CREATE DATABASE
============================ */

CREATE DATABASE ComputerLabInventorySystem;
GO

USE ComputerLabInventorySystem;
GO


/* ============================
   USERS
============================ */

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),

    username VARCHAR(50)
        NOT NULL UNIQUE,

    password VARCHAR(255)
        NOT NULL,

    full_name VARCHAR(150)
        NOT NULL,

    role VARCHAR(20)
        DEFAULT 'staff',

    created_at DATETIME
        DEFAULT GETDATE()
);
GO


/* ============================
   EQUIPMENT
============================ */

CREATE TABLE equipment (
    id INT PRIMARY KEY IDENTITY(1,1),

    equipment_code VARCHAR(50)
        UNIQUE NOT NULL,

    equipment_name VARCHAR(150)
        NOT NULL,

    category VARCHAR(100),

    quantity INT
        DEFAULT 0,

    available INT
        DEFAULT 0,

    location VARCHAR(100),

    status VARCHAR(30)
        DEFAULT 'Available',

    created_at DATETIME
        DEFAULT GETDATE()
);
GO


/* ============================
   BORROW RECORDS
============================ */

CREATE TABLE borrow_records (
    id INT PRIMARY KEY IDENTITY(1,1),

    equipment_id INT
        NOT NULL,

    borrower_name VARCHAR(150)
        NOT NULL,

    quantity INT
        NOT NULL,

    borrowed_date DATETIME
        DEFAULT GETDATE(),

    returned_date DATETIME
        NULL,

    status VARCHAR(30)
        DEFAULT 'Borrowed',

    FOREIGN KEY (equipment_id)
        REFERENCES equipment(id)
);
GO


/* ============================
   SAMPLE USERS
============================ */

INSERT INTO users
(
    username,
    password,
    full_name,
    role
)
VALUES
(
    'admin',
    'admin123',
    'System Administrator',
    'admin'
);

GO


/* ============================
   SAMPLE EQUIPMENT
============================ */

INSERT INTO equipment
(
    equipment_code,
    equipment_name,
    category,
    quantity,
    available,
    location
)
VALUES

(
'PC-001',
'Desktop Computer',
'Computer',
30,
30,
'Lab A'
),

(
'MON-001',
'Monitor',
'Display',
25,
25,
'Lab A'
),

(
'KEY-001',
'Keyboard',
'Accessory',
40,
40,
'Storage'
),

(
'MOU-001',
'Mouse',
'Accessory',
40,
40,
'Storage'
),

(
'PRO-001',
'Projector',
'Presentation',
2,
2,
'Room 201'
);

GO


/* ============================
   TEST QUERIES
============================ */

SELECT * FROM users;

SELECT * FROM equipment;

SELECT * FROM borrow_records;

GO