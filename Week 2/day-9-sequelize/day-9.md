# Sequelize

## Notes
### **Eager Loading**
- The act of querying data of several models at once
    - Sequelize will automatically create and name fields
    Mainly done by using `include` on a model finder query like `findOne` or `findAll`
- Like a `JOIN` in SQL (usually `LEFT OUTER JOIN`)

```Javascript
const pages = await Page.findAll({
    include: [
        {model: User, as 'author'}
    ]
})
```

```Javascript
// Models
Author
Pages

// Associations
Author.hasMany(pages)

// Query to get all authors and include pages
let result = await Author.findAll({
    where: {
        name: 'Nicky',
    },
    include: {
        model: Page, as 'articles'
    }
})

// All pages the author wrote are in the array inside the result
result.articles
```

### **Class and Instance Methods**
- Just Javascript!
We can add functions to the constructor function OR to its prototype (respectively)

## Resources:

#### [🔗 **Eager Loading Documentation**](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/)

#### [🔗 **Magic Methods Chart**](https://medium.com/@julianne.marik/sequelize-associations-magic-methods-c72008db91c9)
