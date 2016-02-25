# ember-cli-cloudinary #

Ember addon for Cloudinary

## Installation ##

```ember install ember-cli-cloudinary```

Add your cloud name & api key to config/environment.js ENV:

```javascript
cloudinary: {
  cloudName: 'some_cloud_name',
  apiKey: 'some_api_key'
},
```

## Components ##

### cloudinary-direct-upload ###

This component will sign and upload a file directly to Cloudinary from the browser. After a successful upload it will pass the signed response to your server.

```javascript
{{cloudinary-direct-upload ...}}
```


## Running Tests ##

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
