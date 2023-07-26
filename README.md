# Expense-Tracker



## 介紹

屬於自己的記帳本，可以新增、修改、刪除支出紀錄與新增使用者。

## 功能

* 瀏覽所有支出與總金額
* 新增支出
* 修改支出的名稱、日期、類別與金額
* 刪除支出
* 依篩選特定類別清單與總金額
* 使用者可以用 email 或 Facebok 註冊與登入
* 使用者可以建立並管理專屬的支出清單

## 開始使用

1. 請先確認有安裝 Node.js 與 npm
2. 開啟終端機，到欲存放專案的路徑下，將專案 clone 到本地，輸入：

   ```bash
   git clone https://github.com/YD1234564789/expense*tracker.git
   ```
3. 開啟終端機，到欲存放專案的路徑下，將專案 clone 到本地，輸入：

   ```bash
   cd expense*tracker
   ```
   
4. 安裝相關套件，輸入：

   ```bash
   npm install
   ```

5. 安裝 nodemon 

   ```bash
   npm i *g nodemon
   ```

6. 根據 .env.example 設定環境變數，新增 .env 檔案，檔案中輸入：

   ```bash
   MONGODB_URI=SKIP
   FACEBOOK_ID=SKIP
   FACEBOOK_SECRET=SKIP
   FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
   SESSION_SECRET=SKIP
   PORT=3000
   ```

7. 載入種子資料，輸入：

   ```bash
   npm run seed
   ```

8. 在終端機看見以下訊息代表順利執行

   ```bash
   MongoDB connected!
   CategorySeed is created!
   UsersSeed is created!
   ```
   
9. 執行專案，輸入：

   ```bash
   npm run start
   ```

10. 在終端機看見以下訊息代表順利執行

   ```bash
   App is listening on http://localhost:3000
   mongodb connected!
   ```

11. 打開瀏覽器輸入以下網址

    ```bash
    http://localhost:3000
    ```
12. 終止伺服器
    
    ```bash
    ctrl + c
    ```
    
測試帳號
   >* name: 廣志
   >* email: <user1@example.com>
   >* password: 123456

   >* name: 小新
   >* email: <user2@example.com>
   >* password: 123456

## 開發工具
* Node.js: 18.14.0
* Express: 4.16.4
* Bootstrap: 5.1.3
* Bcrypt.js: 2.4.3
* Body*parser: 1.20.2
* Connect*flash: 0.1.1
* Express*handlebars: 7.0.7
* Express*session: 1.17.3
* Method*override: 3.0.0
* Mongoose: 5.9.7
* Passport: 0.4.1
* Passport*facebook: 3.0.0
* Passport*local: 1.0.0
