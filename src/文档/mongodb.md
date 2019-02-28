## 开始之前，先启动mongodb，在`bin`目录下，以上一级目录下的db文件夹启数据库
```
mongod --dbpath=../db
```

## Start the mongo Shell
### 在mongo安装目录下，启动mongo
```
./bin/mongo
```
### 如果配过环境变量，直接
```
mongo
```
### 也是可以的。

___
### 参考:https://docs.mongodb.com/manual/reference/program/mongo/#mongo-usage-examples
> When you run mongo without any arguments, the mongo shell will attempt to connect to the MongoDB instance running on the localhost interface on port 27017.
### 可以指定参数以如下方式启动
```
mongo --username <user> --password <pass> --host <host> --port 28015
```
### 简写形式
```
mongo -u <user> -p <pass> --host <host> --port 28015
```
___
## Working with the mongo Shell
```
show dbs;                  #查看全部数据库

show collections;          #显示当前数据库中的集合（类似关系数据库中的表）

show users;                #查看当前数据库的用户信息

use <db name>;             #切换数据库跟mysql一样

db;或者db.getName();        #查看当前所在数据库

db.help();                 #显示数据库操作命令，里面有很多的命令
db.<collection>.help();             #显示集合操作命令，同样有很多的命令
db.<collection>.find();             #对于当前数据库中的指定集合进行数据查找（由于没有条件，会列出所有数据，在shell里面则会列出前20条）
db.<collection>.find( { a : 1 } );  #对于当前数据库中的指定集合进行查找，条件是数据中有一个属性叫a，且a的值为1
```