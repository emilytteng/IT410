-- Accounts

CREATE TABLE "accounts" (
    "userid" varchar(50) NOT NULL,
    "username" varchar(50) NOT NULL,
    "password" varchar(100) NOT NULL,
    PRIMARY KEY ("userid")
);

-- Sessons

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- Course

CREATE TABLE "courses" (
    "userid" varchar(50) NOT NULL,
    "courseid" varchar(50) NOT NULL,
    "coursename" varchar(50) NOT NULL,
    PRIMARY KEY ("courseid"),
    FOREIGN KEY ("userid") REFERENCES "accounts" ("userid") ON DELETE CASCADE
);

CREATE INDEX "courses_userid" ON "courses" ("userid");

-- Assignment

CREATE TABLE "assignments" (
    "asgmtid" varchar(50) NOT NULL,
    "courseid" varchar(50) NOT NULL,
    "asgmtname" varchar(50) NOT NULL,
    "duedate" date NOT NULL,
    "completed" boolean NOT NULL,
    PRIMARY KEY ("asgmtid"),
    FOREIGN KEY ("courseid") REFERENCES "courses" ("courseid") ON DELETE CASCADE
);