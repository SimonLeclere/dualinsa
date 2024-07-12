export default function Button({ children, className, onClick, color }) {
  if (color === 'green') {
    return (
      <button
        onClick={onClick}
        className={`${className} w-full rounded-2xl border-b-4 text-white border-green-700 bg-green-600 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 dark:bg-green-700 dark:border-green-800 dark:hover:bg-green-600 dark:text-gray-200 md:min-w-[320px]`}
      >
        {children}
      </button>
    );
  }

  if (color === 'sky') {
    return (
      <button
        onClick={onClick}
        className={`${className} w-full rounded-2xl border-2 border-b-4 text-white border-sky-900 bg-sky-800 px-8 py-3 font-bold uppercase transition hover:bg-sky-700 dark:bg-sky-900 dark:border-sky-950 dark:hover:bg-sky-800 dark:text-gray-200 md:min-w-[320px]`}
      >
        {children}
      </button>
    );
  }

  if (color === 'link') {
    return (
      <button
        onClick={onClick}
        className={`${className} rounded-2xl border-2 border-b-4 border-gray-200 px-4 py-3 text-sm font-bold uppercase text-sky-800 transition hover:bg-gray-50 hover:brightness-90 dark:border-gray-600 dark:text-sky-400 dark:hover:bg-gray-700 dark:hover:text-sky-300`}
      >
        {children}
      </button>
    );
  }

  if (color === 'insa') {
    return (
      <button
        onClick={onClick}
        className={`${className} w-full rounded-2xl shadow-md text-gray-700 bg-white px-10 py-3 text-center font-bold uppercase transition hover:shadow-lg dark:bg-gray-700 dark:text-gray-300 dark:shadow-lg dark:hover:bg-gray-600 dark:border-gray-600 md:min-w-[320px]`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${className} w-full rounded-2xl border-b-4 text-white border-gray-700 bg-gray-600 px-10 py-3 text-center font-bold uppercase transition hover:border-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:border-gray-800 dark:hover:bg-gray-600 md:min-w-[320px]`}
    >
      {children}
    </button>
  );
};
