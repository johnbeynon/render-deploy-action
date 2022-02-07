# Render Webhook action

This action triggers a Render webhook. It needs the serviceID of the Render service to trigger the deploy on as well as the key (Get this from the webhook in the Render dashboard)

## Inputs

## `service-id`

**Required** The serviceID of the Render service to trigger the webhook on

## `key`

**Required** The key defined on the Render webhook service URL

## Example usage

```
uses: johnbeynon/render-webhook-action
with:
	service-id: <SOMESERVICE>
	key: <SOMEKEY>
```