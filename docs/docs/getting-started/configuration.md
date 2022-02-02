---
title: Configuration
---

The following is a list of the environment variables, their uses and their default values

### app.env
| Env Name             | About                                               | Default value(s)                                                                        | Note                                                                                        |
|----------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| FRONTEND_URL         | URL for frontend                                    | `localhost:3000`                                                                        | N/A                                                                                         |
| DB_HOST              | The hostname of the database                        | `db`                                                                                    | `db` is the service name in the `docker-compose.yaml` file                                  |
| DB_PORT              | The database port                                   | `5432`                                                                                  | N/A                                                                                         |
| DB_NAME              | Database name                                       | `cdb`                                                                                   | N/A                                                                                         |
| DB_USER              | Database username                                   | `postgres`                                                                              | N/A                                                                                         |
| DB_PASSWORD          | Password for the database                           | `postgres`                                                                              | N/A                                                                                         |
| REDIS_ADDR           | The hostname and port of the RedisDB                | `caching:6379`                                                                          | `caching` is the service name in the `docker-compose.yaml` file                             |
| REDIS_PASS           | The password for the RedisDB                        | `password`                                                                              | The password must also be changed in the `docker-compose.yaml` in the `--requirepass` field |
| REDIS_DB             | The database to be selected when connected to Redis | `0`                                                                                     | N/A                                                                                         |
| ADMIN_USERNAME       | Username for admin                                  | `admin`                                                                                 | N/A                                                                                         |
| ADMIN_EMAIL          | Email for admin account                             | `admin@email.com`                                                                       | This is a placeholder email. Please change it.                                              |
| ADMIN_PASSWORD       | Password for admin                                  | `password`                                                                              | The admin password will be hashed when inserted into the database                           |
| JWT_SECRET           | JWT Signing Secret                                  | `2ofClubs`                                                                              | N/A                                                                                         |
| COMPANY_NAME         | Company Name                                        | `2ofClubs`                                                                              | N/A                                                                                         |
| COMPANY_LINK         | Company Link                                        | `https://2ofClubs.app`                                                                  | This will be shown in the password reset email                                              |
| COMPANY_LOGO         | Company Logo                                        | `https://raw.githubusercontent.com/2-of-clubs/2ofclubs-docs/master/static/img/logo.png` | This will be shown in the password reset email                                              |
| COMPANY_COPYRIGHT    | Company Copyright                                   | `Copyright @ 2020 2ofClubs.app. All rights reserved.`                                   | This will be shown in the password reset email                                              |
| EMAIL_BODY_SIGNATURE | The email body signature                            | `Finding the perfect club for you!`                                                     | This will be shown in the password reset email                                              |
| EMAIL_FROM_HEADER    | The email from header                               | N/A                                                                                     | This field is for the credentials of the no-reply reset email                               |
| EMAIL_HOST           | The email host                                      | N/A                                                                                     | This field is for the credentials of the no-reply reset email                               |
| EMAIL_PORT           | The email port                                      | N/A                                                                                     | This field is for the credentials of the no-reply reset email                               |
| EMAIL_USERNAME       | The email username (i.e. the email itself)          | N/A                                                                                     | This field is for the credentials of the no-reply reset email                               |
| EMAIL_PASSWORD       | The email password                                  | N/A                                                                                     | This field is for the credentials of the no-reply reset email                               |

### db.env
| Env Name          | About                 | Default value(s) | Note |
|-------------------|-----------------------|------------------|------|
| POSTGRES_USER     | Username for database | `postgres`       | N/A  |
| POSTGRES_PASSWORD | Password for database | `postgres`       | N/A  |
| POSTGRES_DB       | Database name         | `cdb`            | N/A  |

---
:::caution
2ofClubs is under active development. This page is subject to change.
:::
