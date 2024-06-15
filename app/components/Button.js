export default function Button({ children, className, onClick, color }) {

  if (color === 'green') {
    return (
      <button
        onClick={onClick}
        className={`${className} w-full rounded-2xl border-b-4 text-white border-green-700 bg-green-600 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 md:min-w-[320px]`}
      >
        {children}
      </button>
    );
  }

  if (color === 'sky') {
    return (
      <button
        onClick={onClick}
        className={`${className} w-full rounded-2xl border-2 border-b-4 text-white border-sky-900 bg-sky-800 px-8 py-3 font-bold uppercase transition hover:bg-sky-700 md:min-w-[320px]`}
      >
        {children}
      </button>
    );
  }

  if (color === 'link') {
    return (
      <button
        onClick={onClick}
        className={`${className} rounded-2xl border-2 border-b-4 border-gray-200 px-4 py-3 text-sm font-bold uppercase text-sky-800 transition hover:bg-gray-50 hover:brightness-90`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${className} w-full rounded-2xl border-b-4 text-white border-gray-700 bg-gray-600 px-10 py-3 text-center font-bold uppercase transition hover:border-gray-600 hover:bg-gray-500 md:min-w-[320px]`}
    >
      {children}
    </button>
  );
};