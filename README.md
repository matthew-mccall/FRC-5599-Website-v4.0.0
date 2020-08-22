# FRC 5599 Website v4.0.0
This is the repository for the redesign of FRC 5599 BNCHS Sentinel's website.
## How to test:
1. Download the project and unzip it.
2. Install [Redis](https://redis.io/).
3. Run `redis-server`.
4. Change your working directory to the unzipped folder.
5. Run `npm install` to install all necessary packages.
6. Run `node .` to run the website.
7. Browse to [127.0.0.1:3000](http://127.0.0.1:3000) or [localhost:3000](http://localhost:3000) to view the website.
# Notes:
Several pages rely on the MongoDB database referenced in code. The objects stored in the database are expected to be in this format:
```js
{
    name: String
    username: String
    salt: String
    password: String //Stored as hash using PBKDF 2
    desc: String
    isBoard: Boolean
    isMentor: Boolean
    isAlumni: Boolean
    division: String
    joined: Number
}
```
