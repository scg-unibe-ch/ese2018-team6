# Backend testing with Postman
## Import collection

 1. Start backend (frontend is not needed).
 2. Open Postman
 3. Choose "File" > "Import" and import the "Job Postings.postman_collection.json" file

## Link admin
The Postman collection needs an admin. Our backend does not have endpoints to create an admin. So you have to use a database which fulfills this requirement or just manually add an admin.
If you have a database with an admin with email "admin" and (unhashed) password "1234", you can skip this section.
 4. Go to the Postman folder "Admin". Choose the request "! Check admin existance and get token".
 5. Open the tab "Body". Replace the "admin"-email with the email of your admin.
 6. Open the tab "Pre-request scripts" and replace "1234" with the password of your admin.
 7. Send the request. Make sure that Postman recieves a 201-response.
 8. Save the request.

## Run all tests

(e.g. for regression testing)
 9. Choose "Runner" in the Postman menubar.
 10. Choose the "Job Postings" collection.
 11. Scroll down and hit "Start run"
 12. Wait for the test results

## Run individual tests

**Most of the requests depend on each other.** For example, if you want to post a Job Posting, you have to be a company that was verified by the admin.
For the Postman collection that means: if you want to run a specific request, **you have to send all requests above in the collection marked with a leading "!" (in top down order)**. Unfortunately, you can't use the Postman Runner to do this.
If you have done this, you can send individual requests directly without using the runner (for debugging, ...).