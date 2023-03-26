# Devizzle React

This is the front end for the Devizzle app.

## Building

This is a very simple Vite project, meaning if you have any questions you can just look it up on their [documentation pages](https://vitejs.dev/guide/).

First, you will need to create a `.env.production` file and add the `VITE_API_SERVER_ADDRESS` variable to it. This should point to the address of the server where you are hosting the api. Then run `npm install` from the root of this project to install the dependencies. To build the assets, simply run `npm run build`. It should create a few files under the `dist/` folder.

You can use `dist/` as your `DocumentRoot` folder if you are serving using Apache2. It has a very basic `.htaccess` file to reroute the pages to the react router.

## Running Locally

If you want to run this app locally you just need a `.env.local` file with the exact same `VITE_API_SERVER_ADDRESS` variable and the rest of the proccess is the same, but instead of `npm run build` you run `npm run dev`. This will start a local development server and you will be able to open the address on your browser.
