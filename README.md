# pisys-web-audit

pisys-web-audit is a UI to View Audit of the tables in DB

## Description

A web Page that shows changes, snapshots and shadows of the table on which we perform audit.

## Prerequisites

- For using this project you require pisys-svc-audit project.
- If your pisys-svc-audit running on different port other than 8080 then you need to change the `proxy` property in the `package.json` file. You can write your running service port number there.

## How to run locally

- Fork this repository
- Navigate to `project location` in command line
- Run `npm install`
- Run `npm start`
- Browse to [http://localhost:3000/](http://localhost:3000/)
