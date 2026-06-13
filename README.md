\# Computer Lab Inventory System



A full-stack inventory management system for managing computer laboratory equipment, borrowing, and returning transactions.



This project uses:



\- ReactJS + TypeScript (Frontend)

\- Ant Design (UI Framework)

\- Node.js + Express.js (Backend)

\- Microsoft SQL Server (Database)

\- REST API



\---



\# Project Features



\## Authentication

\- User login

\- User role management



\## Equipment Management

\- Add equipment

\- Edit equipment

\- Delete equipment

\- Search equipment

\- Track available quantity



\## Borrowing System

\- Borrow equipment

\- Validate available stock

\- Create borrow records

\- Automatically reduce available quantity



\## Return System

\- Return borrowed equipment

\- Automatically restore quantity

\- Update borrow status



\## Dashboard

\- Equipment statistics

\- Inventory overview



\## Reports

\- Equipment charts

\- Inventory analytics



\---



\# Setup the codes



\## Step 1: Required tools before cloning the repository



\### 1. Node.js



\- https://nodejs.org/



\### 2. MS SQL Server



\- SQL Server Express / Developer Edition

\- SQL Server Management Studio (SSMS)



\### 3. Microsoft ODBC Driver



This project uses Windows Authentication, so install:



\- Microsoft ODBC Driver for SQL Server



Download:



https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server



\### 4. VS Code



After installing, restart your computer.

## Step 2: Cloning the repository



\- Type on cmd:  git clone https://github.com/your-account/computer-lab-inventory-system.git

\- Open the project folder on VS Code



\## Step 3: Set up database



\- Open SQL Server Management Studio

\- Connect with Windows Authentication

\- Open the database/database.sql and execute the script

\- The database name is: ComputerLabInventorySystem 

\- The tables are: users, equipment, borrow\_records



\## Step 4: Backend Setup



In the terminal of VS Code when the folder project is open type:

\- cd server

\- npm install express cors dotenv msnodesqlv8 mssql nodemon



Then set up the .env in the server side, paste this code and change the variables with comment based on your SQL Server Management Studio



PORT=5000



DB\_DRIVER=ODBC Driver 18 for SQL Server

DB\_SERVER=DESKTOP-3LK8Q2C\\GLORIE # Your server name

DB\_NAME=ComputerLabInventorySystem # Database name



\# check the connection configuration for these three

DB\_TRUSTED=Yes 

DB\_ENCRYPT=NO

DB\_CERT=Yes



Then run backend, in cmd type: node server.js



Expected output: 



Connected to Database

Server running on 5000



\## Step 5: Frontend Setup (make sure the browser has 100% size, css responsiveness is not included yet)



Open a new terminal and type on cmd:

&#x20;- cd client

&#x20;- npm install antd axios react react-dom react-router-dom recharts



Then run the frontend, in cmd type: npm run dev



Expected output:



➜ Local:   http://localhost:5173/

➜  Network: use --host to expose

➜  press h + enter to show help



\---



\# How to use the system



\## Step 1: Login Testing 



\- username: admin

\- password: admin123



\## Step 2: Checking Features



\### Equipment



\- Add equipment

\- Edit equipment

\- Delete equipment

\- Search



\### Borrow



Input:



Borrower name

Quantity



Expected:



Borrow record created

Available quantity decreases



\### Return



Expected:



Status becomes Returned

Equipment quantity increases



\---



\# Some Challenges I have Encountered



There are multiple of challenges I have encountered upon developing this project because the required stack is not my usual stack. 



I usually use PHP Laravel as the backend of a website. Though it does not stop me to build this project, I learned how to use the Node or Express JS by conducting this examination. The usage of JavaScript backend is not new for me because I used it for some of our activities in my school days, but not for a real project. Unlike the PHP backend, which serve as the  foundation of RESTful API and backend developing since I am in my junior year in college. 



One more thing, the Microsoft SQL is not also the database interface I am using when I am building a web. I usually use Firebase for non-Query and PhpMyAdmin or XAMPP for localhost database. It's been difficult for me to connect backend to the database because of errors in my studio and configurations. However, I still manage to fix the configurations and that lead me to finishing this project. 



Despite these challenges, I was able to troubleshoot the connection problems, configure the required tools, and successfully integrate the backend with the database. This process helped me gain experience with new technologies and improved my ability to adapt to unfamiliar development environments.





























