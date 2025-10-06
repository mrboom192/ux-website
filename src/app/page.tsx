export const dynamic = "force-dynamic";
import { Resource } from "sst";
import Image from "next/image";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function Home() {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <a
          href="https://www.instagram.com/ou_uxdesign/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/logo.svg"
            alt="UXOU Logo"
            width={256}
            height={256}
            className="invert h-auto animate-pulse"
          />
        </a>
      </main>
    </div>
  );
}
