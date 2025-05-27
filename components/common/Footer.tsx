export const Footer = () => {
  return (
    <footer className="mt-10 py-6 text-center text-sm text-gray-500 border-t">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} Gaming Chair 比較. All rights
          reserved.
        </p>
        <p className="mt-1">本サイトはアフィリエイト広告を利用しています。</p>
      </div>
    </footer>
  );
};
