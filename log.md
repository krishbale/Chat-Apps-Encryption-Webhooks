
# nestjs--backend-intern Task Log
```ts
Day 1 -
Day of backend intern
Tuesday 20 June 2023 10:30AM ---- 6:30PM
Task
1.Resources Used on Learned 
2.docs-Nest js, 
3.ORM docs
4.youtube nest js
5.Created repo using documentation 
6.While learning 
7.Controllers,
8.Providers,
9.pipes for validation  and filtering ,
10.Validation using DTO ,
11.ORM ,
12.Typescript
```
```ts
Day-2
Wednesday 21 June 2023 11:30AM :6:50PM
Completed Task 
Migrated the Crud operation from mysql to postgresql
Created basic entities for authentication 
Implemented jwt  strategy and local strategy during authentication an
Created protected routes after authentication which can be accessed using bearer token

Blockers:
Installation and initialization of postgresql server in local machine.
Status 
Github
```
```ts
Day-3
Thursday 22 June 2023  11:30 A.M  : 21:00PM
Completed Task:
Learned about Database Migration and implemented basic migration 
Used dto and class validator in authentication
Completed OTP validation  system 
Blockers :
SSL version  error while sending  otp mail to users
 using nodemailer,
……………….
Status GIthub 
```

```ts
Day-4
Friday 23 June 2023  10:30am : 22:29 PM

Completed Task:
1.Updated SMTP mail  service credentials provided by Pawan sir..
2.Added "forget password" functionality with verified email. 
3.Added "reset password" functionality with OTP provided from verified user email.
4.Updated JWT functionality  ON PROTECTED routes with BearerAccess Token .
5.Added "change password" functionality on protected routes with using old password and userid
6.Explore the socket io documentation and others resources
 and tried creating chat applications backend ---------status github.....
7.Peek a look at swagger documentations.

Blockers ---- SOcket IO ----Couldnot able to complete Private chats..
###############
Status Github.....
```
```ts
Day-5
Sunday 25 June 2023  10:30am : 6:30 PM 

Completed Task :
1.Updated the change password functionality 
2. Authenticated  socket id connection in chat applicatins.
3. Added private chat system in socket 
4.Added the user offline and online status in database for chat applications.
5.Refactoring and formatting code ....

Status Github
```
```ts
Day -6

Monday 26 June 2023 10;30 am : 6:30 pm 
1.Created frontend with react for socket io 
2. added join group in backend
3. added mention feature in backend
4. connected frontend with backend 
5. able to send message to  private and group chat from frontend

blockers.. unable to connect two users with two id using two browsers

status .. github
```
```ts
Day -7 

Tuesday 28 June 2023  11:00am :7:00 pm
Tasks.

1.Went through the template  ultimate nest,  minio and  s3 advantages and alternative
2.Buffered file from frontend and emit the file through socket and also went throught similar repo
and library such as   socketio-stream and file-upload.
3.Also uses the postman to upload the file and which is eventually saved in public folder in backend which tools like multer.

Status ...Github
```
```ts
Day -8

 Thursday  29 June 2023  10 :15 am: 6:15 pm 
 Task:
 1.Uploaded message attachment using postman and emitted to receiver using sockets.
 2.Typeorm Transcation relation and repository docs
 3. implemented transaction in projects
 4.watched the file upload documenation video for amazon s3 services 
 Status:
 Github.....

```
```ts
Day -9 

Friday 30 June 2023 10: 15 am : 6 :15pm 
Task:
1.Study about Web hooks through online resources and 
3.Tested webhooks throught github and discord and created new template code for new projects
4.Study and research on aws and azure for implementing webhooks.
status ...github
```
```ts
Day -10
Sunday July 2 2023 10:15 am to 6:15pm
Task:-
1.Study and research about webhooks from documentation and youtube
2.Created WEBHOOK which trigeered  from github and deployed it.
3.Emitted the data on chat applications which get triggered  from github changes.
4.hosted chat applicatoion on interneet using ngrok while connecting to webhooks app
5.Research about webhooks in aws ,azure 

Blockers....
#Integration of AWS or Azure.
Status ......Github
```
```ts
Day -11 

Monday July 3 2023 10:15 am to 6:15pm

Task:
1.Completed Web hooks using github. 
2.Explore the encryption and decryption in postgres sql  such as pgcryto
3.Migrated the postgres sql database to cloud.
4.added encryption for new message using typeorm + external package


Blockers....
#solving encryption for old messages.

Status:github....
```
```ts
day -12
Tuesday July 4 2023 10:15 to 6:15pm

Task:
1.Study and research  encryptions and decryption  pgcypto 
2.created  custom transformer for encryptions and decryption using crypto package from node
for encrypting columns using AES algorithms

Blockers....invalid initial vectore error during decryption process.

Status .Github
```
```ts
day -13

Wednesday july - 5 2023 10:30 to 6:30pm

Task;

1.Added Encryption system which doesnot use initial vector i.e ecb  status github.tag
2.Updated Encryption system which use initial vector i.e. ebc and ctr .status github.
3.Created custome function api for old unencrypted message  and encrypted message ..

..Status github
```
```ts
day-14

Thurstday July -6 2023 11:00 to 7:00pm
Task:-
1.Explored deeply on pgcrypto extensions and documentation on encryptions availble on psql.
2.Created tested and analyzes  limitations on  sql queries to encrypte and decrypt postgresql column data using different algorithms availble on pgcrypto 
3.Research on  json encryption and went through the concept of  end to end encryptions ,
```
```ts
day -15

Friday July 7 2023 10:00am to 6:00 pm 
Task :-
1.Write the code for RSA Encryption on frontend and backend.
2.Research on feasibility of end to end encryption on API 
4.Disadvantages and advantages of using assymmetirc algorithms.
3.Documentations exploration on protobuff.

Blockers > Unable to use node package on the react application while doing RSA for frontend.

Status:GIthub ..........
```
```ts

day -16 

Sunday July -10  2023 10:00 am to 6:00 pm 
Task:-
1.Implemented rsa algorithms on both frontend(NEXTJS) and backend(NESTJS)
2.Implemeted proto buffer on the backend to covert message into binary . 
3.Research on converitng message to binary and vice versa ..

Blockers. React or frontend system do not incorporate easily during implemtnation working on it.

Status ..... GITHUB.
```
  ```ts
Day -17

Monday July 11 2023 10:00am to 6:00pm
Task:-
1.Explorre the prodcution repo docs and socket docs.
2.Uses the protobuffer to encode and decode message. 
3.Tried to define the proto file and creating correct schemas for proto  file
4.Tested binay message on frontend using socket

 BLockers=> protofbuffers implementation on react didnot go easy again.

 status ...local 
```
```ts
Day -18 2

Tuesday July 11 2023 10:00 am to 6 : 00 pm 
Task:-
1.Tested the api for authorization and workspaces 
2.Detected unlimited otp request while doing forgetpassword .
3.Review the workspaces and user authorization code .

status local...                     
```
```ts
Day -19

Wednesday 10:15am 6:15pm July 12 2023
Tasks:
#Tested api testing and review code 
Using postman and lancemup website web devtools.
 1.workspaces services 
2.Role and permissions
3.created project using  kanban template
4.notification api
5.activity log
```
```ts
Day -20
Thurstday July-13-2023 Signing 10:30 am : signing off 6:30pm
Task:-
1.Created and intialized starter repo for foodburge,vendorio and graphql
2.Went through the documentation of graphql vendor io and learned about foodbourge 
3.Created Query and Mutations &  connected to postgres sql using nestjs and graphql
 
 status :github. local
```
```ts
 Day-21 

 Friday July 14-2023 Signing in 10:00 am : signing off 6:00 pm
 Task:-
 1.Continued working on graphql api 
 2.Tested graphql api in grapql playground
 3.went through vendure io custome pluggins builder docs
 4.Created custom graphql api from custome pluggin.
 Status :Local
```
```ts
 Day -22 
 Sunday July 16 2023 Signing in 10:30 am :signing off 6:30 pm 
 1.Explored the vendure io developers guide 
 2.Explored the multi vendure possibilites and documentation 
 3.Debugging the Graphql joining table between vendure entity and custom entity
4.Run some  mutations and query from playground learned about authorization through 

status :Github ......
```
```ts
Day - 23

Monday July 17 2023 signin 10:00 am : signing off 6:00pm 
1.Created graphql query and mutations for register ,login and verify customer on vendure playground
2.Created the custom user entity based on foodbourg in vendure 
3.Explore the vendure io admin ui and tested roles permission channels mail services etc.

Blockers.:Unable to use private propery from userservices while extending userservices from vendure for user validation .

Status . Github .......
```
```ts
Day -24

Tuesday july 18 2023 signing in 10:00am : signing off 6:00pm
Task==>
==>1.created custom user entity 
==>2.created custom userservice ,resolver
==>3.generated dto by creating graphql schemas 
==>4.created query and mutation to get users by email and create users and store it in database
==>5.merge the repo with mergebranch and requested pull request for mergebranch .

Status . Github.....
```
```ts
Day -25

Wedenesday July 19 2023 Signing In 10:30am : Signing off 6:30 pm
Task==>
==>1.Tested the vendure io roles and permission query and mutations.
===>2.Went throught multi-vendure code bases merge yesterday.
===>3.Get insight on  the CRM model and structure as provided by Tarakanta sir.

Status .postman
```
```ts
Day-26 

July 20 2023,
Thurstday , Signing IN 10:30am : 6:30pm
Task--->
------>1.Study and Research about CRM websites and tested their services.
------>2.Draw simple entity for lead in ER Diagram,
------>3.Discussion about requirement of CRM implementation. 
......>Status @Saleforce.com & @Lucid Chart.
```
```ts
Day-27

July 21 2023,
Friday , Signing in 10:30am ------> 6:30pm
----------------Task-------------->
---------->1.Tested the CRM software for husbspot 
---------->2.Generated ER diagram based on hubspot CRM.
---------->3.Colloborate together to create ER diagram based on Sales FOrce CRM.
-------------Status---------------------------------
-------------@.LUCID CHARTS---------------------------
```
```ts
Day-28
July 23 2023,
Sunday , signing in 10:30 am --- 6:30 pm 
-------Task------->
--->1.Discussion and research on CRM workflow and requiremnets 
--->2.Created the activity diagram using reverse engineering from saleforce.com 
--->3.created new repository and initialized the crud controllers and datasource configuration
--->4.for ---> leads,opportunity,contact,accounts and added Tenzing for colloboration on github.
```
```ts
Day -29

July 24, 2023,
Monday 
Signing in 10:30am ----6:30 pm
------------>Tasks(CRM)
--->1.Created createLeadDto and createaccountDto using class-validator 
--->2.Updated CRUD operation for leads and opportunity.
----3.Explore the opensource crm twenety.com code documentation and tested locally .

Status-github.com
```
```ts
Day -30

July 25, 2023,
Wednesday 
Signing in 10:30am ----6:30 pm
------------>Tasks(CRM)
--->1.Merged two branch of crm and update to github 
--->2.Explore the Saleforce crm functionality and documenation of sales object and model
----3.Created a basic report on relation of oppotunity, Leads ,Contact , Account 

Status-github.com 
```
Day -31
```ts
July 26, 2023,
Wednesday 
Signing in 10:30am ----6:30 pm
------------>Tasks(CRM)
--->1.Collected functional components from saleforces 
--->2.Explore the Saleforce crm functionality and gathering the requirements and updating at Scrum projects
----3.Setting up database and created new branch crm_balkrishna for adding account entity.
----4.Brainstorming on  Kanban slider  swapping logic  

Status- @ github & lmu scrum projects
```
Day-32
```ts
Thu 27 Jul 2023
10:00:00 AM - 06:40:00 PM

- created entity for accounts
- create entity for contacts
- create entity for contracts and pricebook
- Learned about recursive , one to one relation
- created pr request and mergining with main branch

status: github
```
```ts
Day-33
Date:  28July ,Friday
Work start time:  10:30 AM
Work signing off time:  6:30 PM

#Tasks:
  ➟Created DTO for account and opportunty
 ➟Created API for account and opportunity
 ➟ Learned about Containers and as well as workspace role and permission
 ➟API Testing and database migration for account and opportunity


Status : Github
```
```ts
Day-34
Date:  30 July ,Sunday
Work start time:  10:30 AM
Work signing off time:  6:30 PM

#Tasks:
  ➟Added validatioon for createaccount and create opporturnity
 ➟Created DTO, services ,controllers , repository for contract
 ➟Added createcontract api with incremental contract no.starting from 00000101
 ➟API testing for contract etc.


Status : Github

```
Day-35
```ts
Date:  31 July ,Sunday
Work start time:  10:30 AM
Work signing off time:  6:30 PM

#Tasks:
  ➟Updated validation for accounts,and opportunity including updatedto
 ➟Created createaccount,update account , delete account and getaccounts api
 ➟Added createopportunity and update opportunity  api
 ➟Testing the saleforce delete accounts features and API testing. 


Status : Github
```
Day-36
```ts
Date:  2 August ,Wednesday
Work start time:  10:30 AM
Work signing off time:  6:30 PM

#Tasks:
  ➟Created getallaccounts ,getaccountbyid
 ➟Created getopportunity, getopportunitybyid
 ➟Added transferownership for account and opportunity
 ➟Added sendmail  new owner after owneeship transfer
 ->Api testing for multiple users and owners .  


Status : Github 
```
day 37
```ts
Date:  3 August ,Thurstday
Work start time:  10:30 AM
Work signing off time:  6:30 PM

#Tasks:

  ➟Create dto entity, repositories,service for cases
 ➟Created dto entity repositories service for quote 
 ➟created createcase getallcases and getcasebyid
 ➟Created createquote getallquote and getquotebyid
->Updated deleteaccount which throws if active cases.
->Updated deleteopprtunity which also delete related quotes.
 ->Updated createopportunity if quote_id is given
->Updated transfer ownership for account which includes actives cases and all cases
->Updated transfer ownership for opportunity which includes   



Status : Github

```ts
day 38
Date:  4 August ,Friday
Work start time:  10:00  AM
Work signing off time:  6:00 PM

