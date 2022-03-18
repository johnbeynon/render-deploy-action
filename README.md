# Render Deploy action

This action triggers a Render deploy. It needs the serviceID of the Render service to trigger the deploy.

## Inputs

## `service-id`

**Required** The serviceID of the Render service to trigger the deploy on

## Example usage

Use GitHub Action secrets to set the values of `service-id` and then add to your workflow with:

```
uses: johnbeynon/render-deploy-action
with:
	service-id: ${{ secrets.some-render-service-id }}
```
