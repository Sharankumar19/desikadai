import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "inline-block",
        width: "728px",
        height: "90px",
      }}
      data-ad-client="ca-pub-3749860097587469"
      data-ad-slot="7805140268"
    />
  );
};

export default GoogleAd;
