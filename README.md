# s3-file-uploader
Code template to upload files to S3 using nodejs

## Running the application
### Manually
Update the database connection by updating
DATABASE_HOST=
DATABASE=
DB_USERNAME=
DB_PASSWORD=
on the .env file in the app folder preferably with localhost credentials for testing

Install the noje packages of the applications by running npm install

Run the server nodemon start

Interact with the api via postman. The default URI is http://{your url}:{port number}/api/v1/your-route eg: http://localhost:8080/api/v1/upload