#Tasks:

 ➟created update delete api for case and quote 
 ➟Created getall ,getbyid,update,and delete api for contracts
->Updated deleteaccount which also delete contacts
->Review of code written by Tenzing and pawan sir.
->Api testing on create update get and delete contact .
  



Status : Github 
```

```ts
day 39
Date:  6 August ,Sunday
Work start time:  10:00  AM
Work signing off time:  6:00 PM

#Tasks:

 ➟Created entity dto service and controllers for order 
 ➟Created getall ,getbyid,update,and delete api for order
->Updated deleteaccount which also delete order  
->Fixes contract,quote and opportunity endpoint parameters
->Tested api for account ,opportunity , contact , quotes, cases contract and order
  



Status : Github & Postman
```
Day -40
```ts
day 39
Date:  7 August ,Monday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

#Tasks:

 ➟updated to   the cloud database url
 ➟Updated database query for   account, opportunity, contract
->Updated api endpoint for contract and orders  
->Tested api from cloud and check for validation error and fixing internal server errors
  



Status : Github & Postman
```
Day -41
```ts

Date:  8 August ,Tuesday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

#Tasks:

 ➟updated case service 
 ➟Updated order service
->created another branch to update nest package and dependeny and commited  
->Research on deployment and provided setting up vm for deployment.
  



