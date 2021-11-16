# rest-api-ts

This is a REST API which allows to creat the users, user session & products. Build with [this tutorial](https://www.youtube.com/watch?v=BWUi6BS9T5Y&t=0s) - docker is my addition to make the development process nicer.

Build in express, written in TS, containerized by docker.

## Instruction

Be sure to get the docker up & running on your pc, then in the main dir of the project run this command: `npm run reload`. The script will rebuild the project.

### Testing

To test the server by postman you can use the collection from `postman_testing.json` file.
To use it, click on `file` in postman window, then `import...`. I the new window that will appear, select `Raw text` tab and copy the content of the `postman_testing` file.

## Libs & packages
- [express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [cors](https://github.com/expressjs/cors#readme)
- [nanoid](https://github.com/ai/nanoid#readme)
- [pino](https://getpino.io/#/)
- [lodash](https://lodash.com/)
- [dayjs](https://day.js.org/)
- [zod](https://github.com/colinhacks/zod)