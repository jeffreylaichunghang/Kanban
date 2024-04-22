import axios from "axios";
import { defineConfig } from "cypress";

const BASE_URL = 'https://localhost:5002'

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async 'db:seedBoards'() {

        },
        async 'db:teardownBoards'() {
          const { data } = await axios.get(`${BASE_URL}/api/boards?secret_token=${localStorage.getItem('secret_token')}`)
          console.log(data.body)
          // todo: create a token for testing purposes and ensure security
        }
      })
    },
  },
  env: {

  }
});
