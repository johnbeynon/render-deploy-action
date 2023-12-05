# Render Deploy action

This action triggers a Render deploy.

## Inputs

## `service-id`

**Required** The serviceID of the Render service to trigger the deploy on. When viewing a service in the Render dashboard grab this value from the URL - it will start with `srv-`

## `api-key`

**Required** Render API key

## `wait-for-success`

**Optional** When true job will pend untill the deployment get to the status `live`


## Example usage

Use GitHub Action secrets to set the values of `service-id` and `api-key` and then add to your workflow with:

```
name: My Deploy

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.MY_RENDER_SERVICE_ID }}
          api-key: ${{ secrets.MY_RENDER_API_KEY }}
          wait-for-success: true
```
