// Copyright (C) 2019 Digitalents Helsinki

export const config = {
  port: process.env.PORT,
  arangodb: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    url: process.env.DB_URL
  }
}
