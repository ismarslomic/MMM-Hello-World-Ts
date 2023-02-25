# Magic Mirror module: Hello world

> Simple Magic Mirror module written in Typescript demonstrating use of the [core module file ](https://docs.magicmirror.builders/development/core-module-file.html#available-module-instance-properties) (frontend)
> and [node helper](https://docs.magicmirror.builders/development/node-helper.html) (backend) in addition to using the [nunjucks](https://mozilla.github.io/nunjucks/) templates for rendering data.
>
> The transpiled JavaScript files should work in the same way as the original JavaScript module [MMM-Hello-World](https://github.com/ismarslomic/MMM-Hello-World).

## Example screenshot

![Screenshot](screenshot.png)

## Installing the module

1. Navigate to the `MagicMirror/modules` directory and execute the following command

   ```sh
   git clone https://github.com/ismarslomic/MMM-Hello-World-Ts.git
   ```

2. Change into the `MMM-Hello-World-Ts` module folder and install runtime dependencies with
   ```sh
   cd MMM-Hello-World-Ts
   npm install --omit=dev
   ```

## Using the module

To use this module, add the following configuration block to the modules array in
the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: 'MMM-Hello-World-Ts',
      config: {
        text: 'Hello world Ismar!'
      }
    }
  ]
}
```
