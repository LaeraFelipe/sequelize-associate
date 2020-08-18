
# sequelize-associate

sequelize-associate is a javascript library that import models from a directory and associate all together.

## Getting Started

These instructions will help you to get and use sequelize-associate on your app.

### Installing

```
npm install --save sequelize-associate
```

### Using

You can use in a index file on your models directory for example: 

```js
import sequelizeAssociate from 'sequelize-associate';

sequelizeAssociate(__dirname);
```

You can also pass some options:

```js
sequelizeAssociate(__dirname, { 
  pattern: /\.model\.js$/, //Match all files that ends with model.js.
  recursive: true //Will search in all subdirectories.
});
```

## Authors

*  **Felipe Laera** - *Software Engineer*

See also the list of [contributors](https://github.com/LaeraFelipe/sequelize-associate/contributors) who participated in this project.
  

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/LaeraFelipe/sequelize-associate/blob/master/LICENSE.md) file for details
  