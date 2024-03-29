const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
    prependData: `@import "./_variables.scss";`,
  },
};

module.exports = nextConfig;
