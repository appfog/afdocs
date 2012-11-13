---
title: Add-on Partnership
layout: doc-page
weight: 5
description: Become an add-on partner. 
---

AppFog provides your app with extra functionality by partnering with various third-party services. You can add everything from logs to databases to powerful metrics to your app with a single click . 

# How Add-ons Work

Our add-on partners can create provisioning services that are compatible with AppFog. 

* [Provisioning Workflow](#provision)
* [API Callback Spec](#callback)
* [API Spec](#api)
* [Authentication](#authentication)
* [Manifest Format](#manifest)
* [Single Sign-on](#sso)

# Provisioning Workflow {#provision}

1. The user installs the add-on from the AppFog app console. This sends a request to the add-on partner to provision the service.
2. AppFog makes a `POST` request to https://partner.com/appfog/resources. It passes in the `customer_id` (email address), plan, and the `callback_url`. 
3. The partner returns the local ID of the newly created resource. If it's able to provision the resource synchronously, the config parameter can be set. It may not be possible to provision the resource synchronously, so the config can be empty.
4. If the config is empty, the user sees a message stating that the resource is waiting to be provisioned.
5. Once the resource is provisioned, the partner makes a call to the callback URL, as specified in the initial provisioning call, and passes the new config parameters to be set.
6. Once the config parameters are set, they are set as environment variables in the user's app and instructions are displayed to the user on how to perform the integration.

<img class="screenshot" src="/img/screenshots/Slide2.jpeg" alt="Provisioning Workflow"/>

# API Callback Spec {#callback}

This is a method implemented by the AppFog services. It is used to update the configuration values for a given resource as provided by the add-on partner. The configuration parameters can be specified by the partner when the provisioning call is made by AppFog; however, if the call takes a while to process the partner can use this method to update those parameters later.

PUT to path as defined in `callback_url` on provisioning call.
       
Request Body:

    {
        "config":{"VAR_XYZ":"http://partner.com/5678ADFD"} 
    }
        
Response:

    200 OK


# API Spec {#api}

### Example Provisioning Request

Request: `POST /phpfog/resources`
  
Request Body:

    {
        "customer_id":"user@email.com",
        "plan":"free",
        "callback_url":"https://path_to_resource",
        "options":{} 
    }
       
Response Body:

    {
        "id":789,
        "config":{"ADDONNAME_VAR1":"some configuration value"},
        "message":"" 
    }
    
### Request Fields

* `customer_id` - The identification of the user in the AppFog system (i.e. email address).
* `plan` - The plan being provisioned. This will be "free" for the moment; however, in the future this can be higher-tier plans once they're supported.
* `callback_url` - This is the address of the resource in AppFog's system. The provider can use this to update the configuration for this resource (e.g. during provisioning).
* `options` - This contains additional options for the specific service. It's a placeholder for now and AppFog will not send these requests yet.
 
### Response Fields

* `id` - This is the ID of the resource in the provider's system. 
* `config` - The required key/value pairs of parameters required to provision the service. The manifest specifies what keys are allowed. Configuration paramters are required, but the particular configuration parameters up to the provider. They can also be updated later using the `callback_url` to update the config.
* `message` - This is a message to the system. It's ignored for now.

### Example Deprovisioning Request

Request: `DELETE /phpfog/resources/:id`
      
Request Body: none

Response: 

    200 OK


### Request Fields

This is a DELETE request to the particular `URL` and doesn't contain a body.

### Response Fields

Only an HTTP response status is required.

# Authentication {#authentication}

All calls to both the provisioning API on the partners service as well as the AppFog callback service must be authenticated using `HTTP Basic Auth`.

All requests must be completed over `HTTPS`. 

The manifest file specifies the username and password to be used for all of these calls. The "`id`" in the manifest is the username, the "`api_password`" is the password.

# Manifest Format {#manifest}

The manifest file is a `JSON` document that defines the information necessary for AppFog to make provisioning calls to the provider.

Add-on partners should provide the manifest file out-of-band by emailing it to the AppFog team to incorporate into the system.

### Example Manifest

`example-manifest.json`

    {
        "id": "company",
        "name": "Product",
        "plans": [
            {
                "id": "free"
            }
        ],
        "api": {
            "config_vars": [
                "PRODUCT_URI"
            ],
            "password": "SDasdf98asdf68ZoRak5Tl",
            "sso_salt": "DfauasdfDF0s0afsadf0",
            "production": {
                "base_url": "https://api.company.com/partners/af/resources",
                "sso_url": "https://www.company.com/login/partners/af"
            },
            "test": {
                "base_url": "https://localhost:8081/partners/af/resources",
                "sso_url": "https://localhost:8081/login/partners/af"
            }
        }
    }

### Fields

* `id` - The add-on id. All lowercase, no spaces or punctuation. This is used in conjunction with the password to authenticate provisioning calls.
* `name` - The friendly name to appear in the add-on tab of the app console in AppFog.
* `api/config_vars` - A list of variables to be returned on provisioning calls. The variable names must be prefixed with the add-on id and an underscore. Example: "`PROVIDER_`"
* `api/production` - The root `URL` of the provisioning service of provider.
* `api/test` - Same `URL` as production, but for testing in a QA environment.
* `api/path` - (Optional) Overrides the default path "`appfog/resources`".
* `api/username` - (Optional) The username used by AppFog to authenticate itself with the partner service via `HTTP Basic Auth`. The "`id`" is used if the username is not specified.
* `api/password` - The password used by AppFog to authenticate itself with the partner service via `HTTP Basic Auth`.
* `api/sso_salt` - Shared secret used in single sign-on between AppFog and the provider.
* `plans/id` - The name of the "free" plan that will be offered to AppFog users and used for testing and integration purposes.

# Single Sign-on {#sso}

Once a resource is fully provisioned, a "Manage" button will appear in the AppFog app console for the given add-on. This button will redirect the user to the management page of the particular resource on the partner's website.

After the user clicks the button, they will be redirected to the following generated `URL`:

    https://partner.com/appfog/resources/:id?token=:token&timestamp=:timestamp
  

The `:id` is the `id` of the resource which was defined in the response to the provisioning call for creating this resource.

The token is defined as a combination of the `id`, `salt`, and `timestamp`. 

The salt is the "`sso_salt`" variable as defined in the manifest.

The timestamp is the current UNIX timestamp.

    token = sha1(id + ':' + salt + ':' + timestamp)

After the partner validates the salt (shared secret) and the timestamp (we recommend 30 seconds), they can be allowed to manage the resource as defined by the `id`.
