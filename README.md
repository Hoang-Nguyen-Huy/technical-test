<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

- Node.js
- npm
- Git

## Getting Started

### Clone the Repository

First, clone the repository to your local machine: 

```bash
$ git clone https://github.com/Hoang-Nguyen-Huy/technical-test.git
```

then access to the project

```bash
$ cd technical-test
```

## Installing Dependencies

Install the required dependencies using npm: 

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

This project uses Swagger to document the API. To view the API documentation, run the application and open your browser to: [http://localhost:3000/api](http://localhost:3000/api)

### Setting Up Swagger

Swagger is already set up in the project. If you need to modify the configuration, you can find it in the **main.ts** file.

## Using Swagger to Test the API

Swagger provides a user-friendly interface for testing the API. Here are the steps to test the Tasks controller using Swagger:

#### 1. Open Swagger UI

Run the application and navigate to [http://localhost:3000/api](http://localhost:3000/api) in your browser

#### 2. Explore the Endpoints

You'll see the list of available endpoints. The `tasks` endpoints are grouped under the **Tasks** tag.

![image](https://github.com/Hoang-Nguyen-Huy/technical-test/assets/121879570/67fd9f75-5827-4b3a-80bd-0a91ecab8697)

#### 3. Test the API

###### a. Get Tasks

![image](https://github.com/Hoang-Nguyen-Huy/technical-test/assets/121879570/6fa64151-723a-4d60-9b6a-23565e152f80)

- Click on the **GET /tasks** endpoint.
- Click the **Try it out** button.
- Add query parameters to filter the tasks, the **status** should be **incompleted** or **completed**.
- Click the **Execute** button to see the response.

###### b. Create Task

![image](https://github.com/Hoang-Nguyen-Huy/technical-test/assets/121879570/e975fbe2-a418-4a39-b85c-41e29465a1cf)

- Click on the **POST /tasks** endpoint.
- Click the **Try it out** button.
- Enter the task details in the request body in JSON format, the **status** is optional, it will be **incompleted** if you let it empty, for example:
```json
{
  "title": "Test",
  "description": "Test tasks",
  "status": "incompleted"
}
```
- Click the **Execute** button to see the response.

###### c. Get Task by ID

![image](https://github.com/Hoang-Nguyen-Huy/technical-test/assets/121879570/d68685e6-a2a1-42c1-8b17-0cc49df93802)

- Click on the **GET /tasks/{taskId}** endpoint.
- Click the **Try it out** button.
- Enter a valid **taskId**
- Click the **Execute** button to see the response.

###### d. Update Task

![image](https://github.com/Hoang-Nguyen-Huy/technical-test/assets/121879570/a129fc4f-3298-4cf5-a8b3-08135f00c309)

- Click on the **PUT /tasks/{taskId}** endpoint.
- Click the **Try it out** button.
- Enter a valid **taskId**.
- Enter the updated task details in the request body in JSON format, for example:
```json
{
  "title": "Test",
  "description": "Test tasks",
  "status": "incompleted"
}
```
- Click the **Execute** button to see the response.

###### e. Delete Task

![image](https://github.com/Hoang-Nguyen-Huy/technical-test/assets/121879570/8b008cc3-b801-4770-b071-3a097f2cef3d)

- Click on the **DELETE /tasks/{taskId}** endpoint.
- Click the **Try it out** button.
- Enter a valid **taskId**.
- Click the **Execute** button to see the response.

## Testing

```bash
# unit tests
$ npm run test
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
