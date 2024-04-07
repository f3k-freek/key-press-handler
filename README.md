# name-of-project

## Documentation

<https://docs.amaze360.nl/name-of-project>

## Issues

[issues@example.com](mailto:issues@example.com)

## Github Repository

<https://git.amaze360.nl/360/name-of-project>

## Install

```sh
npm install git+ssh://git@github.com:username/name-of-project.git
```

## Upgrade

```sh
npm upgrade git+ssh://git@github.com:username/name-of-project.git
```

## Conventions

###  Naming Convention

| Style          | Category                                                           |
|:---------------|:-------------------------------------------------------------------|
| UpperCamelCase | class / interface / type / enum / decorator / type parameters      |
| lowerCamelCase | variable / parameter / function / method / property / module alias |
| CONSTANT_CASE  | global constant values, including enum values                      |
| #ident         | private identifier, we don't use 'private/public'                  |

### Documentation Convention

| Category | Comments                                                                                                                |
|:---------|:------------------------------------------------------------------------------------------------------------------------|
| Private  | all private categories, should be ignored (unless relevant to end user)                                                 |
| Public   | names of public categories should be self explanatory. Only add additional info if the name cannot describe the purpose |
| Classes  | public classes should contain (a link to) a minimal working example                                                     |

### Comments Convention

Functions should be short, unambiguous and self explanatory. Thus not need commenting. If fuctions become too complicated, try to cut them up into smaller functions. Use comments only as a last resort.

## Consume bundle.js

### Bundle.js

#### HTML

```html
<html>
<head>
</head>
<body>
    <!-- HTML code goes here -->
    <!-- Include JS -->
    <script src="path/to/my-project/dist/bundle.js"></script>
</body>
</html>
```
#### JS

```js
const MC = new window.MyProject.MyClass();
```
