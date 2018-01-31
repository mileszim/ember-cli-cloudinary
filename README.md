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

This component will render an `<img>` built from a cloudinary url and options.

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

You can also set an action for different events. For example when the file is done uploading:

```javascript
{{cloudinary-direct-file signatureEndpoint='/sign_upload' onUploadDone=(action 'showThumbnail')}}
```

#### Options
option | default  | Info
------ | ---- |  ----
name | 'file' |  Name of the input
multiple | false | True if you want to upload more than one file
accept | 'image/jpeg,image/gif,image/png' | Files types allowed in the input type file
style | Ember.String.htmlSafe("") | Component style
signatureEndpoint | null | Signs your cloudinary direct upload requests
disableImageResize | null | -
imageMaxWidth | 10000000 | Image max width
imageMaxHeight | 10000000 | Image max height
acceptFileTypes | [Regex with image extensions] | Files extension allowed (checked by code)
maxFileSize | 50000000 | Max File Size
loadImageMaxFileSize | 50000000 | Load Image Max File Size
maxChunkSize | null | Required for chunked upload of bigger files

#### Events
Event | Info
------ | ----
onUploadDone | File uploaded
fileProgress | File progress
allFileProgress | More than one file progress
onUploadStart | Upload Starts
onUploadStop | Upload Stops
onUploadFail | Upload Fails
onUploadAlways | Upload Always

## Running Tests ##

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
