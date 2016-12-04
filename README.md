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

### cloudinary-image ###

This component will render an <img> built from a cloudinary url and options.

```javascript
{{cloudinary-image 'imageId' (hash width=100)}}
```

Width and height attributes are set on the img tag as well as passed to cloudinary, allowing you to specify the resolution via the "dpr" attribute.

```javascript
{{cloudinary-image 'imageId' (hash width=100 height=100 dpr="2.0")}}
```

### cloudinary-direct-file ###

This component will sign and upload a file directly to Cloudinary from the browser. After a successful upload it will pass the signed response to your server.

```javascript
{{cloudinary-direct-file signatureEndpoint='/sign_upload'}}
```

Set *signatureEndpoint* to the API endpoint that signs your cloudinary direct upload requests.

You can also set an action when the file is done uploading:

```javascript
{{cloudinary-direct-file signatureEndpoint='/sign_upload' onUploadDone=(action 'showThumbnail')}}
```


## Running Tests ##

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