Status : Github & Postman & Learning server VM
```
Day -42
```ts

Date:  9 August ,Wednesday
Work start time:  10:00  AM
Work signing off time:  6:00 PM

#Tasks:

->Review of api and validation
->Updated roles and permisiion for accounts opportunities etc.
->Tested crm user api for multiple user using different roles and permission
->Created dto and socketgateway for createaccount service ......
->Research about nginx and reverse proxy .
  



Status : Github & Postman 
```
Day -43
```ts

Date:  10 August ,Thurstday
Work start time:  10:00  AM
Work signing off time:  6:00 PM

#Tasks:

->Created dto for socket in crm for account opportunity .etc
->Updated socket emittor and listner for account , opportunity etc.
->Same for contract quotes case and 
->Api testing for account using socket 
->learning about remote access on postgres server from anywhere .
  



Status : Github & Postman 
```
```ts
Day -44
Date:  11 August ,Friday
Work start time:  10:00  AM
Work signing off time:  6:00 PM

----->Tasks:

->Debugging bug in create async api from dto
->Updated crm repository to datasource
->Created socket api for createtask update task delete task and getall?getbyid
->Api testing for crm containers using socket

Status : Github & Postman 
```

```ts
Day -45
Date:  12 August ,Sunday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

----->Tasks:

