# How to use
- Add your application configuration to your `.env` file in the `BackEnd` folder:

```shell
DATABASE_URL = mysql://<user>:<password>@<host>:<port>/<database>

JWT_SECRET_KEY = generate_any_secret_key_you_want

JWT_EXPIRE_TIME = time_in_seconds
```
```
Note: You can generate a `JWT_SECRET_KEY` in the console by running this command:

`node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"`
```

- Run `npm run db:generate` to make a `SQL` queries in `/util/database/migrations`

- Run `npm run db:migrate` to execute this `SQL` queries

- Type `npm start` on the `FrontEnd` folder once, and in `BackEnd` folder once more