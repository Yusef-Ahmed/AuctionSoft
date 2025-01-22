# How to use
Add your application configuration to your `.env` file in the `BackEnd` folder:

```shell
DATABASE_URL = mysql://<user>:<password>@<host>:<port>/<database>
```

Then run `npm run db:generate` to make a `SQL` queries
Then run `npm run db:migrate` to excequte this `SQL` queries

Then type `npm start` on the `FrontEnd` folder once, and in `BackEnd` folder once more