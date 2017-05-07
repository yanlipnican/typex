# Typex framework
**(Not yet production ready, but soon...)**

Typex is lightweight **typescript** framework built on top of **Express.js**. It adds bit of opinion to unopinionated 
world of node, to help you make a better software and javascript development process more pleasant. It's goal is to provide
Spring(Java)/Symfony(PHP) like project structure such as controllers, services and **dependency injection**. It leverages 
typescript classes, annotations and few packages to jump start you to write a very good structured and readable code.

## Documentation
* Demo project is [here](https://github.com/typex-framework/typex-example).
* You can find documentation [here](https://typex-framework.gitbooks.io/typex-framework).

## Development
1. Clone project.
2. Install dependencies: ```npm install``` (use **yarn** if you are cool enough).
3. Run ```npm link``` to link this package to your global node_modules.
4. Create test project or clone demo above.
5. Install dependencies: ```npm install```.
6. Remove typex from node_modules ```rm -rf node_modules/@typex-framework```.
7. Run ```npm link @typex-framework/core``` to link package from your global node modules to your demo project.
8. In typex directory run ```npm run dev``` and start tinkering.Your edited code will be accessible from demo project.