->Created multiple users for testing crm api using sockets with required permission 
->fixed dto and serivces for opportunity quotes and fixed some errors and bugs.
->Updated ws exception function to emit validation error in postman.
->completed api testing for accounts opportunity contract quotes cases and orders.

Status : Github & Postman 
``````ts
Day -46
Date:  13 August ,Sunday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

----->Tasks:

->Research on Min Io 
->Created Upload file to minio function and tested in min playground
->Pulled request from niraj sir and updated and tested for delete,createdcustomurl,getpresigned url,copy file, get metadata etc.
->Added the uploadtominiocode everywhere in the codebase.

Status : Github 
```
```ts
Day -47
Date:  14 August ,Tuesday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

----->Tasks:

->Removed s3 function and updated minio  for uploadfile,copyfile etc,
->Tested the api related to mioio 
->report the bug during testing and updated validation 
->Merged the code and also tested provided by niraj sir .

Status : Github 
```
```ts
Day -48
Date:  16 August ,Tuesday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

----->Tasks:

->Tested the cdn cloudfront for public and private bucket 
->Tested the large file data for minio 
->Research on code base uglify minify 


Status : Postman and minio dev server. 
```
```ts
Day -49
Date:  17 August ,Thurstday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

----->Tasks:

->Debugging cdn link for image not showing in frontend 
->Updated the and minio access policy and merge the branch with niraj sir
->Tested minio from postman and review the code for multi part 


Status : Postman and minio dev server. 
``````ts
Day -50
Date:  17 August ,Friday
Work start time:  10:30  AM
Work signing off time:  6:30 PM

----->Tasks:

->Tried and research on multipart upload on minio from diffrent resource  . 
->Get insights about how multi part upload works on frontend from abik sir .
->tried to present the research on code obstification 
-Blockers : Multi part implementation 
 
```
