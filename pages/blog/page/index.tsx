import { useEffect } from "react";
import { useRouter } from "next/router";

const PageIndex = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/blog");
  }, [router]);
  return <></>;
};

export default PageIndex;
