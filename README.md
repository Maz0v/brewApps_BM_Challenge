# brewApps Node.js Backend Developer Challenge
- API endpoints
- Add books api -> http://localhost:3000/api/addbook
- View books api -> http://localhost:3000/api/viewbook
- View books by Id api -> http://localhost:3000/viewbookbyid/:id (In place of :id give original book id which is created by add books api)
- Update books api -> http://localhost:3000/updatebook/:id (In place of :id give original book id which you want to update)
- Delete books api -> http://localhost:3000/deletebook/:id (In place of :id give original book id which you want to delete)
## Installation
- First you have to install a code editor like vs code.
- open the terminal and clone the project in the local system.
- run npm i in backend
- create a dotenv file and write the mongo db connection string id password which is provided in google form or use any mongodb connection of yours.
- mongodb_uri = mongodb+srv://<id>:<password>@bm-crud.g5fzgoe.mongodb.net/book_Management_CRUD?retryWrites=true&w=majority
- after that run npm start and hit the endpoints of api with request body shown below.
  ## Request Body
- Add books
  {
  "title": "Rich dad poor dad",
  "author": "Mazhar Alam",
  "summary": "this is  a motivational book.",
  "image": "https://images.pexels.com/photos/4245027/pexels-photo-4245027.jpeg?auto=compress&cs=tinysrgb&w=1600"

}
-Update books
{ 
  "title":"Thousand miles to go",
  "author":"Mazhar Alam ov",
  "summary":"this is  a motivational book."
}
- Update, Viewby Id, delete books pass data in params like
  localhost:3000/viewbookbyid/65410ee7fe7bf1fcb35819a4
  localhost:3000/deletebook/65410ee7fe7bf1fcb35819a4
  localhost:3000/viewbookbyid/65410ee7fe7bf1fcb35819a4
  ### Special Note
  - I am not deleteng the data using delete functionality. I have used a variable isDeleted as boolean.
  - If any data is dleted then isDeleted field for that book should be true otherwise by default it should be false.
