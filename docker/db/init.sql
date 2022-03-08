-- Accounts

CREATE TABLE "accounts" (
    "userid" varchar(50) NOT NULL,
    "username" varchar(50) NOT NULL,
    "password" varchar(100) NOT NULL,
    PRIMARY KEY ("userid")
);

ALTER TABLE "accounts" ADD CONSTRAINT "accounts_username" UNIQUE ("username");

-- Sessons

CREATE TABLE "sessions" (
  "sessionid" varchar NOT NULL COLLATE "default",
  "session" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sessionid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");

-- Course

CREATE TABLE "courses" (
    "courseid" varchar(50) NOT NULL,
    "coursename" varchar(50) NOT NULL,
    PRIMARY KEY ("courseid")
);

ALTER TABLE "courses" ADD CONSTRAINT "courses_courseid" UNIQUE ("courseid");
-- CREATE INDEX "courses_courseId" ON "courses" ("courseId");

-- Assignment

CREATE TABLE "assignments" (
    "asgmtid" varchar(50) NOT NULL,
    "courseid" varchar(50) NOT NULL,
    "asgmtname" varchar(50) NOT NULL,
    "duesate" timestamptz NOT NULL,
    "asgmttype" varchar(50) NOT NULL,
    "completed" boolean NOT NULL,
    PRIMARY KEY ("asgmtid")
);

ALTER TABLE "assignments" ADD CONSTRAINT "assignments_asgmtid" UNIQUE ("asgmtid");
-- CREATE INDEX "assignments_asgmtId" ON "assignments" ("asgmtId");
-- CREATE INDEX "assignments_dueDate" ON "assignments" ("asgmtId", "dueDate");
-- CREATE INDEX "assignments_completed" ON "assignments" ("asgmtId", "completed");