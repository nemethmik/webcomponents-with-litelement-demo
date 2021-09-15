# A List of Persons Web Components with Lit/TypeScript

This is a working version with WebPack 5 and TypeScript 4
The **target** in *tsconfig.json* must be **es2020** or *es2019* or *es2018* but never esnext. 
--

This is a fork of Filip Bruun Bech-Larsen's [Intro to Webcomponents with LitElement](https://youtu.be/ADgo_JVK02A) one of the best intro to web components (custom elements) using Li HTML and Element. Just watch the video it explains all.
I have added ESLint and WebPack 5 and TypeScript 4 support.


## After cloning
- *npm install* and the *npm run serve* webpack will open the application in the default browser
- In the browser open the debug tool and you will find these two messages:
    - `The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.`
    which is simply not true see src\elements\people-app.element.ts and src\elements\person-card.element.ts both uses the import syntax as required:
    ```
    import { LitElement, html,css,TemplateResult } from "lit"
    import { customElement, query, property } from "lit/decorators.js"
    ```

The images appear only when building a production version:
- *npm run build*
- *npm run servor* (yep, servor)

## Getting rid of the Error: The following properties on element person-card will not trigger updates as expected because they are set using class fields
If you have this error 
`Uncaught (in promise) Error: The following properties on element person-card will not trigger updates as expected because they are set using class fields: person. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`
which is again not true, since exactly the same source code worked great with WebPack 4 and TypeScript 3.

You have two options:
- **Downgrad from TypeScript 4 to TypeScript 3** with *npm i -D typescript@3* this error message will disappear and the application is going to work. 
- Changed the **target** in *tsconfig.json* from ESNext to **es2020**, and it will work great with TypeScript 4, too.

## Giving a try to Webpack 5 and ts-loader
- First, I removed all dev dependencies *npm uninstall awesome-typescript-loader html-webpack-plugin terser-webpack-plugin typescript webpack webpack-cli webpack-dev-server*
- Then I installed webpack 5 CLI *npm i -D webpack-cli*
- Rename *package.json* and *tsconfig.json* before running *npx webpack-cli init* since it will create a new package.json and tsconfig.json.
- Since we have a new package.json at this point *npm i lit* 



## Branch webpack4workingfine 

This is a fork of Filip Bruun Bech-Larsen's [Intro to Webcomponents with LitElement](https://youtu.be/ADgo_JVK02A) one of the best intro to web components (custom elements) using Li HTML and Element. Just watch the video it explains all.

Why is this example is interesting? Since it has webpack 4 bundler configuration that actually works with Lit Element's @property decorators.

Warning! The images are not shown because possibly in the maentime *thispersondoesnotexist.com* has decided not allow images to show.
`Cross-Origin Read Blocking (CORB) blocked cross-origin response https://thispersondoesnotexist.com/?1 with MIME type text/html.`

After cloning run 
- **npm install** and then **npm start**
- or **npm build** and then **npm run servor** (yes, servor)

The webpack configuration is for version 4 and uses *awesome-typescript-loader* for loading TypeScript files. 

## Adding ESLint
When I tried to use TypeScript 4 *npm install typescript@latest* I received an error  
*Module build failed: Error: Final loader (./node_modules/awesome-typescript-loader/dist/entry.js) didn't return a Buffer or String* 
So, awesome-typescript-loader, which is not maintained any more, works only with TypeScript 3 *npm install typescript@3*
For strickter static type checking I have enabled
```json
    "strictNullChecks": true,       
    "strictFunctionTypes": true,    
    "noImplicitThis": true,        
    "noImplicitReturns": true,         
```
in *tsconfig.json*

Then I installed and cnfigured ESLint. For maximum efficiency add *ESLint extension* to Visual Studio Code, too.
- *npm i -D eslint*
- *npx eslint init* creates an *.eslintrc.json* and I added these rules:
    ```json
        "@typescript-eslint/no-non-null-assertion":"off",
        "@typescript-eslint/explicit-function-return-type": "error", 
        "@typescript-eslint/explicit-module-boundary-types": ["warn", {"allowArgumentsExplicitlyTypedAsAny":true}], 
        "@typescript-eslint/no-explicit-any":"warn", 
        "quotes": ["error","double",{ "allowTemplateLiterals": true}], 
        "@typescript-eslint/semi": ["error", "never"], 
        "@typescript-eslint/ban-ts-comment": ["warn"]    
    ```
- And finally a new script command `"fix": "eslint src --fix"` in *package.json*
    - I ran it to convert the TypeScript files to my style - I am sorry [Filip Bruun Bech-Larsen](https://github.com/filipbech)
- Following the instructions on [lit.dev typescript-typings](https://lit.dev/docs/components/defining/#typescript-typings) I added
    ```typescript
    declare global { interface HTMLElementTagNameMap { "people-app": PeopleAppElement}}
    declare global { interface HTMLElementTagNameMap { "person-card": PersonCardElement}}
    ```
- I added the brilliant servor to test the after build solution:
`"servor":"npx servor dist index.html 4000 --browse --reload"`
- To make the test even more complete I have added an event handler to the top level in the HTML page.
Interestingly the template syntax ``` `${e.detail.name} favorited` ``` didn't work with this version of webpack.
    ```html
    <script>
        document.querySelector("people-app").addEventListener("makeFavourite",(e)=>{
            window.alert(e.detail.name + " favorited")
        })
    </script>
    ```
