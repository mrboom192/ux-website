// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "ux-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: input.stage === "production" ? "ux-production" : "ux-dev",
        },
        cloudflare: "6.10.0",
      },
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      access: "public",
    });

    new sst.aws.Nextjs("UXWebsite", {
      link: [bucket],
      domain: {
        name: "uxou.org",
        redirects: ["www.uxou.org"],
        dns: sst.cloudflare.dns({
          zone: process.env.CLOUDFLARE_ZONE_ID!,
        }),
      },
    });
  },
});
