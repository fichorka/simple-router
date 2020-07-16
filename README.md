# Simple Router
A simple and pure Javascript router for building Single Page Applications (SPA) with following **highlights:**
- no need to define routes
- pure Javascript (no need for libraries / frameworks)
- no server side modifications
- simple rules
- has a good feature detection (shouldn't cause problems in older browsers)

## Rule 1:
Page content should be inside the `#app` container eelement:

## Rule 2:
**`<a>`** tags that shouldn't cause a page reload must have a specific class of "interlink".
## Example:
```html
<div id="app">
    <a classname="interlink" href="./about">About Us</a>
    <!--rest of the page content comes here-->
</div>
```

## Demo
[Demo on codesandbox](https://codesandbox.io/s/simple-router-demo-87vtc) - might experience some issues if codesandbox doesn't fully load the app
