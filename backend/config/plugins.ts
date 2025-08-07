export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "20d",
      },
    },
  },
  "schemas-to-ts": {
    enabled: true,
  },
});
