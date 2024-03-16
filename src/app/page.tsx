export default function Home() {
  return <div>{/* ホームページのコンテンツ */}</div>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/main", // リダイレクト先
      permanent: false, // 301(永続的)か302(一時的)かを選択
    },
  };
}
