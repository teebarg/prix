export const runtime = 'edge';

export default async function SubCategory({ params }: { params: { handle: string } }) {
  console.log('🚀 ~ file: page.tsx:2 ~ ProductPage ~ params:', params);
  return <div className="px-12">This page is coming soon</div>;
}
